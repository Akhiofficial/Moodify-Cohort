import React, { useState } from 'react'
import "../styles/register.scss"
import { Link } from 'react-router'
import FormGroup from '../components/FormGroup'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const { loading, handleRegister } = useAuth()

    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()

        await handleRegister({ email, username, password })
        navigate("/")
    }

    return (
        <main className="register-page">
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>
            <div className='form-container glass-panel'>
                <div className="form-header">
                    <h1>Welcome</h1>
                    <p>Enter your details to create your account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        label="Username"
                        type="text"
                        placeholder="Enter your username" />
                    <FormGroup
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        label="Email"
                        type="email"
                        placeholder="Enter your email" />
                    <FormGroup
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        label="Password"
                        type="password"
                        placeholder="Enter your password" />
                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                    </div>

                    <button type="submit" className="submit-btn">Sign Up</button>

                    <div className="form-footer">
                        <p>Already have an account? <Link to="/login" className="register-link">Login</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Register

