const express = require('express')
const fs = require('fs')
const { resolve } = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 3000

const app = express()

// 处理partial
hbs.registerPartials(resolve(__dirname, '../views/partials'))

hbs.registerHelper('getYear', () => new Date().getFullYear())
hbs.registerHelper('upperCase', (text) => {
  return text.toUpperCase()
})

app.set('view engine', 'hbs')

// 处理静态文件
app.use(express.static(resolve(__dirname, '../public')))

// 中间件
app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now} ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('unable to append log')
    }
  })
  next()
})

app.use((req, res, next) => {
  res.render(resolve(__dirname, '../views/err.hbs'))
})



app.get('/', (req, res) => {
  // res.send('<h1>hello world</h1>')

  //send json
  res.send({
    name: 'hhh',
    age: 'inifity'
  })

})

app.get('/test1', (req, res) => {
  res.render(resolve(__dirname, '../views/test.hbs'), {
    title: 'test'
  })
})

app.listen(port, () => console.log(`server start at ${port}`))
