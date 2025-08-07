// frontend/src/components/LoginButton.jsx
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        padding: '12px 24px',
        fontSize: '1rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.target.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
        e.target.style.transform = 'translateY(-1px)';
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;