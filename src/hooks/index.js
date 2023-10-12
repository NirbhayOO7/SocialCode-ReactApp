import { useContext, useEffect, useState } from "react";
import jwt from 'jwt-decode';
import { AuthContext, PostContext } from '../providers';
import { editProfile, fetchUserFriends, getPosts, register, login as userLogin } from '../api'
import { LOCALSTORAGE_TOKEN_KEY, getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from "../utils";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useAuthProvider = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            // console.log('user token: ', userToken);
            if (userToken) {
                const user = jwt(userToken);
                const response = await fetchUserFriends();

                let friends = [];

                if (response.success) {
                    friends = response.data.friends;
                }
                // console.log("Token user", user);
                setUser({
                    ...user,
                    friends
                });
            }

            setLoading(false);
        }

        getUser();
    }, [])

    const login = async (email, password) => {
        const response = await userLogin(email, password);

        if (response.success) {
            // console.log(LOCALSTORAGE_TOKEN_KEY);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );

            // below 9 lines are added by myself to remove a bug(earlier only setUser(response.data.user))
            const getFriendsList = await fetchUserFriends();
            let friends = [];
            if (getFriendsList.success) {
                friends = getFriendsList.data.friends;
            }
            setUser({
                ...response.data.user,
                friends
            });

            return {
                success: true,
            };
        }
        else {
            return {
                success: false,
                message: response.message
            };
        }
    };

    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };

    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);

        if (response.success) {
            return {
                success: true,
            };
        }
        else {
            return {
                success: false,
                message: response.message
            };
        }
    }

    const updateUser = async (userId, name, password, confirmPassword) => {
        const response = await editProfile(userId, name, password, confirmPassword);

        if (response.success) {
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null);
            return {
                success: true,
            };
        }
        else {
            return {
                success: false,
                message: response.message
            };
        }
    }

    const updateUserFriends = (addFriend, friend) => {
        if (addFriend) {
            setUser({
                ...user,
                friends: [...user.friends, friend]
            });

            return;
        }
        else {
            const newFriends = user.friends.filter((f) => {
                return f.to_user._id !== friend.to_user._id
            });

            setUser({
                ...user,
                friends: newFriends
            })

            return;
        }
    }

    return ({
        user,
        login,
        logout,
        signup,
        loading,
        updateUser,
        updateUserFriends
    })
};

export const usePosts = () => {
    return useContext(PostContext);
}

export const usePostProvider = () => {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchPosts() {
            const response = await getPosts();

            if (response.success) {
                setPosts(response.data.posts);
            }

            setLoading(false);
        }

        fetchPosts();

    }, []);

    const addPostToState = (post) => {
        const newPosts = [post, ...posts];

        setPosts(newPosts);
    }

    const addComment = (comment, postId) => {
        const newPosts = posts.map((post) => {
            if (post._id === postId) {
                return { ...post, comments: [...post.comments, comment] };
            }
            return post;
        })

        setPosts(newPosts);
    }

    return {
        data: posts,
        loading,
        addPostToState,
        addComment
    };

}