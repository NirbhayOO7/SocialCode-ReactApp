import { Home, Login, Settings, SignUp } from '../pages';
import { Loader, Navbar } from './';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks';

// import { Test } from './test';

function App() {

  const auth = useAuth();

  if (auth.loading) {
    return <Loader />
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/settings' element={<Settings />} />
        {/* <Route path='/test' element={<Test />} /> */}
      </Routes>
    </div>
  );
}

export default App;
