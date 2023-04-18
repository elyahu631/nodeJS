import { useState } from "react";

export default function Store() {
  const [product, setProduct] = useState([]);
  const [storeId, SetStoreId] = useState(0);
  const [productId, SetProductId] = useState(0);

  const chgStoreId = (e) => {
     SetStoreId(e.target.value);
  };

  const chgProductId = (e) => {
     SetProductId(e.target.value);

  };

  const LoadProduct = async () => {
    if (storeId != 0 && productId != 0) {
      try {
        let res = await fetch(
          `http://localhost:5008/api/stores/${storeId}/${productId}`
        );
        let data = await res.json();
        console.table(data);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("data missing");
    }
  };

  const btnShowProduct = () => {
    LoadProduct();
    // console.table(product);
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
      enter store id{" "}
      <input onChange={chgStoreId} type="number" value={storeId} /> <br />
      <br />
      enter product id{" "}
      <input onChange={chgProductId} type="number" value={productId} /> <br />
      <br />
      <button onClick={btnShowProduct}>show Product</button>
    </div>
  );
}
