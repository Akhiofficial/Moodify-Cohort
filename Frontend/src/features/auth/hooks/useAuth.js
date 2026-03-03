import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";


export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }


    // it hydrate user data with the help of cookies by sending request to getMe endpoint
    useEffect(() => {
        handleGetMe()
    }, [])

    const { user, setUser, loading, setLoading } = context


    async function handleRegister({ username, email, password }) {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return data
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        try {
            const data = await login({ username, email, password })
            setUser(data.user)
            return data
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
            return data
        } catch (error) {
            setUser(null)
            throw error
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            return data
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    

    return {
        user,
        setUser,
        loading,
        setLoading,
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    }

}
