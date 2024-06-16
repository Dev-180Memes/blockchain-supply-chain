import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { LoginCredentials } from '../../types';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authService.login({ email, password } as LoginCredentials);
            // console.log("Login successfull:", response.data);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            if (response.data.userId) {
                localStorage.setItem("userId", response.data.userId);
            }
            if (response.data.role) {
                localStorage.setItem("role", response.data.role);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials and try again.")
        }
    }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Login
