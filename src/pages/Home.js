// import PropTypes from 'prop-types';
import styles from '../styles/home.module.css'
import { Comment } from '../components'
import { useEffect, useState } from 'react';
import { Loader } from '../components';
import { getPosts } from '../api';

const Home = () => {   //object destructuring is used here: const {post} = props(later on props removed and post weare getting in same component rather than sending it as props from parent);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log("App");

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

    if (loading) {
        return <Loader />
    }
    // console.log("Home");
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

                            {post.comments.map((comment) => {
                                return <Comment comment={comment} key={`comment-${comment._id}`} />
                            })}
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
// Home.propTypes = {
//     posts: PropTypes.array.isRequired,
// };


export default Home;