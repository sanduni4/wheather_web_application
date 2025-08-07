// frontend/src/components/Profile.jsx
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '8px 16px',
      borderRadius: '25px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
      <img
        src={user.picture}
        alt={user.name}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <span style={{
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: '500',
          lineHeight: 1,
        }}>
          {user.name}
        </span>
        <span style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.75rem',
          lineHeight: 1,
        }}>
          {user.email}
        </span>
      </div>
    </div>
  );
};

export default Profile;