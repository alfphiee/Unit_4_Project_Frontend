import React from 'react'

export default function CreateProjectForm() {
  return (
    <>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <button className='btn' onClick={()=>document.getElementById('create_project').close()}>Submit</button>
    </>
  )
}
