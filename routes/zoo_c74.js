
var router = require('express').Router()



// //🍉 여기있는 모든 url에 미들웨어 적용하기
// // router.use(ig_all);
// router.use(ig_all);

// function ig_all(req,res,next) {
//   console.log('ig_all')  
// }

// // 특정 url에만 적용함

// router.use('/monkey',ig_all);




// 🥒c74
//🍉 ~~~/zoo/lion 접속됨
router.get('/lion', (req, res응답) => {
  res응답.send('lion home page')
})

// 🍉~~~/zoo/monkey 접속됨
router.get('/monkey', (req, res응답) => {
  res응답.send('About monkey')
})




module.exports = router;