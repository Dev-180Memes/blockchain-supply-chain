import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { RegisterData } from '../../types';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authService.register({ username, email, password, role, walletAddress } as RegisterData);
            console.log("Registration successful", response);
            navigate('/login');
        } catch (err) {
            console.error("Registration failed", err);
            setError("Registration failed. Please try again.")
        }
    };
  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Role</label>
                <select value={role} onChange={e => setRole(e.target.value as 'buyer' | 'seller')}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
            </div>
            <div>
                <label>Wallet Address</label>
                <input type="text" value={walletAddress} onChange={e => setWalletAddress(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    </div>
  )
}

export default Register
