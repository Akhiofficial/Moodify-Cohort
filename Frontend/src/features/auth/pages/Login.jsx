import React, { useState } from 'react'
import "../styles/login.scss"
import { Link } from 'react-router'
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const login = () => {


    const { loading, handleLogin } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()

        // Pass the same input to both email and username. 
        // The backend's $or query will check if either DB field matches this value.
        await handleLogin({ email, username: email, password })
        navigate("/")

    }


    return (
        <main className="login-page">
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>
            <div className='form-container glass-panel'>
                <div className="form-header">
                    <h1>Welcome Back</h1>
                    <p>Enter your details to access your account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        label="Email or Username"
                        type="text"
                        placeholder="Enter your email or username"
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="submit-btn">Sign In</button>

                    <div className="form-footer">
                        <p>Don't have an account? <Link to="/register" className="register-link">Create one</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default login