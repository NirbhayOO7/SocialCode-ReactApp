import PropTypes from 'prop-types';
import styles from '../styles/home.module.css'


const Home = ({ posts }) => {   //object destructuring is used here: const {post} = props;

    return (
        <div className={styles.postsList} >
            {
                posts.map((post) => (
                    <div className={styles.postWrapper} key={`post-${post._id}`}>
                        <div className={styles.postHeader}>
                            <div className={styles.postAvatar}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/924/924915.png"
                                    alt="user-pic"
                                />
                                <div>
                                    <span className={styles.postAuthor}>{post.user.name}</span>
                                    <span className={styles.postTime}>a minute ago</span>
                                </div>
                            </div>
                            <div className={styles.postContent}>{post.content}</div>

                            <div className={styles.postActions}>
                                <div className={styles.postLike}>
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/456/456115.png"
                                        alt="likes-icon"
                                    />
                                    <span>5</span>
                                </div>

                                <div className={styles.postCommentsIcon}>
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/2190/2190552.png"
                                        alt="comments-icon"
                                    />
                                    <span>2</span>
                                </div>
                            </div>
                            <div className={styles.postCommentBox}>
                                <input placeholder="Start typing a comment" />
                            </div>

                            <div className={styles.postCommentsList}>
                                <div className={styles.postCommentsItem}>
                                    <div className={styles.postCommentHeader}>
                                        <span className={styles.postCommentAuthor}>Bill</span>
                                        <span className={styles.postCommentTime}>a minute ago</span>
                                        <span className={styles.postCommentLikes}>22</span>
                                    </div>

                                    <div className={styles.postCommentContent}>Random comment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    );
};

// below lines are used to check props validation, to use this we need to install prop-types in our react project.
// here in below case we are checking whether posts is of type array or not and isRequired is used to mark posts prop as neccessary to create Home component
// if we didn't recieve the posts or if we posts is not an array then we will get error.
//NOTE: prop-types only work in development mode.
Home.propTypes = {
    posts: PropTypes.array.isRequired,
};


export default Home;