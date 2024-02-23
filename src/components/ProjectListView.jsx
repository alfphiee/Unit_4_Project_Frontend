import { useEffect, useState } from 'react'
import axios from 'axios'

import ProjectView from "./ProjectView"

export default function ProjectListView() {
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/projects/')
    .then((response) => setProjectList(response.data))
  }, [])


  return (
    <>
      {projectList.map((project) => (
        <ProjectView />
      ))}
    </>
  )
}