import React from "react";
import "./App.css";

const hostname = "localhost";
const port = 3003;

function App() {
  const [items, setItems] = React.useState("");

  React.useEffect(() => {
    buildTodoList();
  }, []);

  const updateListSubmit = async (event) => {
    await submitNewTodoItem(event).then(() => buildTodoList());
  };

  const updateListDelete = async (event, item) => {
    await deleteTodoItem(event, item).then(() => buildTodoList());
  };

  const submitNewTodoItem = async (event) => {
    event.preventDefault();
    let input = event.target.todoItemInput.value;
    await fetch(`http://${hostname}:${port}/submit`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });
    event.target.reset(); // clear the input field
  };

  const editTodoItem = async (event) => {
    event.preventDefault();
    const itemId = event.target.parentElement.id;
    const newValue = event.target.lastChild.value;
    return await fetch(`http://${hostname}:${port}/edit`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemId, name: newValue }),
    })
      .then((res) => ({ status: res.status, data: res.json() }))
      .then((res) => {
        res.status === 200
          ? alert("Todo Item updated!")
          : alert(
              `Something went wrong with updating the Todo Item!\nStatus: ${res.status}\nError: ${res.data}`
            );
      });
  };

  const deleteTodoItem = async (event, delItem) => {
    event.preventDefault();
    await fetch(`http://${hostname}:${port}/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: delItem.id }),
    });
  };

  const buildTodoList = async () => {
    await fetch(`http://${hostname}:${port}/`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((fetchedItems) => fetchedItems.sort((A, B) => A.id - B.id))
      .then((sortedItems) =>
        sortedItems.map((item) => (
          <li key={`${item.name}${item.id}`} id={item.id}>
            <form onSubmit={(e) => editTodoItem(e)}>
              <button
                type="button"
                name={`delete${item.name}${item.id}`}
                onClick={(e) => updateListDelete(e, item)}
              >
                X
              </button>
              <input type="text" defaultValue={item.name} />
            </form>
          </li>
        ))
      )
      .then((listItems) => setItems(listItems));
  };

  return (
    <div className="App-header">
      <form onSubmit={(e) => updateListSubmit(e)}>
        <input type="text" id="todoItemInput" name="todoItemInput"></input>
      </form>
      <ul>{items}</ul>
    </div>
  );
}

export default App;
