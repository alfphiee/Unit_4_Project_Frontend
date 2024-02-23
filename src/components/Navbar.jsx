export default function Navbar() {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">\BREAKdown</a>
      </div>
      <div>
        <ul class="menu menu-horizontal px-1">
          <li><a>Tasks</a></li>
          <li><a>Projects</a></li>
        </ul>
      </div>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
    </div>
  )
}
