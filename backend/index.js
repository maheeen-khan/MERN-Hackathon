import express from 'express'
import 'dotenv/config'
import cors from 'cors' 
import connectToDB from './db/dbConnection.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './models/user.model.mjs'
import {signupValidation,loginValidation} from './middleware/UserAuth.mjs'
import ensureAuthorized from './middleware/tokenVerification.mjs'
import Tasks from './models/task.model.mjs'

connectToDB()

const app = express()
const port = process.env.PORT || 4000

app.use(cors({ allowedHeaders: ['Content-Type', 'Authorization'],origin:'*'})) 
app.use(express.json()) // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', signupValidation, async (req, res) => {

  try {

      const userData = req.body

      const ifExist = await User.findOne({ username: userData.username })

      if (ifExist) {
          return res.status(400).send({ message: "User already exists" })
      }
  

      const newUser = await User.create(userData)
      if (!newUser) {
          return res.status(400).send({ message: "User not registered" })
      }
      newUser.password = await bcrypt.hash(newUser.password, 10)

      await newUser.save()
      res.send(newUser)

      console.log("User registered ", newUser)

  } catch (error) {
      res.status(400).send({ error: error, status: 400 })
  }
})


app.post('/login', loginValidation, async (req, res) => {
  const loginUserData = req.body
  const loginUser = await User.findOne({ username: loginUserData.username })

  if (!loginUser) {
      return res.status(401).send({ message: "Invalid username or password" })
  }

  const isPasswordValid = await bcrypt.compare(loginUserData.password, loginUser.password)

  if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" })
  }

  const jwtToken = jwt.sign(
      { id: loginUser._id },
      process.env.JWT_TOKEN,
      { expiresIn: '1h' }
  )

  
  // res.send(loginUser)
  console.log("User logged in ", loginUser)
  res.status(200).json( {jwtToken , loginUser})
  
})

// Add task
app.post('/api/addTask', ensureAuthorized, async (req, res) => {
  const data = await req.body
  const task = await Tasks.create(data)
  res.send(task)
  console.log(task)
})

// Read
app.get('/api/getTasks', ensureAuthorized, async (req, res) => {
  try {
      const task = await Tasks.find()
      res.send(task)
  } catch (error) {
      res.status(400).send({ error: error, status: 400 })
  }
})

app.get('/api/getTask/:id', ensureAuthorized, async (req, res) => {
  try {
      const task = await Tasks.findById(req.params.id)
      res.send(task)
  } catch (error) {
      res.status(400).send({ error: error, status: 400 })
  }
})

app.patch('/api/updateTask/:id', ensureAuthorized, async (req, res) => {
  const updateData = await req.body
  const updateTask = await Tasks.findByIdAndUpdate(req.params.id, updateData, { new: true })
  res.send(updateTask)
  console.log("Task updated ", updateTask)
})

app.delete('/api/deleteTask/:id', ensureAuthorized, async (req, res) => {
  const task = await Tasks.findByIdAndDelete(req.params.id)
  res.send(task)
  console.log("Task deleted ", task)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})