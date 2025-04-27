import express from 'express'
import 'dotenv/config'
import cors from 'cors' 
import connectToDB from './db/dbConnection.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './models/user.model.mjs'
import {signupValidation,loginValidation} from './middleware/UserAuth.mjs'
import ensureAuthorized from './middleware/tokenVerification.mjs'


connectToDB()

const app = express()
const port = process.env.PORT || 4000

app.use(cors()) // Enable CORS for all routes
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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})