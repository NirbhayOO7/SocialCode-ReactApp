import { useState } from "react";
import styles from "../styles/login.module.css"
import { toast } from 'react-toastify';
import { useAuth } from "../hooks";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    // console.log(auth);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            return toast.error('Please enter email & password');
        }

        setLoggingIn(true);

        const response = await auth.login(email, password);
        // console.log('login', response);
        if (response.success) {
            navigate('/');
            return toast.success('Logged In Successfully');
        }
        else {
            setLoggingIn(false);
            return toast.error(response.message);
        }
    }

    if (auth.user) {
        return <Navigate to='/' />
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>Log In</span>

            <div className={styles.field}>
                <input type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    autoComplete="nope"
                    placeholder="Email"
                />
            </div>

            <div className={styles.field}>
                <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </div>

            <div className={styles.field}>
                <button disabled={loggingIn}>
                    {loggingIn ? 'Logging in...' : 'Log In'}
                </button>
            </div>
        </form>
    )
}

export default Login;