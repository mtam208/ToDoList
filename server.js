const express = require('express');
const app = express();
const path = require('path');
const taskRouter = require('./routers/taskRouter');
const userRouter = require('./routers/userRouter');

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());


app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server started');
});

app.set('view engine', 'ejs')

const tokenValidation = (req, res, next) => {
  try {
      let token = req.cookies.token;
      let payload = jwt.verify(token, 'secret');
      if (payload) {
        res.locals.userID = payload
        next()
      }
  } catch (error) {
      res.redirect('/users/login');
  }
}
app.get('/', (req, res, next)=>{
  res.redirect('/api/tasks')
})

app.use('/api/tasks', tokenValidation, taskRouter);
app.use('/users', userRouter);
