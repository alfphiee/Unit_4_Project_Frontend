import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import ProjectListView from '../components/ProjectListView'
import LoginView from '../components/LoginView'
import Login from '../components/LoginView'
import Logout from '../components/Logout'
import TaskListView from '../components/TaskListView'
import ProjectDetailView from '../components/ProjectDetailView'

export default function MainPage({setIsAuth}) {
  const [projectList, setProjectList] = useState([])
  
  const deleteProject = (projectId) => {
    setProjectList(projectList.filter(project => project.id !== projectId))
  }

  return (
    <div className="mx-3 h-full">
    <Routes>
        <Route path='/' element={<ProjectListView projectList={projectList} setProjectList={setProjectList} />}/>
        <Route path='/projects/:projectId/tasks' element={<TaskListView />} />
        <Route path='/projects/:projectId' element={<ProjectDetailView deleteProject={deleteProject} />} />
        <Route path='/logout' element={<Logout setIsAuth={setIsAuth} />} />
    </Routes>
    </div>
  )
}
