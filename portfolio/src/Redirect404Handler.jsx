import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './Constants';

export default function Redirect404Handler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = new URLSearchParams(window.location.search).get('redirect');
    if (redirectPath && window.location.pathname === `${BASE_URL}/`) {
      console.log("redirecting to " + redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return null;
}