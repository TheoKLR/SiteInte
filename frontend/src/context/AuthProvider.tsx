import { createContext, useState } from "react";

interface AuthType {
    accessToken:string;
}

const AuthContext = createContext<{ auth: AuthType, setAuth: React.Dispatch<React.SetStateAction<AuthType>> }>({ auth: {} as AuthType, setAuth: () => {} });

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState<AuthType>({accessToken: ""});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;