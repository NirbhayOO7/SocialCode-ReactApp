import { createContext } from "react";
import { usePostProvider } from "../hooks";

const initialState = {
    posts: [],
    loading: true,
    addPostToState: () => { },
    addComment: () => { }
};

export const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
    const posts = usePostProvider();

    return (
        <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    );
}