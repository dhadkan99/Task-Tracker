import Header from "./components/Header";
//import Button from "./components/Button";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer} from "react-toastify";

import Tasklist from "./components/Tasklist";

function App() {
 
  // <ToastContainer position="top-right" autoClose={2000}/>
  const[tasks, setTask]=useState([]);
  const[newtask,setNewTask]=useState("");
  const[welcomeMessage,setWelcomeMessage]=useState("");

   useEffect(()=>{
    setWelcomeMessage("Welcome to Task tracker");
    const timer=setTimeout(()=>setWelcomeMessage(""),3000);
    return()=>clearTimeout(timer);

   },[]);
   const addTask  =()=>{
    if(newtask.trim()){
      setTask([
        ...tasks,
        {
          id:Date.now(),
          text:newtask,
          completed:false,
        }
      ])
      setNewTask("");
    toast.success("added");
    }else{
      toast.error("empty");
    }
    
   }
  //  setTask(tasks.filter(task => !(task.id === id && task.completed)));
   const deleteTask = (id) => {
     const task = tasks.find(task => task.id === id);
     if(task && task.completed){
       setTask(tasks.filter(task => task.id !== id));
       toast.success("deleted");
     
     }else {
       toast.error("cannot be deleted!");
     }
   };
   

   const onToggleComplete = (id) => {
     setTask(tasks.map(task => 
       task.id === id ? { ...task, completed: !task.completed } : task
     ));
   };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container flex-grow p-4 mx-auto my-8">
        <h2 className="mb-4 text-xl">Dashboard</h2>
        
        {welcomeMessage && (
          <div className="p-3 mb-4 text-green-800 bg-green-100 rounded">
            {welcomeMessage}
          </div>
        )}

        <div className="flex mb-6">
          <input
          type="text"
          value={newtask}
          onChange={(e) =>setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded-1 focus:outline-none focus:ring-blue-100"
          placeholder="Enter new Task..."/>
          <button 
            type="button" 
            onClick={() => {
              addTask();
              // alert("Added");
            }}
            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Add
          </button>
        </div>
       {/* <div className="flex gap-4 justify-center">
          <Button type="add" onClick={notify} />
          <Button type="delete" onClick={() => alert("Task Deleted")} />  
        </div>
         */}
        <Tasklist
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={onToggleComplete}/>
      </main>
      <Hero/>
      <Footer />
      <ToastContainer/>
      
    </div>
  );
}

export default App;

