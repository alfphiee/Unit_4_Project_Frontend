import { useState } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios'

export default function EditTaskView({ task, assignees, editTaskList }) {
  const { projectId } = useParams();
  task.assignee_id = task.assignee?.id
  const [formData, setFormData] = useState(task)

  console.log(formData)


  const handleChange = (event) => {
    setFormData({...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks/${task.id}/`, 
    {...formData, assignee_id: formData.assignee_id || null})
    editTaskList(response.data)
    document.getElementById(`edit_task_${task.id}`).close()

  }



  return (
    <div>
    <h1 className='text-3xl mb-3'>Edit Task</h1>
    <form className="grid grid-cols-4 gap-2 items-center" onSubmit={handleSubmit}>
      <label htmlFor="edit-task-title" className="text-right">Name</label>
      <input type="text" id="edit-task-title" name="title" value={formData.title} onChange={handleChange} className="input input-bordered col-span-3 w-full max-w-xs"/>
      <label htmlFor="edit-task-desc" className="text-right">Description</label>
      <textarea className="textarea col-span-3 textarea-bordered" id="edit-task-desc" name="description" value={formData.description} onChange={handleChange}></textarea>
      <label htmlFor="edit-task-status" className="text-right">Status</label>
      <select className="select select-bordered col-span-3 w-full max-w-xs" id="edit-task-status" name="status" value={formData.status} onChange={handleChange}>
        <option value='TD'>To Do</option>
        <option value='IP'>In Progress</option>
        <option value='CO'>Completed</option>
      </select>
      <label htmlFor="edit-task-assignee" className="text-right">Assignee</label>
      <select className="select select-bordered col-span-3 w-full max-w-xs" id="edit-task-assignee" name="assignee_id" value={formData.assignee_id} onChange={handleChange}>
        <option value={''}>None</option>
        {assignees.map(assignee => (
          <option key={assignee.id} value={assignee.id}>{assignee.username}</option>
        ))}
      </select>
      <button type="submit" className='btn btn-secondary w-full mt-4 col-span-4'><span className="text-white">Save</span></button>
    </form>
  </div>
  )
}

