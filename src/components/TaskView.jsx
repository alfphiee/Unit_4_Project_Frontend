export default function TaskView({ task }) {
  return (
  <div className="card my-1 bg-base-300 shadow-xl">
    <div className="card-body p-3">
      <h2 className="card-title">{task.title}</h2>
      <p>{task.description}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Edit</button>
      </div>
    </div>
  </div>
  )
}
