import React from 'react'
import './Task.css'

const Task = ({ item }) => {
  return (
    <div className="task">
      <h2>{item}</h2>
    </div>
  )
}

export default Task
