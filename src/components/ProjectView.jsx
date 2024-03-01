import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from '../context/UserContext'
import axios from 'axios'

export default function ProjectView({ project }) {

  const { userId } = useUser()
  const [taskList, setTaskList] = useState([])

  const totalTasks = taskList.length
  const completedTasks = taskList.filter(task => task.status === 'CO').length
  let percentage = 0
  if (totalTasks !== 0) percentage = Math.round((completedTasks / totalTasks) * 100)

  const handleButtonClick = (event) => {
    event.stopPropagation();
    const url = project.github_url;
    window.open(url, '_blank');
  }

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${project.id}/tasks`)
      setTaskList(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTaskData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const isOwner = userId === project.owner.id

  let statusStyle = ''
  let status = ''
  if(project.status === 'PL') {
    statusStyle = 'text-info'
    status = 'Planning'
  } else if (project.status === 'IP') {
    statusStyle = 'text-warning'
    status = 'In Progress'
  } else if (project.status === 'CO') {
    statusStyle = 'text-success'
    status = 'Completed'
  } else if (project.status === 'OH') {
    statusStyle = 'text-error'
    status = 'On Hold'
  }

  return (
    <Link to={{
      pathname: `/projects/${project.id}`,
      state: { project }
    }}>
    <div className="card m-2 lg:card-side bg-base-300 hover:bg-base-200 shadow-xl">
  <figure className="lg:w-[150px] ml-2"><div className="radial-progress text-primary" style={{"--value":percentage}} role="progressbar">{percentage}%</div>
</figure>
  <div className="card-body pl-4">
    <div className="flex items-center">
      <h2 className="card-title">{project.title}</h2>
      <div className="badge badge-primary badge-outline ml-3">{isOwner ? 'owner': 'collaborator'}</div>
    </div>
    <p>{project.description}</p>
    <div className="card-actions justify-end items-center">
      <p className={statusStyle}>{status}</p>
      {project.github_url && <button className="btn btn-ghost" onClick={handleButtonClick}>
      <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </button>}
    </div>
  </div>
</div>
</Link>
  )
}
