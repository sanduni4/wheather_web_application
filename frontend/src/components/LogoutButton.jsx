// frontend/src/components/LogoutButton.jsx
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => logout({ 
        logoutParams: { 
          returnTo: window.location.origin 
        } 
      })}
      style={{
        padding: '8px 16px',
        fontSize: '0.9rem',
        background: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '400',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
      onMouseOver={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;