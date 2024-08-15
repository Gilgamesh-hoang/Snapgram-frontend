import {useNavigate} from "react-router-dom";
import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";

import {getAccessToken} from "@/services/token.ts";
import {getCurrentUser} from "@/services/user.ts";
import {routes} from "@/route";
import {User} from "@/model/type.ts";

export const INITIAL_USER = {
    id: "",
    fullName: "",
    nickname: "",
    email: "",
    avatarUrl: "",
    bio: "",
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isAuthenticated: false,
    isLoading: true,
    setUser: () => {
    },
    setIsAuthenticated: () => {
    },
    loginContext: () => {
    },
    logoutContext: () => {
    },
};

type IContextType = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    isAuthenticated: boolean;
    isLoading: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loginContext: (user: User) => void;
    logoutContext: () => void;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({children}: { children: ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const tokenLocal = getAccessToken();
        if (!tokenLocal) {
            navigate(routes.signin);
            setIsLoading(false);
            return;
        }
        checkAuthUser();
    }, []);
    const loginContext = (user: User) => {
        setUser(user);
        setIsAuthenticated(true);
    }
    const logoutContext = () => {
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
    }
    const checkAuthUser = async () => {
        setIsLoading(true);
        await getCurrentUser()
            .then(response => {
                if (response === null) {
                    setUser(INITIAL_USER);
                    setIsAuthenticated(false);
                } else {
                    setUser(response);
                    setIsAuthenticated(true);
                }
                return true;
            })
            .catch(() => {
                setUser(INITIAL_USER);
                setIsAuthenticated(false);
                return false;
            }).finally(() => {
                setIsLoading(false);
            });
    };


    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logoutContext,
        isLoading,
        loginContext,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserContext = () => useContext(AuthContext);