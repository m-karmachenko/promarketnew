const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
  
  app.post('/', (req, res) => {
      console.log(req.body)
      res.json(req.body)
  })

app.listen(3000, () => console.log('Server has been started on port 3000...'))