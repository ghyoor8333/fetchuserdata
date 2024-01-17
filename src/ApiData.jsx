import React, { useEffect, useState } from 'react'
import './Apidata.css'

const API= "https://jsonplaceholder.typicode.com/users";

export default function ApiData() {
    const [users, setuser]= useState([])
    const [search,setsearch]=useState("")
    const [searchHistory, setSearchHistory] = useState([]);

    const fetchUsers= async(url)=>{ 
    try{
          const res= await fetch(url)
          const data=await res.json()
          // console.log(data);
        if(data.length>0){
            setuser(data)
        }
        // console.log(data);
    }
    catch(e){
         console.error(e);
    }
}
    useEffect(()=>{
        fetchUsers(API)
    },[])

    const sortData = (key) => {
      const sortedData = [...users].sort((a, b) => {
        // Assuming your user data is an array of objects
        return a[key].localeCompare(b[key]);
      });
    
      setuser(sortedData);
    };

    const handleSearch = () => {
      // Update search history
      setSearchHistory(prevHistory => [...prevHistory, search]);
     
    };

  return (
    <>
    <div className='container'>
    <div className='center'>
    <input className='input' type="text" placeholder='enter the data for search' onChange={(e)=> setsearch(e.target.value)} />
    <button className='btn' onClick={() => sortData('name')}>Sort by Name</button>
    <button className='btn' onClick={handleSearch}>SavePrevSearch</button>

    <div>
      <h2 className='search'>Search History:</h2>
        <ol type='i'>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
    </div>
    <table>
      <thead>
        <tr>
        <th>ID        :</th>
        <th>Name      : </th>
        <th>Email     : </th>
        <th>Adress     : </th>      
        </tr>
      </thead>
      <tbody>
      {
      users.filter((item)=>{
        if(search===""){
          return item
        }else if(item.name.toLowerCase().includes(search.toLowerCase()) ){
          
          return item
        }
      }).map((currUser)=>{
       // console.log(currUser)
            const {id,name,email,address}=currUser
            return(
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{address.city}</td>
                    
                </tr>
            )
      })
    }
      </tbody>
    </table>
    </div>
    </div>
    </>
  )
}
