import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token !== null) {
      setIsAuth(true);
      console.log(jwtDecode(token))
    }
  }, [isAuth]);

  return (
    <> 
    <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
    {!isAuth ? <AuthPage /> : <MainPage setIsAuth={setIsAuth} />}
    </>
  );
}

export default App;
