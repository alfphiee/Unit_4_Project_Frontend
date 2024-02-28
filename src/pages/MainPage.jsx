import { Routes, Route } from 'react-router-dom'
import ProjectListView from '../components/ProjectListView'
import LoginView from '../components/LoginView'
import Login from '../components/LoginView'
import Logout from '../components/Logout'
import TaskListView from '../components/TaskListView'

export default function MainPage({setIsAuth}) {
  return (
    <div className="m-3">
    <Routes>
        <Route path='/' element={<ProjectListView />}/>
        <Route path='/projects/:projectId' element={<TaskListView />} />
        <Route path='/logout' element={<Logout setIsAuth={setIsAuth} />} />
    </Routes>
    </div>
  )
}
