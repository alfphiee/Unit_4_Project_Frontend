import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import axios from "axios"

import TaskView from "./TaskView"

export default function TaskListView() {
  const { projectId } = useParams() 
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
  })
    .then((response) => setTaskList(response.data))
  }, [])

  const toDoTasks = taskList.filter(task => task.status === 'TD')
  const inProgressTasks = taskList.filter(task => task.status === 'IP')
  const completedTasks = taskList.filter(task => task.status === 'CO')

  return (
    <div className="flex h-full justify-around align-center items-start">
      <div className="w-full flex flex-col items-center">
        <h2>To Do</h2>
        {toDoTasks.map(task => (
          <TaskView key={task.id} task={task} />
        ))}
      </div>
      <div className="divider lg:divider-horizontal"></div> 
      <div className="w-full flex flex-col items-center">
        <h2>In Progress</h2>
        {inProgressTasks.map(task => (
          <TaskView key={task.id} task={task} />
        ))}
      </div>
      <div className="divider lg:divider-horizontal"></div> 
      <div className="w-full flex flex-col items-center">
        <h2>Completed</h2>
        {completedTasks.map(task => (
          <TaskView key={task.id} task={task} />
        ))}
      </div>

    </div>
  )
}
