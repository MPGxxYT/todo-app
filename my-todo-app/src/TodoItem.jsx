
import { useRef, useEffect } from 'react';

export default function TodoItem(
    {todoObject, handleCompletion, handleDelete, editingTodo, 
    setEditingTodo, submitEdit, editingValue, setEditingValue, colorDiff}) {

    const inputRef = useRef(null);
    var itemHTML;
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
            <li className="todo-item task-active" >
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