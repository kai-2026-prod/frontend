import { useState, useRef } from "react";
import axios from "axios";
import "./register.css";

export default function Register({ onClose }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value) {
            setError("Please fill in all fields.");
            return;
        }

        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, newUser);
            setSuccess(true);
            setError(null);
        } catch (err) {
            const msg = err.response?.data?.message || "";
            if (msg.includes("username")) {
                setError("This username is already taken.");
            } else if (msg.includes("email")) {
                setError("This email is already registered.");
            } else {
                setError("Registration failed. Please try again.");
            }
            setSuccess(false);
        }
    };

    return (
        <div className="register-overlay">
            <div className="register-container">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input className="register-input" type="text" placeholder="Username" ref={nameRef} />
                    <input className="register-input" type="email" placeholder="Email" ref={emailRef} />
                    <input className="register-input" type="password" placeholder="Password" ref={passwordRef} />
                    <button className="register-btn" type="submit">Register</button>
                </form>
                {success && <span className="success-message">Registration successful! You can now log in.</span>}
                {error && <span className="error-message">{error}</span>}
            </div>
        </div>
    );
}