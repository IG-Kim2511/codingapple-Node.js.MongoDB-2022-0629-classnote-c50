
// 🦄🦄c74 

// 🍀require(~) : ~파일, ~라이브러리을 가져와서(import) 쓰겠다는 뜻
// 🍉express 라이브러리.Router
var router = require('express').Router()

// 🍉파일
// var router = require('/shop.js')



//🍀server.js의 app.get과 같은뜻
// 🍉 http://localhost:3000/shop/shirts 접속됨
router.get('/shop/shirts', (req, res응답) => {
  res응답.send('Birds home page')
})

//🍉 ~~~/shop/pants 접속됨
router.get('/shop/pants', (req, res응답) => {
  res응답.send('About birds')
})


//🍀 module.exports = ~~변수명 : ~변수를 export하겠다는 뜻
module.exports = router;