import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard'); // or your preferred redirect path
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return <div>Redirecting...</div>;
};

export default AuthSuccess;