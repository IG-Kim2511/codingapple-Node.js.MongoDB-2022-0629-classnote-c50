
var router = require('express').Router()


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