import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FadeIn from '../components/animations/FadeIn';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-200/30 rounded-full blur-3xl" />
            </div>

            <FadeIn className="w-full max-w-md relative z-10">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-xl mb-4">
                            <LogIn size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500">Sign in to continue to your account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            icon={Mail}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            icon={Lock}
                            required
                        />

                        <Button
                            type="submit"
                            loading={loading}
                            className="w-full justify-center py-3"
                            icon={ArrowRight}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-600 text-sm mb-4">Don't have an account?</p>
                        <Link to="/register" className="block w-full">
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                                icon={UserPlus}
                            >
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-400">
                    © 2024 Resume Builder. All rights reserved.
                </p>
            </FadeIn>
        </div>
    );
};

export default Login;
