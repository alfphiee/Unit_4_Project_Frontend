import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

export default function UserTaskView() {
  const [taskList, setTaskList] = useState([])

  const STATUS = {
    TD: 'To Do',
    IP: 'In Progress',
    CO: 'Completed'
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/user-tasks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    setTaskList(response.data)
    console.log(response.data)
    
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-full">
<table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Task Name</th>
        <th>Status</th>
        <th>Project Id</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {taskList.map((task, index) => (
        <tr key={task.id}>
          <td>{index+1}</td>
          <td>{task.title}</td>
          <td>{STATUS[task.status]}</td>
          <td>{task.project}</td>
          <td><Link className="link link-primary" to={`/projects/${task.project}/tasks`}>view</Link></td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  )
}
