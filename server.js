const express = require('express')
const app = express()
const path = require('path')
const router = require('./router')

app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(3000,()=>{
    console.log('Server started');
})

app.get('/', (req, res, next) => {
    indexHtml = path.join(__dirname, 'index.html')
    res.sendFile(indexHtml)
})
app.use('/api/tasks', router)