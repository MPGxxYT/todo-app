import { useState, useEffect } from "react"
import "./App.css"
import TodoItem from "./TodoItem"
import FilterButtons from "./FilterButtons"

function sanitizeToId(string) {
  string = string.replaceAll(" ", "-")
  string = string.toLowerCase()
  return string
}

const todoObjectsStarter = () => {
  let parsedData = JSON.parse(window.localStorage.getItem("todoObjects"))
  if (parsedData != null) {
    return parsedData;
  } else {
    return [
      { id: 'fold-laundry', text: 'Fold Laundry', completed: false },
      { id: 'wash-floor', text: 'Wash Floor', completed: false },
      { id: 'clean-room', text: 'Clean Room', completed: false },
    ]
  }
}

function App() {
  const [todoObjects, setTodoObjects] = useState(todoObjectsStarter)
  const [inputValue, setInputValue] = useState('')
  const [filterValue, setFilterValue] = useState("All")

  try {
    useEffect (()=> {
      window.localStorage.setItem("todoObjects", JSON.stringify(todoObjects))
    }, [todoObjects])
  } catch (err) {
    console.error("Error saving todoObjects to localStorage", err.message);
  }

  const renderedTodoObjects = todoObjects.filter(todoObject => {
    if (filterValue == "All") {
      return true;
    } else if (filterValue == "Completed" && todoObject.completed == true) {
      return true;
    } else if (filterValue == "Active" && todoObject.completed == false) {
      return true;
    } else {
      return false;
    }
  }).map((todoObject, index) => 
    <TodoItem 
    key={todoObject.id} 
    todoObject={todoObject} 
    handleCompletion={handleCompletion} 
    handleDelete={handleDelete}
    submitEdit={submitEdit}
    colorDiff={index  % 2 == 0}
    />
  );

  function submitEdit(id, value) {
    let updatedObjectsList = todoObjects.map(todoObject => {
      if (value == null || value.length <= 0) {return todoObject} // General null/empty/blank checks
      if (value.match(/^\s*$/)) {return todoObject} // (if contains only whitespace)
      let sanitizedValue = value.trim(); // Remove any leading or trailing whitespace
      if (todoObject.id == id) {
        return { ...todoObject, text: sanitizedValue }
      } else {
        return todoObject
      }
    })
    setTodoObjects(updatedObjectsList)
    // setEditingTodo()
  }

  function handleDelete(key) {
    setTodoObjects(
      todoObjects.filter(todoObject => todoObject.id != key)
    )
  }

  function handleCompletion(key) {
    let updatedObjectsList = todoObjects.map(todoObject => {
      if (todoObject.id == key) {
        return todoObject.completed ? { ...todoObject, completed: false } : { ...todoObject, completed: true }
      } else {
        return todoObject
      }
    })
    setTodoObjects(updatedObjectsList)
  }

  function handleInput(event) {
    setInputValue(event.target.value)
  }

  function addTodoObject() { 
    if (inputValue == null || inputValue.length <= 0) {return} // General null/empty/blank checks
    if (inputValue.match(/^\s*$/)) {return} // (if contains only whitespace)
    let sanitizedInputValue = inputValue.trim(); // Remove any leading or trailing whitespace
    if (todoObjects.some((object) => object.id === sanitizeToId(sanitizedInputValue))) { // Prevent duplicates (not entirely set on if this is needed)
      alert('Task already exists.')
      return
    }

    setTodoObjects([
      ...todoObjects,
      {id: sanitizeToId(sanitizedInputValue), text: sanitizedInputValue, completed: false}
    ])

    setInputValue('')
  }

  function updateFilterState(stateString) {
    if (stateString != "All" && stateString != "Active" && stateString != "Completed") {
      return false;
    }
    setFilterValue(stateString)
    // setEditingTodo()
  }

  function getTodosLeftCount() {
    if (todoObjects == null) {
      return 0;
    }
    return todoObjects.filter(todoObject => todoObject.completed == false).length;
  }

  function getPlaceholderText() {
    if (renderedTodoObjects.length > 0) {
      return '';
    }
    switch (filterValue) {
      case "Active":
      case "All": 
        return "Add something to do!";
      case "Completed":
        if (todoObjects != null && todoObjects.length > 0) {
          return "Get stuff done!";
        } else {
          return "Add something to do!";
        }
    }
  }

  return (
    <main>
      <div className="card">
        <div className="header">
          <div className="title-card">
            <p className="title-text">Todo List</p>
            <p className="todos-left">{getTodosLeftCount()} todo{getTodosLeftCount() == 1 ? '' : '\'s'} left...</p>
          </div>
          <div className="action-section">
            <div className="input-section">
              <input 
              className="add-input"
              type="text" 
              onInput={handleInput} 
              value={inputValue} 
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addTodoObject()
                }
              }} />
              <button type="button" onClick={addTodoObject}>Add</button>
            </div>
            <FilterButtons updateFilterState={updateFilterState} filterValue={filterValue}/>
          </div>
        </div>
        <div className="content-box">
          <p className="placeholder">{getPlaceholderText()}</p>
          <ul className='todo-objects'>{renderedTodoObjects}</ul>
        </div>
      </div>
    </main>
  )
}

export default App