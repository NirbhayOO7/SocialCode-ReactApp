import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { Loader } from '../components'
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';

const UserPrfoile = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    // console.log('userId: ', userId);

    useEffect(() => {

        const getUser = async () => {
            const response = await fetchUserProfile(userId);

            if (response.success) {
                setUser(response.data.user);
            }
            else {
                toast.error(response.message);
                navigate('/');
            }

            setLoading(false);
        }

        getUser();

    }, [userId, navigate]);

    function checkIfUserIsAFriend() {
        const friends = auth.user.friends;

        const friendIds = friends.map(friend => friend.to_user._id);

        const index = friendIds.indexOf(userId);

        if (index !== -1) {
            return true;
        }

        return false;
    }

    const showAddFriendBtn = checkIfUserIsAFriend();

    const handleAddFriendClick = async () => {
        setRequestInProgress(true);

        const response = await addFriend(userId);

        if (response.success) {
            const { friendship } = response.data;

            auth.updateUserFriends(true, friendship);

            toast.success('Friend added successfully!')
        }
        else {
            toast.error(response.message);
        }

        setRequestInProgress(false);
    }

    const handleRemoveFriendClick = async () => {
        setRequestInProgress(true);

        const response = await removeFriend(userId);

        if (response.success) {

            const friendship = auth.user.friends.filter((friend) => {
                return friend.to_user._id === userId;
            });

            auth.updateUserFriends(false, friendship[0]);
            toast.success('Friend Removed Successfully!')
        }
        else {
            toast.error(response.message);
        }

        setRequestInProgress(false);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                    src='https://cdn-icons-png.flaticon.com/128/1999/1999625.png'
                    alt=''
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{user?.email}</div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldValue}>{user?.name}</div>
            </div>
            <div className={styles.btnGrp}>
                {showAddFriendBtn ? (
                    <button
                        className={`button ${styles.saveBtn}`}
                        onClick={handleRemoveFriendClick}
                        disabled={requestInProgress}
                    >{requestInProgress ? 'Removing Friend...' : 'Remove Friend'}</button>
                ) : (
                    <button
                        className={`button ${styles.saveBtn}`}
                        onClick={handleAddFriendClick}
                        disabled={requestInProgress}
                    >{requestInProgress ? 'Adding Friend...' : 'Add Friend'}</button>
                )}
            </div>
        </div>
    )
}

export default UserPrfoile;