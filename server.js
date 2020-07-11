const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(3000)
app.get('/', (req, res, next) => {
    res.sendFile('index.html')
})