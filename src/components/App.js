import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home posts={posts} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
