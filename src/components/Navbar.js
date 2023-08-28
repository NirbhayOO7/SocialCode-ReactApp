import styles from '../styles/navbar.module.css';
import logo from '../photos/SocialCode.png'

const Navbar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/">
                    <img
                        className={styles.app_logo}
                        alt="SocialCode"
                        // src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                        src={logo}
                    />
                </a>
            </div>

            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href="/">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                            alt=""
                            className={styles.userDp}
                        />
                    </a>
                    <span>Nirbhay</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <a href="/">Log in</a>
                        </li>
                        <li>
                            <a href="/">Log out</a>
                        </li>
                        <li>
                            <a href="/">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
