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
    <div className='flex flex-col h-screen'>
    <div><Navbar isAuth={isAuth} setIsAuth={setIsAuth} /></div>
    <div className='flex-1 overflow-y-auto'>{!isAuth ? <AuthPage /> : <MainPage setIsAuth={setIsAuth} />}</div>
    </div>
  );
}

export default App;
