import { useState } from "react";

export default function AddStore() {
  const [storeId, SetStoreId] = useState(0);
  const [prod, SetProd] = useState("");

  const chgStoreId = (e) => {
    SetStoreId(e.target.value);
  };

  const chgProd = (e) => {
    SetProd(e.target.value);
  };

  // const AddProd= async () => {
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

  const btnAddProd= () => {
    AddProd();
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
      <input onChange={chgStoreId} type="number" value={storeId} /> <br />
      <br />
      enter store city{" "}
      <input onChange={chgProd} type="text" value={prod} /> <br />
      <br />
      <button onClick={btnAddProd}>add store</button>
    </div>
  );
}
