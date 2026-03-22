import "./register.css";

export default function Register({ onClose }) {
  return (
    <div className="register-overlay">
      <div className="register-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Create Account</h2>
        <input className="register-input" type="text" placeholder="Username" />
        <input className="register-input" type="email" placeholder="Email" />
        <input className="register-input" type="password" placeholder="Password" />
        <button className="register-btn" type="submit">Register</button>
      </div>
    </div>
  );
}