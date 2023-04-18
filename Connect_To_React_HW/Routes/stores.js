//Router ייבוא הספריה + יצירת ה 
const StoreRouter = require('express').Router();
const fs = require('fs');
const path = require('path');


// Read data from a JSON file
const storesData = fs.readFileSync(path.join(__dirname,'db' ,'stores.json'));
const stores = JSON.parse(storesData);

//יצירת הנתיבים

//הצג כל החניות
StoreRouter.get('/', async (req, res) => {
  res.status(200).json(stores);
});


//הצגת חנות ספציפית על פי מזהה יחודי
StoreRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  const store = stores.find((store) => store.id == id);

  if (!store) {
    res.status(404).json({message: "Store not found"});
  } else {
    res.status(200).json(store);
  }
});


//הצגת מוצר מוסיים על פי חנות 
StoreRouter.get('/:storeId/:productId', async (req, res) => {
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
StoreRouter.post('/add', (req, res) => {
  const { name, city, items } = req.body;
  const storeId = stores.length + 1;
  const newStore = { id: storeId, name, city, items };
  stores.push(newStore);
  fs.writeFileSync(path.join(__dirname,'db' ,'stores.json'), JSON.stringify(stores, null, 2));
  res.status(201).json(newStore);
});




// הוסף פריט לחנות לפי מזהה חנות
StoreRouter.post('/:storeId/item', (req, res) => {
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


module.exports = StoreRouter;