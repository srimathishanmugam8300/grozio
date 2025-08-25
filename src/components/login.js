import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Detect my location');
  const [showPermission, setShowPermission] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    location: ''
  });

  const handleLocationClick = () => {
    setShowPermission(true);
  };

  const allowLocation = () => {
    setShowPermission(false);
    setIsDetecting(true);
    setLocation('Detecting location...');
    
    // Simulate location detection
    setTimeout(() => {
      setIsDetecting(false);
      setLocation();
      showNotification('Location detected successfully!');
    }, 2000);
  };

  const denyLocation = () => {
    setShowPermission(false);
    setLocation('Location access denied');
    showNotification('Location access is needed for best experience', 'error');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let valid = true;
    const newErrors = {
      username: '',
      password: '',
      location: ''
    };
    
    if (username.length < 3) {
      newErrors.username = 'Please enter a valid username';
      valid = false;
    }
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }
    
    if (location === 'Detect my location' || location === 'Location access denied') {
      newErrors.location = 'Location access is required';
      valid = false;
    }
    
    setErrors(newErrors);
    
    if (!valid) {
      showNotification('Please fix the errors to continue', 'error');
      return;
    }
    
    // Simulate login process
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Signing In...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = 'Sign In';
      btn.disabled = false;
      showNotification('Login successful! Redirecting...');
    }, 1500);
  };

  const showNotification = (message, type = 'success') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Add styles to notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '12px 24px';
    notification.style.borderRadius = '8px';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '1000';
    notification.style.transition = 'opacity 0.3s ease';
    notification.style.opacity = '0';
    notification.style.animation = 'fadeIn 0.3s ease forwards';

    if (type === 'success') {
      notification.style.background = 'linear-gradient(90deg, #10B981 0%, #34D399 100%)';
      notification.style.color = 'white';
      notification.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
    } else {
      notification.style.background = '#EF4444';
      notification.style.color = 'white';
      notification.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Inline styles for the component
  const styles = `
    .login-container {
      background: #000000;
      color: #e5e7eb;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    .login-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent 30%),
                  radial-gradient(circle at bottom left, rgba(245, 158, 11, 0.1), transparent 30%);
      z-index: 0;
    }

    .login-card {
      background: rgba(31, 41, 55, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 100%;
      max-width: 420px;
      z-index: 1;
    }

    .logo {
      text-align: center;
      margin-bottom: 25px;
    }

    .logo h1 {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .logo p {
      color: #9ca3af;
      font-size: 15px;
      font-weight: 500;
    }

    .input-group {
      margin-bottom: 24px;
      position: relative;
    }

    .input-group label {
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
      color: #d1d5db;
      font-weight: 500;
    }

    .input-group input {
      width: 100%;
      padding: 16px 16px 16px 45px;
      border: none;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.08);
      color: #e5e7eb;
      font-size: 15px;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-sizing: border-box;
    }

    .input-group input:focus {
      outline: none;
      border-color: #F59E0B;
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
    }

    .input-group i {
      position: absolute;
      left: 16px;
      top: 42px;
      color: #9ca3af;
      z-index: 1;
    }

    .input-group input:focus + i {
      color: #F59E0B;
    }

    .location-input {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 16px;
      margin-top: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-sizing: border-box;
    }

    .location-input:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .location-input i {
      position: static;
      color: #10B981;
      margin-right: 12px;
      font-size: 18px;
    }

    .location-input span {
      color: #e5e7eb;
      font-size: 15px;
    }

    .detecting {
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    .btn {
      width: 100%;
      padding: 16px;
      border: none;
      border-radius: 10px;
      background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
    }

    .btn:disabled {
      opacity: 0.8;
      cursor: not-allowed;
      transform: none;
    }

    .alternatives {
      text-align: center;
      margin-top: 25px;
      font-size: 14px;
      color: #9ca3af;
    }

    .alternatives a {
      color: #10B981;
      text-decoration: none;
      margin: 0 8px;
      font-weight: 500;
    }

    .alternatives a:hover {
      text-decoration: underline;
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 20px 0;
    }

    .divider span {
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }

    .divider p {
      padding: 0 15px;
      color: #9ca3af;
      font-size: 14px;
    }

    .social-login {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
    }

    .social-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      color: #e5e7eb;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .social-btn:hover {
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.12);
    }

    .location-permission {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .location-permission.active {
      opacity: 1;
      pointer-events: all;
    }

    .permission-box {
      background: rgba(31, 41, 55, 0.9);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 30px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .permission-box h2 {
      margin-bottom: 15px;
      color: #10B981;
    }

    .permission-box p {
      margin-bottom: 25px;
      line-height: 1.5;
      color: #d1d5db;
    }

    .permission-buttons {
      display: flex;
      gap: 15px;
    }

    .permission-buttons button {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .permission-buttons .allow {
      background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
      color: white;
    }

    .permission-buttons .deny {
      background: rgba(255, 255, 255, 0.08);
      color: #e5e7eb;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .permission-buttons button:hover {
      transform: translateY(-2px);
    }

    .error {
      color: #EF4444;
      font-size: 14px;
      margin-top: 5px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, 20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 20px;
      }
      
      .logo h1 {
        font-size: 28px;
      }
      
      .input-group input {
        padding: 14px 14px 14px 40px;
      }
      
      .input-group i {
        left: 14px;
        top: 40px;
      }
    }
  `;

  // Inject styles into the document head
  if (!document.getElementById('login-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'login-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1>GROZIO</h1>
          
        </div>
        
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <i className="fas fa-user"></i>
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <i className="fas fa-lock"></i>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          
          <div className="input-group">
            <label>Your Location</label>
            <div 
              className={`location-input ${isDetecting ? 'detecting' : ''}`} 
              onClick={handleLocationClick}
            >
              <i className="fas fa-map-marker-alt"></i>
              <span>{location}</span>
            </div>
            {errors.location && <div className="error">{errors.location}</div>}
          </div>
          
          <button type="submit" className="btn">Sign In</button>
        </form>
        
        <div className="alternatives">
          <a href="#">Forgot Password?</a>
          <a href="#">Create Account</a>
        </div>
        
        <div className="divider">
          <span></span>
          <p>or continue with</p>
          <span></span>
        </div>
        
        <div className="social-login">
          <div className="social-btn">
            <i className="fab fa-google"></i>
          </div>
          <div className="social-btn">
            <i className="fab fa-facebook-f"></i>
          </div>
          <div className="social-btn">
            <i className="fab fa-apple"></i>
          </div>
        </div>
      </div>
      
      {showPermission && (
        <div className="location-permission active">
          <div className="permission-box">
            <h2>Allow Location Access</h2>
            <p>ProductFind needs access to your location to show nearby stores and product availability. Your data is always secure and never shared with third parties.</p>
            <div className="permission-buttons">
              <button className="allow" onClick={allowLocation}>Allow</button>
              <button className="deny" onClick={denyLocation}>Deny</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;