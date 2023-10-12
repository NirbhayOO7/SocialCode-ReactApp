// import PropTypes from 'prop-types';
import styles from '../styles/home.module.css'
import { Post, CreatePost, FriendsList } from '../components'

import { Loader } from '../components';

import { useAuth, usePosts } from '../hooks';

const Home = () => {   //object destructuring is used here: const {post} = props(later on props removed and post weare getting in same component rather than sending it as props from parent);

    // console.log("App");
    const auth = useAuth();
    const posts = usePosts();

    if (posts.loading) {
        return <Loader />
    }
    // console.log("Home");
    return (
        <div className={styles.home}>
            <div className={styles.postsList} >
                {auth.user ? <CreatePost /> : ""}
                {
                    posts.data.map((post) => (
                        <Post post={post} key={`post-${post._id}`} />
                    ))
                }
            </div >
            {auth.user && <FriendsList />}
        </div>
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