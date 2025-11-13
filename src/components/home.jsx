import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import '../App.css'
import { Link } from "react-router-dom";
import Login from "../pages/login";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from "../config";

function Home() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [checkedArr, setCheckedArr] = useState([]);

  useEffect(() => {
    let username = localStorage.getItem('username')
    axios.post(`${API_BASE_URL}/todos`, { username })
      .then((res) => {
        let data = res.data.todos
        let completed = data.filter((todo) => todo.done === true)
        console.log(completed);
        setCheckedArr(completed)
        setTodos(data)
      })
  }, [])



  const handleAdd = () => {
    const data = [...todos, { id: uuidv4(), todo: todo, done: false }]
    if (todo.length >= 3) {
      let check = todos.find((todos) => todos.todo === todo)
          if (check){
            toast.success('Todo Allready created', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setTodo('')
          return;
        }
      setTodos(data)
      setTodo('')
      let username = localStorage.getItem('username')
      axios.post(`${API_BASE_URL}/add`, { todos: data, username })
        .then((res) => {
          let todos = res.data.todos
          setTodos(todos)
          toast.success(<div className="capitalize">{res.data.message}
          </div>, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        })
        .catch(console.error);
    }
   
  }

  const handleEdit = (id) => {
    let edit = todos.filter(item => item.id === id)
    const newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
    setTodo(edit[0].todo)
    let checkId = checkedArr.filter(item => item.id !== id)
    setCheckedArr(checkId)
  }

  const handleDelete = (id) => {
    let username = localStorage.getItem('username')
    const newTodos = todos.filter((item) => item.id !== id)
    let checkId = checkedArr.filter(item => item.id !== id)
    axios.post(`${API_BASE_URL}/delete`, { checkId, newTodos, username })
    .then((res)=>{
      toast(<div className="flex gap-4 capitalize"><img className="invert" height={14} width={18} src="delete.gif" alt="" />{res.data.message}
          </div>, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
    })
    setCheckedArr(checkId)
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    const value = e.type === 'radio' ? e.target.checked : e.target.value;
    setTodo(value)
  }

  const handleChecked = (id) => {
    let username = localStorage.getItem('username')
    let checked = todos.filter(item => item.id === id)
    checked[0].done = true
    if (!checkedArr.includes(id)) {
      setCheckedArr([...checkedArr, id]);
    }
    let newtodos = todos.map(prevTodos => prevTodos, [...checked])
    setTodos(newtodos);
    axios.post(`${API_BASE_URL}/checked`, { username, todos: newtodos })
    .then((res)=>{
      toast.success(<div className="capitalize">{res.data.message}
          </div>, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
    })
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <nav className="flex h-12 px-2 w-full justify-between items-center bg-red-400 ">
        <div className="text-2xl font-light">
          TodoSaver
        </div>
        <div className="text-center">
          <Link to='/'>
            <button className="border text-blue-100  border-gray-400 h-fit p-1 bg-amber-700 rounded-xl hover:text-[17px]">LogOut</button>
          </Link>
        </div>
      </nav>
      <div className="app h-[calc(100dvh-48px)] bg-black">
        <div className='w-[100vw] flex justify-center p-5'>
          <div className="w-[300px] flex justify-evenly items-center border-2 border-gray-400 bg-amber-950 text-amber-50 p-4 rounded-2xl">
            <div className="heading"><h1 className='font-bold text-xl'>Todo Done</h1> <span>keep it up</span>
            </div>
            <div className=' bg-amber-600 text-black p-4 rounded-4xl font-bold'>
              {checkedArr.length}/{todos.length}
            </div>
          </div>
        </div>
        <div className="pb-8 search flex gap-2.5 justify-center text-amber-50">
          <input onChange={handleChange} onKeyDown={(event)=>{
                                        if (event.key === 'Enter') {
                                            handleAdd();
                                        }
                                    }} value={todo} className='bg-gray-700 rounded-xl pl-4' type="text" />
          <div onClick={handleAdd} className='flex justify-center items-center bg-amber-600 rounded-2xl w-7.5 h-7.5 text-black font-bold text-xl cursor-pointer'>+</div>
        </div>
        <div className="w-[100vw] flex justify-center">
          <div className="h-[60vh] w-[80vw] border-2 border-amber-50 overflow-y-auto p-5">
            {todos.length === 0 && <div className="flex justify-center text-red-200"> No Todos to Display</div>}
            {todos.map((item) => (
              <div className="flex justify-center" key={item.id}>
                <div className="w-[300px] flex gap-4 justify-between items-center border-2 border-amber-400 m-1.5 rounded-[10px] bg-gray-900 p-2">
                  <div className="flex gap-2">
                    <input onClick={() => handleChecked(item.id)} type="radio" checked={item.done} id="" />
                    <div className={`w-[200px] overflow-x-auto text-amber-500 ${item.done ? 'line-through decoration-white' : ''}`}>{item.todo}</div>
                  </div>
                  <div className="flex gap-2.5">
                    <div onClick={() => handleEdit(item.id)} className="text-amber-100"><FaRegEdit /></div>
                    <div onClick={(e) => handleDelete(item.id, e)} className="text-amber-100"><AiOutlineDelete /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
