// frontend/src/App.jsx
import { useAuth0 } from '@auth0/auth0-react';
import WeatherDisplay from './components/weatherDisplay';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Loading from './components/Loading';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <div>
          <h1>Oops! Something went wrong</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '3rem',
          borderRadius: '20px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: '300',
          }}>⛅ Weather App</h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9,
          }}>
            Get real-time weather information for cities around the world
          </p>
          <p style={{
            fontSize: '1rem',
            marginBottom: '2rem',
            opacity: 0.7,
          }}>
            Please log in to access weather data
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "sans-serif",
      minHeight: '100vh',
    }}>
      {/* Header with auth info */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <Profile />
        <LogoutButton />
      </div>
      
      <WeatherDisplay />
    </div>
  );
}

export default App;