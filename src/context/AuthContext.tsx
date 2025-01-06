import {useNavigate} from "react-router-dom";
import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {getAccessToken} from "@/services/token.ts";
import {getCurrentUser} from "@/services/user.ts";
import {routes} from "@/route";
import {User} from "@/model/type.ts";

export const INITIAL_USER: User = {
    id: "",
    fullName: "",
    nickname: "",
    email: "",
    avatarUrl: "",
};

const INITIAL_STATE = {
    userContext: INITIAL_USER,
    isAuthenticated: false,
    isLoadingContext: true,
    setUserContext: () => {
    },
    setIsAuthenticated: () => {
    },
    loginContext: () => {
    },
    logoutContext: () => {
    },
};

type IContextType = {
    userContext: User;
    setUserContext: Dispatch<SetStateAction<User>>;
    isAuthenticated: boolean;
    isLoadingContext: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loginContext: (user: User) => void;
    logoutContext: () => void;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({children}: { children: ReactNode }) {
    const navigate = useNavigate();
    const [userContext, setUserContext] = useState<User>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingContext, setIsLoading] = useState(true);

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
        setUserContext(user);
        setIsAuthenticated(true);
    }
    const logoutContext = () => {
        setUserContext(INITIAL_USER);
        setIsAuthenticated(false);
    }
    const checkAuthUser = async () => {
        setIsLoading(true);
        await getCurrentUser()
            .then(response => {
                if (response === null) {
                    setUserContext(INITIAL_USER);
                    setIsAuthenticated(false);
                } else {
                    setUserContext(response);
                    setIsAuthenticated(true);
                }
                return true;
            })
            .catch(() => {
                setUserContext(INITIAL_USER);
                setIsAuthenticated(false);
                return false;
            }).finally(() => {
                setIsLoading(false);
            });
    };


    const value = {
        userContext,
        setUserContext,
        isAuthenticated,
        setIsAuthenticated,
        logoutContext,
        isLoadingContext,
        loginContext,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserContext = () => useContext(AuthContext);