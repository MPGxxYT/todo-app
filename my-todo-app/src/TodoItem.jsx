
import { useRef, useEffect, useState } from 'react';

export default function TodoItem(
    {todoObject, handleCompletion, handleDelete, submitEdit, colorDiff}) {

    const [editingTodo, setEditingTodo] = useState(null)
    const [editingValue, setEditingValue] = useState("")
    const inputRef = useRef(null);
    let itemHTML;
    if (editingTodo != todoObject.id) {
        itemHTML = (
            <li className={`todo-item ${todoObject.completed ? 'task-completed' : 'task-active'} ${colorDiff ? 'lighter' : ''}`}
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
            </li>
        )
    } else {
        itemHTML = (
            <li className={`todo-item ${todoObject.completed ? 'task-completed' : 'task-active'} ${colorDiff ? 'lighter' : ''}`}>
                <textarea 
                    ref={inputRef}
                    onInput={(event) => setEditingValue(event.target.value)}
                    className='task-editing'
                    value={editingValue} 
                    rows={editingValue.split("\n").length + 4}
                    onKeyDown = {(event) => {
                        if (event.key === "Enter" && event.ctrlKey) {
                            submitEdit(todoObject.id, event.target.value)
                            setEditingTodo()
                        } else if (event.key === "Escape") {
                            setEditingTodo()
                        }
                    }}
                    onBlur = {(event) => {
                        submitEdit(todoObject.id, event.target.value)
                        setEditingTodo()
                    }}
                />
            </li>
        )
    }

    useEffect(() => {
        if (editingTodo == todoObject.id) {
            inputRef.current.focus()
        }
    }, [editingTodo, todoObject.id])

    return (
        <>
            {itemHTML}
        </>
    )
}