
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
//🍉 미들웨어 함수 적용하는법 : ig_middleware_shop
router.get('/shop/pants',ig_middleware_shop, (req, res응답) => {
  res응답.send('About birds')
})

function ig_middleware_shop(req,res,next) {
  console.log('ig_middleware_c74_shop')  
}





//🍀 module.exports = ~~변수명 : ~변수를 export하겠다는 뜻
module.exports = router;