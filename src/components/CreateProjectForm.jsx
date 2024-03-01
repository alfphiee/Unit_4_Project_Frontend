import axios from 'axios'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function CreateProjectForm({ onSubmit }) {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    github_url: ''
  })

  const handleChange = (event) => {
    setFormData({...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem('access_token')
      const decoded = jwtDecode(token)
      const userId = decoded.user_id
      formData.owner_id = userId
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/projects/`, {
        ...formData
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    })
      document.getElementById('create_project').close()
      onSubmit(response.data)
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  return (
    <div>
      <h1 className='text-3xl'>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control m-3">
          <label className="input input-bordered flex items-center gap-2">
            Project Name:
            <input type="text" className="grow" name="title" value={formData['title']} onChange={handleChange} placeholder="Project" />
          </label>
        </div>
        <div className="form-control m-3">
          <textarea className="textarea textarea-bordered" name="description" value={formData['description']} onChange={handleChange} placeholder="Description"></textarea>
        </div>
        <div className="form-control m-3">
          <label className="input input-bordered flex items-center gap-2">
            Start Date:
            <input type="date" name="start_date" value={formData['start_date']} onChange={handleChange} className="grow" />
          </label>
        </div>
        <div className="form-control m-3">
          <label className="input input-bordered flex items-center gap-2">
            End Date:
            <input type="date" name="end_date" value={formData['end_date']} onChange={handleChange} className="grow" />
          </label>
        </div>
        <div className="form-control m-3">
          <label className="input input-bordered flex items-center gap-2">
            Github Url:
            <input type="text" className="grow" name="github_url" value={formData['github_url']} onChange={handleChange} />
          </label>
        </div>
        <button type="submit" className='btn btn-secondary w-full'><span className="text-white">Submit</span></button>
      </form>
    </div>
  )
}
