import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react'

import TaskView from "./TaskView";
import CreateTaskForm from "./CreateTaskForm";

export default function TaskListView() {
  const { projectId } = useParams();
  const [taskList, setTaskList] = useState([]);
  const [assignees, setAssignees] = useState([])

  const fetchProjectData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`,{ 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    const assgineeList = await [response.data.owner, ...response.data?.collaborators]
    setAssignees(assgineeList)
  }

  const editTaskList = (updatedTask) => {
    const newTaskList = taskList.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask
      }
      return task
    })
    setTaskList(newTaskList)
  }

  useEffect(() => {
    fetchProjectData()
  }, [projectId])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then((response) => setTaskList(response.data));
  }, [projectId]);

  const addTask = (task) => {
    setTaskList([...taskList, task])
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    // Dropped outside the list
    if (!destination) {
      return;
    }
  
    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish && destination.index === source.index) {
      return; // No change
    }
  
    if (start === finish) {
      const items = Array.from(taskList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
    
      setTaskList(items);
    } else {
      // Moving from one list to another
      const sourceTasks = taskList.filter(task => task.status === start);
      const destTasks = taskList.filter(task => task.status === finish);
      const [removed] = sourceTasks.splice(source.index, 1);
      removed.status = finish
      destTasks.splice(destination.index, 0, removed);
      const newState = [
        ...taskList.filter(task => task.status !== start && task.status !== finish),
        ...sourceTasks,
        ...destTasks
      ];
  
      setTaskList(newState);
      axios.put(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks/${removed.id}/`, {
        ...removed,
        assignee_id: removed.assignee?.id || null
      })
  
    }
  };

  const tasksByStatus = (status) => taskList.filter(task => task.status === status);

  return (
    <div className="flex h-full flex-col">
    <div className="flex mt-3 justify-around align-center items-start">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl">To Do</h2>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl">In Progress</h2>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl">Completed</h2>
      </div>
    </div>
    <div className="divider"></div> 
    <div className="flex-1 h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full justify-around align-center items-start">
          {['TD', 'IP', 'CO'].map((status, index) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div className="w-full mx-2 h-full flex flex-col items-center" ref={provided.innerRef} {...provided.droppableProps}>
                  {tasksByStatus(status).map((task, index) => (
                    <Draggable className="w-full" key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div className="w-full" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskView assignees={assignees} editTaskList={editTaskList} task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
    <button className="!h-16 !w-16 btn btn-secondary p-0 rounded-full text-16xl fixed bottom-5 right-5 z-50" onClick={()=>document.getElementById('create_task').showModal()}>
    <Plus color="#ffffff" strokeWidth={3} />
    </button>
    <dialog id="create_task" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <CreateTaskForm projectId={projectId} assignees={assignees} addTask={addTask}/>
  </div>
</dialog>
  </div>
  );
}