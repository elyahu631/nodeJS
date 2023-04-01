//ייבוא ספריות
const express = require('express');
const path = require('path');
const fs = require('fs');


//הגדרת הפורט
const PORT = process.env.PORT || 8000;


//יצירת השרת 
const server = express();
server.use(express.json());


// Read data from a JSON file
const storesData = fs.readFileSync(path.join(__dirname,'db' ,'stores.json'));
const stores = JSON.parse(storesData);

//routes יצירה של 
//הצג כל החניות
server.get('/api/store', async (req, res) => {
  res.status(200).json(stores);
});


//הצגת חנות ספציפית על פי מזהה יחודי
server.get('/api/store/:id', (req, res) => {
  const {id} = req.params;
  const store = stores.find((store) => store.id == id);

  if (!store) {
    res.status(404).json({message: "Store not found"});
  } else {
    res.status(200).json(store);
  }
});


//הצגת מוצר מוסיים על פי חנות 
server.get('/api/store/:storeId/:productId', async (req, res) => {
  const storeId = parseInt(req.params.storeId);
  const productId = parseInt(req.params.productId);

  // מצא את החנות עם תעודת הזהות הנתונה
  const store = stores.find(store => store.id === storeId);

  // אם החנות לא נמצאה, החזר שגיאת 404
  if (!store) {
    return res.status(404).json({ message: `Store with ID ${storeId} not found` });
  }

  // מצא את המוצר עם המזהה הנתון בחנות
  const product = store.items.find(item => item.id === productId);

  // אם המוצר לא נמצא, החזר שגיאת 404
  if (!product) {
    return res.status(404).json({ message: `Product with ID ${productId} not found in store ${store.name}` });
  }

  res.status(200).json(product);
});



// הוספת חנות חדשה
server.post('/api/store/add', (req, res) => {
  const { name, city, items } = req.body;
  const storeId = stores.length + 1;
  const newStore = { id: storeId, name, city, items };
  stores.push(newStore);
  fs.writeFileSync(path.join(__dirname,'db' ,'stores.json'), JSON.stringify(stores, null, 2));
  res.status(201).json(newStore);
});




// הוסף פריט לחנות לפי מזהה חנות
server.post('/api/store/:storeId/item', (req, res) => {
  const storeId = parseInt(req.params.storeId);
  const { name, regular_price, sale_price } = req.body;

  // מצא את החנות עם תעודת הזהות הנתונה
  const storeIndex = stores.findIndex(store => store.id === storeId);

  if (storeIndex === -1) {
    // אם החנות לא נמצאה, שלח תגובת 404
    res.status(404).send(`Store with ID ${storeId} not found.`);
  } else {
    // אם נמצא חנות, הוסף פריט למערך הפריטים של החנות
    const newItem = {
      id: stores[storeIndex].items.length + 1,
      name,
      regular_price,
      sale_price
    };
    stores[storeIndex].items.push(newItem);
    res.status(201).json(newItem);
  }
});



//הפעלת השרת
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});