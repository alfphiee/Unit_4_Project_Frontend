import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"
import axios from 'axios'

export default function Navbar({isAuth, setIsAuth}) {
  const { userId } = useUser()
  const [user, setUser] = useState({})

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
      setUser(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(isAuth) fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])


  return (
    <div className="navbar sticky top-0 bg-base-300">
      <div className="flex-1">
        <Link to='/'><button className="btn btn-ghost text-xl">\BREAK<span className="ml-[-5px] text-secondary">down</span></button></Link>
      </div>
      {isAuth &&
      <>
      <div>
        <ul className="menu menu-horizontal px-1">
          <li>My Tasks</li>
        </ul>
      </div>
      <div className="dropdown dropdown-end">
      {user?.url 
      ?
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Avatar" src={user.url} />
        </div>
      </div>
      :
      <div tabIndex={0} role="button" className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-10">
          <span className="text-3xl">{user?.username ? user.username[0] : ''}</span>
        </div>
      </div> }
      <ul tabIndex={0} className="mt-3 z-[999999] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
        <li>
          <Link className="justify-between">
            Profile
          </Link>
        </li>
        <li onClick={()=> setIsAuth(false)}><Link to='/logout'>Logout</Link></li>
      </ul>
    </div>
    </>}
    </div>
  )
}
