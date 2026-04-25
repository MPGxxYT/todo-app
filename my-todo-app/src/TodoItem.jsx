
import { useRef, useEffect } from 'react';

export default function TodoItem(
    {todoObject, handleCompletion, handleDelete, editingTodo, 
    setEditingTodo, submitEdit, editingValue, setEditingValue}) {

    const inputRef = useRef(null);
    var itemHTML;
    if (editingTodo != todoObject.id) {
        itemHTML = (
            <div className={todoObject.completed ? 'task-completed' : 'task-active'}
                onDoubleClick={() => {
                    setEditingTodo(todoObject.id)
                    setEditingValue(todoObject.text)
                }}>
                <p 
                className='todo-text'>
                    {todoObject.text}
                </p>
                <button onClick={() => handleCompletion(todoObject.id)}>✓</button>
                <button onClick={() => handleDelete(todoObject.id)}>X</button>
            </div>
        )
    } else {
        itemHTML = (
            <div className="task-active" >
                <input 
                    ref={inputRef}
                    onInput={(event) => setEditingValue(event.target.value)}
                    className='task-editing'
                    value={editingValue} 
                    onKeyDown = {(event) => {
                        if (event.key === "Enter") {
                            submitEdit(todoObject.id, event.target.value)
                        } else if (event.key === "Escape") {
                            setEditingTodo()
                        }
                    }}
                    onBlur = {(event) => submitEdit(todoObject.id, event.target.value)}
                />
            </div>
        )
    }

    useEffect(() => {
        if (editingTodo == todoObject.id) {
            inputRef.current.focus()
        }
    }, [editingTodo, todoObject.id])

    return (
        <li className='todo-item'>
            {itemHTML}
        </li>
    )
}