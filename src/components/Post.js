import styles from '../styles/home.module.css'
import { Comment } from '../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createComment, getLikeDetails, toggleLike } from '../api';
import { toast } from 'react-toastify';
import { usePosts } from '../hooks';

const Post = ({ post }) => {

    const [comment, setComment] = useState('');
    const [creatingComment, setCeratingComment] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes.length);
    const posts = usePosts();


    const handleAddComment = async (e) => {
        if (e.key === "Enter") {
            setCeratingComment(true);

            if (comment === "") {
                toast.error('Please enter some comment!');
            }
            else {
                const response = await createComment(post._id, comment);

                if (response.success) {
                    setComment('');
                    posts.addComment(response.data.comment, post._id);
                    toast.success('Comment added!');
                }
                else {
                    toast.error(response.message);
                }
            }

            setCeratingComment(false);
        }
    }

    const handlePostLikeClick = async () => {

        const response = await toggleLike(post._id, 'Post');
        if (response.success) {
            if (response.data.deleted) {
                toast.success('Like removed!');
            }
            else {
                toast.success('Like added!')
            }

            const response2 = await getLikeDetails(post._id, 'Post');

            if (response2.success) {
                setLikesCount(response2.data.length);
            }
        }
        else {
            toast.error(response.message);
        }

    }

    return (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/924/924915.png"
                        alt="user-pic"
                    />
                    <div>
                        <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
                        <span className={styles.postTime}>a minute ago</span>
                    </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                    <div className={styles.postLike}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/456/456115.png"
                            alt="likes-icon"
                            onClick={handlePostLikeClick}
                        />
                        <span>{likesCount}</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/2190/2190552.png"
                            alt="comments-icon"
                        />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <div className={styles.postCommentBox}>
                    <input
                        placeholder="Start typing a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleAddComment}
                        disabled={creatingComment}
                    />
                </div>

                {post.comments.map((comment) => {
                    return <Comment comment={comment} key={`comment-${comment._id}`} />
                })}
            </div>
        </div>
    );
}

export default Post;