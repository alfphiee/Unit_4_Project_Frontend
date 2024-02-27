import axios from 'axios'
import { useState } from 'react'

export default function CreateProjectForm({ onSubmit }) {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    owner: ''
  })

  const handleChange = (event) => {
    setFormData({...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/projects/`, {
        ...formData
      })
      document.getElementById('create_project').close()
      onSubmit(response.data)
      console.log(response)
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  return (
    <div>
      <h1 className='text-3xl'>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="input input-bordered flex items-center gap-2">
            Project Name:
            <input type="text" className="grow" name="title" value={formData['title']} onChange={handleChange} placeholder="Project" />
          </label>
        </div>
        <div className="form-control">
          <textarea className="textarea textarea-bordered" name="description" value={formData['description']} onChange={handleChange} placeholder="Description"></textarea>
        </div>
        <div className="form-control">
          <label className="input input-bordered flex items-center gap-2">
            Start Date:
            <input type="text" name="start_date" value={formData['start_date']} onChange={handleChange} className="grow" placeholder="Project" />
          </label>
        </div>
        <div className="form-control">
          <label className="input input-bordered flex items-center gap-2">
            End Date:
            <input type="text" name="end_date" value={formData['end_date']} onChange={handleChange} className="grow" placeholder="Project" />
          </label>
        </div>
        <div className="form-control">
          <label className="input input-bordered flex items-center gap-2">
            Owner:
            <input type="text" name="owner" value={formData['owner']} onChange={handleChange} className="grow" placeholder="Project" />
          </label>
        </div>
        <button type="submit" className='btn'>Submit</button>
      </form>
    </div>
  )
}
