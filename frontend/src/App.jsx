import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
   <div className="min-h-screen bg-neutral">
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '10px',
        background: '#f0f0f0',
        justifyContent: 'center'
      }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/post-job" style={linkStyle}>Post Job</Link>
      </nav>
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </div>
   </div>
  );
}

const linkStyle = {
  textDecoration: 'none',
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '4px'
};
