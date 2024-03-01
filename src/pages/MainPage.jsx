import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import ProjectListView from '../components/ProjectListView'
import Logout from '../components/Logout'
import TaskListView from '../components/TaskListView'
import ProjectDetailView from '../components/ProjectDetailView'
import UserTaskView from '../components/UserTaskView'

export default function MainPage({setIsAuth}) {
  const [projectList, setProjectList] = useState([])
  
  const deleteProject = (projectId) => {
    setProjectList(projectList.filter(project => project.id !== projectId))
  }

  const updateProject = (updatedProject) => {
    const newProjectList = projectList.map(project => {
      if(project.id === updatedProject.id) {
        return updatedProject
      } return project
    })
    setProjectList(newProjectList)
  }

  return (
    <div className="mx-3 h-full">
    <Routes>
        <Route path='/' element={<ProjectListView projectList={projectList} setProjectList={setProjectList} />}/>
        <Route path='/projects/:projectId/tasks' element={<TaskListView />} />
        <Route path='/projects/:projectId' element={<ProjectDetailView deleteProject={deleteProject} updateProject={updateProject} />} />
        <Route path='/logout' element={<Logout setIsAuth={setIsAuth} />} />
        <Route path='/tasks' element={<UserTaskView />} />
    </Routes>
    </div>
  )
}
