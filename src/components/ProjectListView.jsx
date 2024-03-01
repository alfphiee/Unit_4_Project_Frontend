import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { NotebookPen, Hammer, CheckSquare } from 'lucide-react'

import ProjectView from "./ProjectView"
import CreateProjectForm from './CreateProjectForm'
import { Plus } from 'lucide-react'

export default function ProjectListView({projectList, setProjectList}) {
  
  const addProject = (project) => {
    setProjectList([...projectList, project])
  }

  const planningCount = projectList.filter(project => project.status === 'PL').length
  const inProgressCount = projectList.filter(project => project.status === 'IP').length
  const completedCount = projectList.filter(project => project.status === 'CO').length

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
  })
    .then((response) => setProjectList(response.data))
  }, [])


  return (
    <div className='flex flex-col'>
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
    <CreateProjectForm onSubmit={addProject} />
  </div>
</dialog>
        </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
          <NotebookPen size={32} />
          </div>
          <div className="stat-title">Planning</div>
          <div className="stat-value text-primary">{planningCount}</div>
        </div>
  
        <div className="stat">
          <div className="stat-figure text-secondary">
          <Hammer size={32}/>
          </div>
          <div className="stat-title">In Progress</div>
          <div className="stat-value text-secondary">{inProgressCount}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-success">
          <CheckSquare size={32} />
          </div>
          <div className="stat-title">Completed</div>
          <div className="stat-value text-success">{completedCount}</div>
        </div>

      </div>    
    </div>
      <div className='grid flex-1 overflow-y-auto grid-cols-3'>
        {projectList.map((project) => (
            <ProjectView key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}