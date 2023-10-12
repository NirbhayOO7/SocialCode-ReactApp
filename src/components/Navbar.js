import styles from '../styles/navbar.module.css';
import logo from '../photos/SocialCode.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');

    const auth = useAuth();

    useEffect(() => {

        const fetchUsers = async () => {

            const response = await searchUsers(searchText);

            if (response.success) {
                setResults(response.data.users);
            }

        }

        if (searchText.length > 2) {
            fetchUsers();
        }
        else {
            setResults([]);
        }


    }, [searchText]);

    const handleUserSelectClick = () => {
        setResults([]);
        setSearchText("");
    }

    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img
                        className={styles.app_logo}
                        alt="SocialCode"
                        src={logo}
                    />
                </Link>
            </div>

            <div className={styles.searchContainer}>
                <img
                    className={styles.searchIcon}
                    src="https://cdn-icons-png.flaticon.com/128/8992/8992459.png"
                    alt=""
                />

                <input
                    placeholder='Search users'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                {results.length > 0 && <div className={styles.searchResults}>
                    <ul>
                        {results.map(user => <li className={styles.searchResultsRow} key={`user-${user._id}`}>
                            <Link
                                to={`/user/${user._id}`}
                                src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                                alt=""
                                onClick={handleUserSelectClick}
                            >
                                <span>{user.name}</span>
                            </Link>
                        </li>)}
                    </ul>
                </div>}
            </div>

            <div className={styles.rightNav}>
                {auth.user && <div className={styles.user}>
                    <Link to="/settings">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                            alt=""
                            className={styles.userDp}
                        />
                    </Link>
                    <span>{auth.user.name}</span>
                </div>}

                <div className={styles.navLinks}>
                    <ul>
                        {auth.user ? (
                            <>
                                <li onClick={auth.logout}>
                                    Log out
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Log in</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
