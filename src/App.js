import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './component/Header';
function App() {
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState('');
  const [userId,setUserId] = useState('')

  const showTodos = async () => {
    try{
      const {data} = await axios.get("/api/show/todos");
      setList(data.data);
      console.log(data)
    }catch(err){
      console.log(err)
    }
  }
//add  to todo
const addtodo = async (e) => {
  e.preventDefault();
  try{
    const add = await axios.post("/api/create/list",{firstName,lastName});
    if(add.status === 201){
      setFirstName('');
      setLastName('');
      showTodos();
    }
  }catch(error){
    console.log(error)
  }
}
//Delete to todo
const deleteTodo = async (id) => {
 
  try{
    const todoDelete = await axios.delete(`/api/delete/todo/${id}`);
    if(todoDelete.status === 201){
      showTodos();
    }
  }catch(error){
    console.log(error)
  }
}
// Edit to todo
const editTodo = async (id) => {
  setEditMode(true);
  
  try{
    const {data} = await axios.put(`/api/update/todo/${id}`);  
    setFirstName(data.firstName);
    setLastName(data.setLastName);
    setUserId(data.id);
  }catch(error){
    console.log(error)
  }
}

  useEffect(()=>{
    showTodos();
  },[])
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="form"
          style={{ paddingBottom: "50px", paddingTop: "50px" }}
        >
          <form onSubmit={addtodo}>
            <div
              className="form-wrapper"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ flex: 1, marginRight: "10px" }}>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  className="form-control"
                  style={{ width: "250px" }}
                  placeholder="first name"
                  name="firstName"
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  type="text"
                  className="form-control"
                  style={{ width: "250px" }}
                  placeholder="last name"
                  name="lastName"
                />
              </div>

              {editMode ? (
                <button
                  type="submit"
                  style={{ width: "200px", marginLeft: "10px" }}
                  className="btn btn-primary"
                >
                  + Edit
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ width: "200px", marginLeft: "10px" }}
                  className="btn btn-success"
                >
                  + Add
                </button>
              )}
            </div>
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((d) => (
                <tr key={d.id}>
                  <th scopr="row" style={{ color: "black" }}>
                    {d.id}
                  </th>
                  <td style={{ color: "black" }}>{d.firstName}</td>
                  <td style={{ color: "black" }}>{d.lastName}</td>
                  <td>
                    <i
                      onClick={()=>editTodo(d.id)}
                      className="fa-solid fa-pen-to-square"
                      style={{
                        color: "green",
                        cursor: "pointer",
                        marginRight: "25px",
                      }}
                    ></i>
                    <i
                      onClick={() => deleteTodo(d.id)}
                      style={{ color: "red", cursor: "pointer" }}
                      className="fa-solid fa-trash-can"
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
