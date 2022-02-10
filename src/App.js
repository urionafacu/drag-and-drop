import * as React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { initialTasks } from './utils/tasks';
import { reorder } from './utils/reorder';
import './App.css';

function App() {
  const [tasks, setTasks] = React.useState(initialTasks);

  const handleOnDragEnd = (e) => {
    const { source, destination } = e;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    setTasks((prevTasks) => reorder(prevTasks, source.index, destination.index));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="app">
        <h1>ESTUDIAR</h1>
        <Droppable droppableId='tasks'>
          {({ droppableProps, innerRef, placeholder }) => (
            <ul 
              {...droppableProps}
              ref={innerRef}
              className='task-container'
            >
              {tasks.map((e, i) => (
                <Draggable key={e.id} draggableId={e.id} index={i}>
                  {({ draggableProps, innerRef, dragHandleProps }) => (
                    <li
                      {...draggableProps}
                      {...dragHandleProps}
                      ref={innerRef}
                      className='task-item'
                    >
                      {e.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
