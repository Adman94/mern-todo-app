import React, { useState, useEffect } from 'react';
import './App.css';
import Task from './components/Task';
import axios from './axios'

// https://todos--app.herokuapp.com/

function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = () => axios.get('/gettodos').then((res) => setTodos(res.data))

  const saveTodo = async (e) => {
    e.preventDefault()
    await axios.post('/todos', {
      todo: input
    })
    setInput('')
    await getTodos()
  }

  // console.log(todos);

  const deleteTodo = async (id) => {
    // e.preventDefault()
    await axios.delete(`/deltodos/${id}`)
      .then(res => {
        console.log(res);
        if (res.data.status === 'success') {
          window.location.reload()
        }
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log(id);
  }

  return (
    <div className="App">
      <div className="app__todoListBg">
        <h1>TO DO LIST</h1>
        <div className="app__input">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="btn">
            <button onClick={saveTodo} disabled={!input}>Save</button>
          </div>
        </div>
        {/* todolist */}
        <div className="app__todoList">
          {
            todos.map(entry => (
              <div key={entry._id} className="task__item">
                <Task item={entry.todo} />
                <button className="deleteBtn" onClick={() => deleteTodo(entry._id)}>Delete</button>
              </div>

            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
