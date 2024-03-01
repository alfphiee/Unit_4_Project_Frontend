import { useUser } from "../context/UserContext"
import EditTaskView from "./EditTaskView";

export default function TaskView({ task, assignees, editTaskList }) {
  const { userId } = useUser()

    let badgeStyle = "badge badge-outline ml-auto";
    let badgeText = "Unassigned"; 
  
    if (task.assignee) {
      if (task.assignee.id === userId) {
        badgeStyle += " badge-primary"; 
        badgeText = "You";
      } else {
        badgeStyle += " badge-secondary"; 
        badgeText = task.assignee.username; 
      }
    }

  return (
  <div className="card my-1 w-full bg-base-300 shadow-xl">
    <div className="card-body mx-2 p-3">
      <div className="flex items-center">
        <h2 className="card-title underline hover:text-primary" onClick={()=>document.getElementById(`edit_task_${task.id}`).showModal()}>{task.title}</h2>
        <dialog id={`edit_task_${task.id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <EditTaskView key={task.id} task={task} editTaskList={editTaskList} assignees={assignees}/>
          </div>
        </dialog>
        <div className={badgeStyle}>{badgeText}</div>
      </div>
      <p>{task.description}</p>
      <div className="card-actions justify-end">     
      </div>
    </div>
  </div>
  )
}
