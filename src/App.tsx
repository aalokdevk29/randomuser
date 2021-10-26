import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

interface IUser {
  id: number;
  dob: { age: number };
}

function App():JSX.Element {
  const [users,setUsers] = useState<IUser[]>([]);
  const [loading,setLoading] = useState<Boolean>(true);
  const [start,setStart] = useState<Boolean>(true);
  let timeout: number = 0;
  
  useEffect(() => {
    if (start) {
      setLoading(true);
      fetchRandomUsers();
    } else {
      window.clearTimeout(timeout);
    }
    return () => window.clearTimeout(timeout);
  },[loading, start]);

  const fetchRandomUsers = () => {
    timeout = window.setTimeout(async () => {
      const data: any = await axios.get("https://randomuser.me/api/?results=10");
      setUsers(data.data.results);
      setLoading(false);
    },10000);
  }

  const handleStart = () => {
    setStart(!start);
  } 

  const averageAge = users.reduce((acc,cv) => acc + Number(cv.dob.age),0) / users.length;

  return (
    <div className="App">
      <h1>Users Average Age :: {averageAge}</h1>
      <button onClick={handleStart}>{start ? 'Pause' : 'Start'}</button>
    </div>
  );
}

export default App;
