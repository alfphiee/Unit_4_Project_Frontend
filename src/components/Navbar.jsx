import { Link } from "react-router-dom"

export default function Navbar({isAuth, setIsAuth}) {
  return (
    <div className="navbar fixed top-0 bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">\BREAK<span className="ml-[-5px] text-secondary">down</span></a>
      </div>
      <div>
        <ul class="menu menu-horizontal px-1">
          <li><a>Tasks</a></li>
          <li><a>Projects</a></li>
        </ul>
      </div>
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li onClick={()=> setIsAuth(false)}><Link to='/logout'>Logout</Link></li>
      </ul>
    </div>
    </div>
  )
}
