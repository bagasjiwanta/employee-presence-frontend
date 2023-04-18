import { createContext, useContext, useEffect } from "react";
import api from "../lib/api";
import { jwtDecrypt } from "jose";
import * as store from "../lib/store"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [token, setToken] = useState(null)
    const [status, setStatus] = useState()

    const login = async (email, password) => {
        try {
            const { data, error } = await api.login(email, password)
            if (error) throw error
            const user = await jwtDecrypt(data, api.secret)
            setToken(data)
            setCurrentUser(user.payload)
        } catch (err) {
            console.warn(err)
        }
    }

    const presence = async (image, long, lat) => {
        try {
            const { data, error } = await api.presence(image, long, lat, token)
            if (error) throw 
            
        } catch (err) {
            console.warn(err)
        }
    }

    const checkStatus = async () => {
        const {
            data: status,
            error
        } = await api.checkStatus(token)
        if (error) console.warn(error)
        setStatus(status)

    }

    useEffect(() => {
        const initAuth = async () => {
            try {                
                value = await store.get("auth_token")
                if (!value) return
                
                const { payload: user } = await jwtDecrypt(value, api.secret)
                setCurrentUser(user)
            } catch (err) {
                console.warn(err)
            }
        }

        initAuth()            
    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser,
            login,
            presence,
            status,
            checkStatus
        }}>
            {children}
        </AuthContext.Provider>
    )

}