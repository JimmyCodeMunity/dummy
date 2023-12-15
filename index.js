const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel')
//const User = require('./models/UserModel')
const productRoute = require('./routes/ProductRoute');
const shopRoute = require('./routes/ShopRoutes');
// const userRoute = require('./routes/UserRoute')




require('dotenv').config();


const app = express();

const cors = require('cors');


app.use(cors())


//allow json requests to be sent to the server
app.use(express.json())

//allow url encoded for from input
app.use(express.urlencoded({extended:false}))


if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config({
      path:"./.env"
    })
  }


  const port = process.env.PORT;
const dburl = process.env.DB_URL;

app.listen(port,(req,res) => {
    console.log(`Server running on port ${port}`)
})


// Connect to MongoDB
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
//strict query
mongoose.set('strictQuery', true);



app.use('/api/product', productRoute)
// app.use('/api/user', userRoute)
app.use('/api/shop',shopRoute)

app.get('/',(req,res)=>{
    res.send('Server started')
})

app.get('/productlist',async (req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
        
    } catch (error) {
        console.log('error fetching');
        res.status(500).json({message: error.message});
        
    }
})


