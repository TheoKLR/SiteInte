import { createContext, useState } from "react";

interface AuthType {
    user: string;
    pwd : string;
    accessToken:string;
}

const AuthContext = createContext<{ auth: AuthType, setAuth: React.Dispatch<React.SetStateAction<AuthType>> }>({ auth: {} as AuthType, setAuth: () => {} });

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState<AuthType>({ user: "", pwd: "", accessToken:"" });

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;