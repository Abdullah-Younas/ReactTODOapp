import { useEffect,useState } from "react"

function App() {
  const [newitem,setnewitem] = useState("");
  const [todos,setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return [];

    return JSON.parse(localValue);
  });
  function handleSubmit(e){
    e.preventDefault();

    setTodos(currentTodos => {
      return[
        ...currentTodos,
        {id: crypto.randomUUID(), title:newitem,completed: false},
      ]
    })

    setnewitem("");
  }
  function toggleTodo(id,completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return{...todo, completed}
        }

        return todo
      })
    })
  }
  function deleteTodo(id,completed){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])
  console.log(todos);
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label><br />
            <input value={newitem} onChange={e => setnewitem(e.target.value)} type="text" id="item"/>
        </div>
          <button className="subbtn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <input
                  className="checkedbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
