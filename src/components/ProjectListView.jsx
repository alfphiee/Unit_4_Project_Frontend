import { useEffect, useState } from 'react'
import axios from 'axios'

import ProjectView from "./ProjectView"
import CreateProjectForm from './CreateProjectForm'
import { Plus } from 'lucide-react'

export default function ProjectListView() {
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/projects/')
    .then((response) => setProjectList(response.data))
  }, [])


  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex'>
          <h2 className='text-5xl font-bold'>Projects</h2>
          <button className="btn btn-secondary btn-circle text-8xl ml-5" onClick={()=>document.getElementById('create_project').showModal()}>
            <Plus color="#ffffff" strokeWidth={3} />
          </button>
          <dialog id="create_project" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <CreateProjectForm />
  </div>
</dialog>
        </div>
      <div className="stats shadow">
  
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
  
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
  
        <div className="stat">
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>    
    </div>
      <div className='grid grid-cols-3'>
        {projectList.map((project) => (
          <ProjectView project={project} />
        ))}
        <div className="card m-2 bg-base-300 shadow-xl">
          +
          </div>
      </div>
    </div>
  )
}