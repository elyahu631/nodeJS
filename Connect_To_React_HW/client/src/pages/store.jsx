import { useState } from "react"

export default function Store(){
  const [store,setStore]=useState([])

  const chgStoreId = (e) => {
     LoadStore(e.target.value);
  }

   const LoadStore = async (id) => {
    try {
      let res = await fetch(`http://localhost:5008/api/stores/${id}`);
      let data = await res.json();
      // console.table(data);
      setStore(data);
    } catch (error) {
      console.error(error);
    }
  }

  const btnShowStore = async () =>{
    console.table(store)
  }

  return (
    <div style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
      <h1>Store</h1>
      enter store id  <input onChange={chgStoreId} type="number"/> <br /><br />
      <button onClick={btnShowStore}>show store</button>
    </div>
  )
}