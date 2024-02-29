import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TaskView from "./TaskView";

export default function TaskListView() {
  const { projectId } = useParams();
  const [taskList, setTaskList] = useState([]);
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then((response) => setTaskList(response.data));
  }, [projectId]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    // Dropped outside the list
    if (!destination) {
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return; // No change
    }
  
    const start = source.droppableId;
    const finish = destination.droppableId;
  
    if (start === finish) {
      const newTaskList = Array.from(taskList);
      const [reorderedItem] = newTaskList.splice(source.index, 1);
      newTaskList.splice(destination.index, 0, reorderedItem);
  
      // Here, you'd also update the status of the task based on destination.droppableId
      // and then update the backend via an API call
  
      setTaskList(newTaskList);
    } else {
      // Moving from one list to another
      const sourceTasks = taskList.filter(task => task.status === start);
      const destTasks = taskList.filter(task => task.status === finish);
      const [removed] = sourceTasks.splice(source.index, 1);
      removed.status = finish
      destTasks.splice(destination.index, 0, removed);
      console.log(removed)
      const newState = [
        ...taskList.filter(task => task.status !== start && task.status !== finish),
        ...sourceTasks,
        ...destTasks
      ];
  
      setTaskList(newState);
      axios.put(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/tasks/${removed.id}/`, removed)
  
    }
  };

  const tasksByStatus = (status) => taskList.filter(task => task.status === status);

  return (
    <div className="flex h-full flex-col">
    <div className="flex my-3 justify-around align-center items-start">
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
    <div className="flex-1 h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full justify-around align-center items-start">
          {['TD', 'IP', 'CO'].map((status, index) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div className="w-full h-full flex flex-col items-center" ref={provided.innerRef} {...provided.droppableProps}>
                  {tasksByStatus(status).map((task, index) => (
                    <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <TaskView task={task} />
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
  </div>
  );
}