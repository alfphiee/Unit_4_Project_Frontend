import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/projects/')
    .then((response) => setProjectList(response.data))
  }, [])

  return (
    <div className="App">
      {projectList.map(project => (
        <p>{project.title}</p>
      ))}
    </div>
  );
}

export default App;
