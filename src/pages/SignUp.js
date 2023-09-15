import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks'
import { useNavigate } from 'react-router-dom';

const SingUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registering, setRegistering] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();   // useHistroy which shown in lecture is for older version and its has been changed to useNavigate.

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            return toast.error('Please enter all details!');
        }

        if (password !== confirmPassword) {
            return toast.error('Password and Confirm Password does not match!');
        }

        setRegistering(true);

        const response = await auth.signup(name, email, password, confirmPassword);

        if (response.success) {
            navigate('/login');
            return toast.success('Successfully Registered!');
        }
        else {
            return toast.error(response.message);
        }

        // const response = auth.SingUp(email, password);

        // if (response.success) {
        //     return toast.success('Logged In Successfully');
        // }
        // else {
        //     return toast.error(response.message);
        // }
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <span className={styles.loginSignupHeader}>Register</span>
            <div className={styles.field}>
                <input
                    type="text"
                    name="Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    autoComplete="new-password"
                />
            </div>

            <div className={styles.field}>
                <input
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    autoComplete="new-password"
                />
            </div>

            <div className={styles.field}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </div>
            <div className={styles.field}>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
            </div>
            <div className={styles.field}>
                <button disabled={registering}>
                    {registering ? 'Registering...' : 'Register'}
                </button>
            </div>
        </form>
    )
}

export default SingUp;