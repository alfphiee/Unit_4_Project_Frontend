import { Routes, Route } from 'react-router-dom'
import ProjectListView from '../components/ProjectListView'

export default function MainPage() {
  return (
    <Routes>
        <Route path='/' element={<ProjectListView />}/>
    </Routes>
  )
}
