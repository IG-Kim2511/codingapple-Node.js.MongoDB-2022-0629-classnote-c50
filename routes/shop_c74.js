
// ๐ฆ๐ฆc74 

// ๐require(~) : ~ํ์ผ, ~๋ผ์ด๋ธ๋ฌ๋ฆฌ์ ๊ฐ์ ธ์์(import) ์ฐ๊ฒ ๋ค๋ ๋ป
// ๐express ๋ผ์ด๋ธ๋ฌ๋ฆฌ.Router
var router = require('express').Router()

// ๐ํ์ผ
// var router = require('/shop.js')



//๐server.js์ app.get๊ณผ ๊ฐ์๋ป
// ๐ http://localhost:3000/shop/shirts ์ ์๋จ
router.get('/shop/shirts', (req, res์๋ต) => {
  res์๋ต.send('Birds home page')
})

//๐ ~~~/shop/pants ์ ์๋จ
//๐ ๋ฏธ๋ค์จ์ด ํจ์ ์ ์ฉํ๋๋ฒ : ig_middleware_shop
router.get('/shop/pants',ig_middleware_shop, (req, res์๋ต) => {
  res์๋ต.send('About birds')
})

function ig_middleware_shop(req,res,next) {
  console.log('ig_middleware_c74_shop')  
}





//๐ module.exports = ~~๋ณ์๋ช : ~๋ณ์๋ฅผ exportํ๊ฒ ๋ค๋ ๋ป
module.exports = router;