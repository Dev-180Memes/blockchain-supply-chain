const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

exports.register = async (req, res) => {
    const { username, email, password, role, walletAddress } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            walletAddress,
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: "1h" });

        res.status(200).json({ token, userId: user._id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.protect = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token, Authorization denied" });
    }

    // console.log(token, config.jwtSecret);

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.userId

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
};

exports.getuser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}