import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';


const WithoutLogin = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [done, setDone] = useState([])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    const done = JSON.parse(localStorage.getItem('done'))
    if (!todos || !done) return
    setTodos(todos)
    setDone(done)
  }, [])

  useEffect(() => {
    if (!todos || todos.length == 0) return
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('done', JSON.stringify(done))
  }, [todos, done]);

  const saveTols = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('done', JSON.stringify(done))
  }

  const handleAdd = () => {
    if (todo.length < 3) return toast.warning('Todo must be at least 3 characters long', {
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
    let check = todos.find((todos) => todos.todo === todo)
    if (check === undefined){
      toast.success('Todo Added Successfuly', {
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
  }
    if (check) {
      toast.error('Todo Allready Exists', {
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
    const data = [...todos, { id: uuidv4(), todo: todo, done: false }]
    setTodos(data)
    setTodo('')
    saveTols()
  }

  const handleChange = (e) => {
    const value = e.value;
    setTodo(value);
  }

  const handleCheck = (id) => {
    let check = todos.find((todo) => todo.id === id)
    check.done = true
    setDone([...done, check])
    saveTols()
  }

  const handleEdit = (id) => {
    let del = todos.filter((todos) => todos.id !== id)
    let set = todos.find((todos) => todos.id === id)
    setTodo(set.todo)
    setTodos(del)
    toast.success('Todo Deleted Successfuly', {
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
  }

  const handleDelete = (id) => {
    let del = todos.filter((todos) => todos.id !== id)
    setTodos(del)
    toast.success('Todo Deleted Successfuly', {
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
    saveTols()
  }

  return (
    <div className='h-screen bg-[rgba(84,85,87,0.5)]'>
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
      <nav className="flex h-12 px-2 w-full justify-between items-center bg-[rgba(0,0,0,0.5)] ">
        <div className="text-2xl font-light text-amber-50">
          TodoSaver
        </div>
        <div className="text-center">
          <Link to='/'>
            <button className="border text-blue-100  border-gray-400 h-fit p-1 bg-[rgba(98,83,83,0.8)] rounded-xl hover:text-[17px]">Login</button>
          </Link>
        </div>
      </nav>
      <div className='w-[100vw] text-center flex justify-center mt-6'>
        <div className='h-fit border-2 w-[60vw] py-2 flex  justify-around items-center rounded-2xl bg-[rgba(98,83,83,0.8)] border-amber-400'>
          <div className='text-amber-200'>
            <span className='text-xl font-extrabold text-amber-50'>Todo Done</span><br />
            Keep It Up
          </div>
          <div className='border w-[80px] h-[80px] flex justify-center items-center rounded-[50%] border-amber-50'>
            <span className='text-green-500'>{!done ? 0 : done.length}</span>
            <span className='font-extrabold'>/</span>
            <span className='text-red-500'>{!todos ? 0 : todos.length}</span>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-3'>
        <div className='bg-emerald-100 w-[300px] p-3 flex justify-between rounded'>
          <input onChange={(e) => handleChange(e.target)} className='outline-none border rounded pl-2' value={todo} type="text" required />
          <button type='submit' onClick={handleAdd} className='border px-2 rounded bg-amber-500 text-amber-100 border-red-700'>Add</button>
        </div>
      </div>
      <div className='mt-6 flex justify-center'>
        <div className='w-[90vw] h-[calc(100vh-270px)] border border-amber-200 bg-[rgba(0,0,0,0.4)] flex flex-col items-center py-4 overflow-y-auto'>
          {!todos || todos.length === 0 ? (<div className='text-amber-100'>Todos Are Empty</div>) :
            (todos.map((todo) => (
              <div className='border w-[85%] m-1 flex justify-between  p-2 rounded-xl bg-amber-100' key={todo.id}>
                <div className='w-[5%] flex justify-center items-center'>
                  <input type="radio" onChange={() => { handleCheck(todo.id) }} checked={todo.done} />
                </div>
                <div className={`w-[70%] md:w-[85%] sm:w-[75%] flex items-center overflow-x-auto ${todo.done ? 'line-through' : ''}`}>
                  {todo.todo}
                </div>
                <div className='flex justify-center items-center gap-2 sm:gap-5 sm:justify-end w-fit'>
                  <div>
                    <FaRegEdit onClick={() => { handleEdit(todo.id) }} />
                  </div>
                  <div>
                    <AiOutlineDelete onClick={() => { handleDelete(todo.id) }} />
                  </div>
                </div>
              </div>
            )))
          }
        </div>
      </div>
    </div>
  )
}

export default WithoutLogin
