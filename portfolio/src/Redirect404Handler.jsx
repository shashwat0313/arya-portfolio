import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Redirect404Handler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = new URLSearchParams(window.location.search).get('redirect');
    if (redirectPath && window.location.pathname === '/') {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return null;
}