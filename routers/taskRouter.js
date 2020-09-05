const express = require('express')
const router = express.Router()
const path = require('path')

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const TaskModel = require('../models/taskDB')

router.get('/', (req, res, next) => {
    res.render('index');
});


router.get('/dashboard', (req, res, next) => {
    TaskModel.find({
        user: res.locals.userID
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json('Server error GET task')
    })
})



router.get('/:id', (req, res, next) => {
    TaskModel.findById(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json('Server error GET task')
    })
})

router.post('/', (req, res, next) => {
    TaskModel.create({
        taskName: req.body.taskName,
        deadLine: new Date(req.body.deadLine),
        user: res.locals.userID
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json('Server error POST task')
    })
})

router.put('/:id', (req, res, next) => {
    var newData = {}
    if (req.body.taskName) newData.taskName = req.body.taskName
    if (req.body.deadLine) newData.deadLine = req.body.deadLine
    TaskModel.updateOne({
        _id: req.params.id
    }, newData)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json('Server error PUT task');
    })
})

router.delete('/:id', (req, res, next) => {
    TaskModel.deleteOne({
        _id: req.params.id
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json('Server error DELETE task')
    })
})

module.exports = router