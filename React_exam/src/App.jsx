import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home_page from './Components/Home_page/Home_page';
import Add_Movie from './Components/Add_Movie/Add_movie';
import Edit_Movie from './Components/Edit_movie/Edit_movie';
import View_Movie from './Components/View_movie/View_movie';
import Footer from './Components/Footer/Footer';
import SignIn from './Components/Signin_page/Signin';
import SignUp from './Components/Signup_page/Signup';
import { checkAuthStatus } from './Services/Actions/Auth_Action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/add" element={<Add_Movie />} />
        <Route path="/edit/:id" element={<Edit_Movie />} />
        <Route path="/view/:id" element={<View_Movie />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;