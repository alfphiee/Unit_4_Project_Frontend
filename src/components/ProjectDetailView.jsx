import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { useUser } from "../context/UserContext";

export default function ProjectDetailView({deleteProject, updateProject}) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { userId } = useUser()
  
    const [project, setProject] = useState({
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      status: '',
      github_url: '',
      owner: '',
      collaborators: [],
    })
    const [collaboratorEmail, setCollaboratorEmail] = useState('')
    const [collaboratorEmailList, setCollaboratorEmailList] = useState(project.collaborators.map(collaborator => collaborator.email))
    const [addCollab, setAddCollab] = useState(false)
    const [showSuccess, setShowSuccess] =  useState(false)

  const isOwner = userId === project.owner.id

  const handleChange = (event) => {
    setProject({...project,
      [event.target.name]: event.target.value
    })
  }

   const handleAddCollaborator = () => {
    setCollaboratorEmailList([...collaboratorEmailList, collaboratorEmail])
    setAddCollab(false)
   }

   const handleDeleteCollaborator = (collaboratorIndex) => {
    const newEmailList = collaboratorEmailList.filter((_, index) => index !== collaboratorIndex)
    setCollaboratorEmailList(newEmailList)
   }

  const handleDelete = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/`)
    deleteProject(projectId)
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/`, 
      { ...project, collaborators_emails: collaboratorEmailList })
      updateProject(project)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000); 
    } catch (error) {
      console.error("An Error occured while updating the project:", error)
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
  })
  .then((response) => {
    const sanitizedData = Object.keys(response.data).reduce((acc, key) => {
      acc[key] = response.data[key] === null ? '' : response.data[key];
      return acc;
    }, {});
    setProject(sanitizedData);
    setCollaboratorEmailList(sanitizedData.collaborators.map(collaborator => collaborator.email))
  });
  }, [])

  const options = [['PL', 'Planning'], ['IP', 'In Progress'], ['CO', 'Completed'], ['OH', 'On Hold']]
  return (
    <div className="container flex flex-col mx-auto p-4">
      <div className="flex mb-3">
        <h2 className="text-4xl">Project Details</h2>
        <div className="ml-auto">
          <Link to={`/projects/${projectId}/tasks`}>
            <button className="btn btn-secondary"><span className="text-white">View Tasks</span></button>
          </Link>
          {isOwner && <button className="ml-2 btn btn-ghost" onClick={()=>document.getElementById('confirm_delete').showModal()}>Delete</button>}
          <dialog id="confirm_delete" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Confirm Delete</h3>
    <p className="py-4">Are you sure you want to delete this Project?</p>
    <button onClick={handleDelete} className="btn btn-error ml-auto"><span className="text-white">Delete</span></button>
  </div>
</dialog>
        </div>
      </div>
      <div className="flex">
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 items-center ">
        <label htmlFor="project-title" className="text-right">Name</label>
        <input type="text" id="project-title" name="title" value={project.title} onChange={handleChange} className="input input-bordered col-span-3 w-full max-w-xs" disabled={!isOwner} />
        <label htmlFor="project-desc" className="text-right">Description</label>
        <textarea className="textarea col-span-3 max-w-xs textarea-bordered" id="project-desc" name="description" value={project.description} onChange={handleChange} placeholder="Project Description" disabled={!isOwner}></textarea>
        <label htmlFor="project-start-date" className="text-right">Start Date</label>
        <input type="date" id="project-start-date" name="start_date" value={project.start_date} onChange={handleChange} className="input input-bordered col-span-3 w-full max-w-xs" disabled={!isOwner}/>
        <label htmlFor="project-end-date" className="text-right">End Date</label>
        <input type="date" id="project-end-date" name="end_date" value={project.end_date} onChange={handleChange} className="input input-bordered col-span-3 w-full max-w-xs" disabled={!isOwner}/>
        <label htmlFor="project-status" className="text-right">Status</label>
        <select className="select select-bordered col-span-3 w-full max-w-xs" id="project-status" name="status" value={project.status} onChange={handleChange} disabled={!isOwner}>
          {options.map((option) => (
            <option key={option[0]} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>
        <label htmlFor="project-github-url" className="text-right">Github Link</label>
        <input type="text" id="project-github-url" name="github_url" value={project.github_url} onChange={handleChange} className="input input-bordered col-span-3 w-full max-w-xs" disabled={!isOwner}/>
        <div></div>
        {isOwner && <button type="submit" className="btn btn-primary">Save Changes</button>}
      </form>
      <div className="flex ml-4 flex-1 flex-col">
      <h3 className="text-2xl">Collaborators</h3>
      <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        {isOwner && <th>Action</th>}
      </tr>
    </thead>
    <tbody>
      {collaboratorEmailList.map((collaborator, index) => (
            <tr>
              <th>{index+1}</th>
              <td>{collaborator}</td>
              {isOwner && <td><button onClick={() => handleDeleteCollaborator(index)} className="badge badge-error gap-2">Remove</button></td>}
            </tr>
      ))}
      
      {!addCollab && isOwner
      &&
      <tr>
        <td></td>
        <td><button onClick={() => setAddCollab(!addCollab) } className="link link-primary">Add New Collaborator</button></td>
      </tr>}
      {addCollab && isOwner
      &&
      <tr>
        <td>{project.collaborators.length + 1}</td>
        <td><input type="text" value={collaboratorEmail} onChange={(e) => setCollaboratorEmail(e.target.value)} className="input input-bordered col-span-3 w-full max-w-xs"/></td>
        <td><button onClick={handleAddCollaborator} className="badge badge-success gap-2">Add</button></td>
      </tr>
    }

    </tbody>
  </table>
      </div>
      </div>
      {showSuccess && <div className="p-3 toast toast-end">
        <div className="alert alert-success">
          <span>Changes Saved</span>
        </div>
      </div>}
    </div>
  )
}
