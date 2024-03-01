import { useState } from "react"
import axios from 'axios'

export default function CreateTaskForm({projectId, assignees  ,addTask}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TD',
    assignee_id: ''
  })

  

  const handleChange = (event) => {
    setFormData({...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks/`, 
    {...formData, assignee_id: formData.assignee_id || null})
    addTask(response.data)
    document.getElementById('create_task').close()

  }

  return (
    <div>
    <h1 className='text-3xl mb-3'>Create New Task</h1>
    <form className="grid grid-cols-4 gap-2 items-center" onSubmit={handleSubmit}>
      <label htmlFor="task-title" className="text-right">Name</label>
      <input type="text" id="task-title" name="title" value={formData.title} onChange={handleChange} className="input input-bordered col-span-3 w-full max-w-xs"/>
      <label htmlFor="task-desc" className="text-right">Description</label>
      <textarea className="textarea col-span-3 textarea-bordered" id="task-desc" name="description" value={formData.description} onChange={handleChange}></textarea>
      <label htmlFor="task-status" className="text-right">Status</label>
      <select className="select select-bordered col-span-3 w-full max-w-xs" id="task-status" name="status" value={formData.status} onChange={handleChange}>
        <option value='TD'>To Do</option>
        <option value='IP'>In Progress</option>
        <option value='CO'>Completed</option>
      </select>
      <label htmlFor="task-assignee" className="text-right">Assignee</label>
      <select className="select select-bordered col-span-3 w-full max-w-xs" id="task-assignee" name="assignee_id" value={formData.assignee_id} onChange={handleChange}>
        <option value=''>None</option>
        {assignees.map(assignee => (
          <option key={assignee.id} value={assignee.id}>{assignee.username}</option>
        ))}
      </select>
      <button type="submit" className='btn btn-secondary w-full col-start-4'><span className="text-white">Submit</span></button>
    </form>
  </div>
  )
}
