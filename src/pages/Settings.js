import { useState } from 'react';
import { useAuth } from '../hooks';
import { toast } from 'react-toastify';
import styles from '../styles/settings.module.css';

const Settings = () => {
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user?.name);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);

    const clearForm = () => {
        setPassword("");
        setConfirmPassword("");
    }

    const updateProfile = async () => {
        setSavingForm(true);

        let error = false;
        if (!name || !password || !confirmPassword) {
            toast.error("Please provide name, passsword & confirm password!");
            error = true;
        }

        if (password !== confirmPassword) {
            toast.error("password and confirm password does not match!");
            error = true;
        }

        if (error) {
            setSavingForm(false);
        } else {
            const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);

            if (response.success) {
                setEditMode(false);
                setSavingForm(false);
                clearForm();

                toast.success('User updated successfully!');
            }
            else {
                toast.error(response.message);
            }

            setSavingForm(false);
        }
    };

    // if (!auth.user) {
    //     return <Navigate to='/' />;
    // }

    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                    src='https://cdn-icons-png.flaticon.com/128/4140/4140048.png'
                    alt=''
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{auth.user?.email}</div>
                {/* auth.user?.email ==     auth.user ? auth.user.email : undefined  */}
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                {editMode ? (
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        placeholder={auth.user?.name}
                        value={name}
                    />
                ) : (
                    <div className={styles.fieldValue}>{auth.user?.name}</div>
                )
                }
            </div>
            {editMode && (
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Confirm Password</div>
                        <input
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </>
            )}

            <div className={styles.btnGrp}>
                {editMode ? (
                    <>
                        <button
                            className={`button ${styles.saveBtn}`}
                            onClick={updateProfile}
                            disabled={savingForm}
                        >
                            {savingForm ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            className={`button ${styles.editBtn}`}
                            onClick={() => setEditMode(false)}
                        >Go Back
                        </button>
                    </>
                ) : (
                    <button
                        className={`button ${styles.editBtn}`}
                        onClick={() => setEditMode(true)}
                    >Edit
                    </button>
                )}
            </div>
        </div>
    )
}

export default Settings;