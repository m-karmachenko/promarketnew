const express = require('express')
const path = require('path')
const nodemailer = require("nodemailer")

let html = ''
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
  
  app.post('/', async (req, res) => {
      // console.log(req.body)
      
      html = `<h1>Пользователь ${req.body.name}</h1>
      <p>c номером  ${req.body.phone} запрашивает консультацию</p>`
      await main()
      res.json(req.body)
      

      
  })

app.listen(3000, () => console.log('Server has been started on port 3000...'))



// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "mailerpromarket@gmail.com", // generated ethereal user
      pass: "kndzrouwzdnoyldf", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "mailerpromarket@gmail.com", // sender address
    to: "carmachenko@yandex.ru", // list of receivers
    subject: "ProMarket Clent", // Subject line
    text: "Поступила новая заявка", // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);