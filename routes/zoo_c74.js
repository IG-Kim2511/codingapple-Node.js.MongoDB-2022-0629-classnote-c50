
var router = require('express').Router()



// //๐ ์ฌ๊ธฐ์๋ ๋ชจ๋  url์ ๋ฏธ๋ค์จ์ด ์ ์ฉํ๊ธฐ
// // router.use(ig_all);
// router.use(ig_all);

// function ig_all(req,res,next) {
//   console.log('ig_all')  
// }

// // ํน์  url์๋ง ์ ์ฉํจ

// router.use('/monkey',ig_all);




// ๐ฅc74
//๐ ~~~/zoo/lion ์ ์๋จ
router.get('/lion', (req, res์๋ต) => {
  res์๋ต.send('lion home page')
})

// ๐~~~/zoo/monkey ์ ์๋จ
router.get('/monkey', (req, res์๋ต) => {
  res์๋ต.send('About monkey')
})




module.exports = router;