import { useState } from "react";

export default function AddStore() {
  const [storeName, SetStoreName] = useState("");
  const [city, SetCity] = useState("");

  const chgStoreName = (e) => {
    SetStoreName(e.target.value);
  };

  const chgCity = (e) => {
    SetCity(e.target.value);
  };

  // const AddStore= async () => {
  //   if (storeId != 0 && productId != 0) {
  //     try {
  //       let res = await fetch(
  //         `http://localhost:5008/api/stores/add`
  //       );
  //       let data = await res.json();
  //       console.table(data);
  //       setProduct(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     console.log("data missing");
  //   }
  // };

  const btnAddStore= () => {
    AddStore();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Product</h1>
      enter store name{" "}
      <input onChange={chgStoreName} type="text" value={storeName} /> <br />
      <br />
      enter store city{" "}
      <input onChange={chgCity} type="text" value={city} /> <br />
      <br />
      <button onClick={btnAddStore}>add store</button>
    </div>
  );
}
