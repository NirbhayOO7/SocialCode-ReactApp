import { createContext } from "react";
import { useAuthProvider } from "../hooks";

const initialState = {
    user: null,
    login: () => { },
    logout: () => { },
    loading: true,
    signup: () => { },
    updateUser: () => { },
    updateUserFriends: () => { }
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const auth = useAuthProvider();

    return (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    );
}