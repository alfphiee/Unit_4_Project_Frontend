import { useState, useEffect } from 'react'

import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <div className='flex flex-col h-screen'>
      <div>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      </div>
      <div className='flex-1 overflow-y-auto'>
        {!isAuth ? <AuthPage /> : <MainPage setIsAuth={setIsAuth} />}
      </div>
    </div>
  );
}

export default App;
