const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/ProductModel');
const User = require('./models/UserModel');
const productRoute = require('./routes/ProductRoute');
const userRoute = require('./routes/UserRoute');
const shopRoute = require('./routes/ShopRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // You can use express.json() instead of body-parser for JSON parsing
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Collo:Collo77@cluster0.bo6bwv7.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

// Call the connectToMongoDB function to establish the MongoDB connection
connectToMongoDB();

// Routes
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/shop', shopRoute);

app.get('/', (req, res) => {
  res.send('Opasso server initiated');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
