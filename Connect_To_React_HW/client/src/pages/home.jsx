import { useEffect, useState } from "react";

export default function Home(){
  const [stores, SetStores] = useState([]);

  const LoadStores = async () => {
    try {
      let res = await fetch('http://localhost:5008/api/stores');
      let data = await res.json();
      console.table(data);
      SetStores(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    LoadStores();
  }, []);

 
  return (
    <div>
      <h1>home</h1>
    </div>
  )
}