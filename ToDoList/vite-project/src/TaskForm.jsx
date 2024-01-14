import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


const AppContainer = styled.div`
  text-align: center;
  margin: auto;
  max-width: 600px;
  padding: 20px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: lightcoral;
  }
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const TaskText = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  font-size: 16px;
  color: darkslategray;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  

  const addTask = () => {
    const task = prompt('Yeni görev ekleyin:');
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <AppContainer>
      <h1>TO DO APP</h1>
      <Button onClick={addTask}>Görev Ekle</Button>
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <TaskText completed={task.completed}>{task.text}</TaskText>
            <Button onClick={() => deleteTask(index)}>Sil</Button>
          </TaskItem>
        ))}
      </TaskList>
    </AppContainer>
  );
};





export default TaskForm