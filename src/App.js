import Navbar from './components/Navbar';
import ProjectListView from './components/ProjectListView';

function App() {

  return (
    <>
    <Navbar />
    <div className='m-3'>
      <ProjectListView />
      <button class="btn btn-primary">Button</button>
    </div>
    </>
  );
}

export default App;
