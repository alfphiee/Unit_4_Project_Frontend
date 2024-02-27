import { useState } from 'react'

import logo from '../logo.png'
import LoginView from '../components/LoginView'
import SignupView from '../components/SignupView'

export default function AuthPage() {

  const [isLogin, setIsLogin] = useState(true)

  const handleTabClick = (tab) => {
    if(tab === 'login') setIsLogin(true)
    else setIsLogin(false)
  }

  let loginClass = ''
  let signupClass = ''

  if (isLogin) {
    loginClass = 'tab tab-active'
    signupClass = 'tab'
  } else {
    signupClass = 'tab tab-active'
    loginClass = 'tab'
  }


  return (
    <div className="hero min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="hero-content w-full text-center grid grid-cols-2">
      <div className="max-w-md text-white">
        <img className="invert mb-7" src={logo} />
        <h1 className="text-5xl font-bold">Welcome to BREAKdown</h1>
        <p className="py-6">Translate your idea from your head to reality. Streamline your Project Journey with a simple and effective Planning and Task Management tool!</p>
      </div>
      <div className="card p-3 shrink-0 w-full max-w-sm shadow-2xl bg-base-100 justify-self-center">
        <div role="tablist" className="tabs tabs-boxed mb-4">
          <a role="tab" onClick={() => handleTabClick('login')} className={loginClass}>Login</a>
          <a role="tab" onClick={() => handleTabClick('signup')} className={signupClass}>Sign up</a>
        </div>
          { 
          isLogin 
          ? <LoginView />
          : <SignupView />
          }
      </div>
    </div>
  </div>
  )
}
