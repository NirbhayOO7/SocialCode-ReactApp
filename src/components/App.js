import { Home, Login, Settings, SignUp } from '../pages';
import { Loader, Navbar } from './';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks';
import UserPrfoile from '../pages/UserProfile';

// import { Test } from './test';

function App() {

  const auth = useAuth();
  console.log('auth', auth);

  if (auth.loading) {
    return <Loader />
  }

  function PrivateRoute({ children }) { //content destructuring is being used here, like insted of writing PrivateRoute(props) then
    //inside function we case use props.children we are destructuring the props object directly in function decleration
    const auth = useAuth();

    return (auth.user ? children : <Navigate to='/login' />);
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/settings'
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path='/user/:userId'
          element={
            <PrivateRoute>
              <UserPrfoile />
            </PrivateRoute>
          }
        />
        {/* <Route path='/test' element={<Test />} /> */}
      </Routes>
    </div>
  );
}

export default App;
