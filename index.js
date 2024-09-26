const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const db = require('./Model/db')
const productsRouter = require('./Routes/products-router')
const StockRouter = require('./Routes/Stock-router')
const UserRouter = require('./Routes/User-router')
const orderRouter=require('./Routes/Orders-router')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/product', productsRouter)
app.use('/api/stock', StockRouter)
app.use('/api/user',UserRouter)
app.use('/api/order', orderRouter)
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
