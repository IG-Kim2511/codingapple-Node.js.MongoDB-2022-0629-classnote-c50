
/* 🍀 Server.js 상단 코드 */

// c18 express
const express = require('express')
const app = express()

// c24-5) bodyParser
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

// c30) mongoDB
const MongoClient = require('mongodb').MongoClient;

// c32) ejs
app.set('view engine', 'ejs');

// c50)  static 파일 보관위해 public폴더 쓸거라는 뜻
app.use('/public_c50', express.static('public_c50'));

// c52)  method-override
var methodOverride = require('method-override');
const passport = require('passport');
app.use(methodOverride('_method'))

// c64) .env 파일, environment variable, 
require('dotenv').config()

// // 🍀c58-10)
// // const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));


 
// 🦄🦄c terminal 명령어 정리 👉 codingapple-Node.js.MongoDB-2022-0629-classnote폴더...server.js


/* 
  👉 c50으로 이동
  app.get('/', function(req요청, res응답) {               //2)
    res응답.sendFile(__dirname + '/index.html')       //4)     
  })   
*/



// 🦄🦄c30 Database에 자료 저장하기, client.db('작명').collection('작명').insertOne(자료오브젝트, 콜백함수)
console.log('🦄🦄c30')

// uri

// var uri = "mongodb+srv://iikim2522:myhk2gXIqgvm2IO8@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";
var uri = process.env.DB_URL;

// var db
var db;   //c30-4)

MongoClient.connect(uri, function(에러, p_client){ 
  
    if (에러) {
      return console.log(에러);
    }

    console.log('c30 데이터베이스 연결 success');

  // database설정 :  db() : .... 'ig_database' 에 연결
  db = p_client.db('ig_database');

  // .collecton(~) : ....'~' 에 연결, collecton이름 여기에 작명하면, mongoDB에 자동으로 그 collecton 만들어짐
  // .insertOne(~) : .insertOne(저장할 데이터, 그 이후 실행할 콜백함수)  👉 mongoDB에 가면 저장된 데이터 확인됨
  db.collection('c30_ig_collection').insertOne({제목: "first", 날짜:1, 이름:'John2', _id:10}, function (에러, 결과) {
    console.log('c30 insertOne success')    
  });

  // 🦄🦄c32 HTML에 DB데이터 넣는 법 1, EJS 파일 만들기 
     console.log('🦄🦄c32')
     console.log('🦄🦄c38')
    

    //  post()를 통한 insetOne()실행, send(), 요청.body.ig_title
    app.post('/add', function(req요청, res응답){   

      res응답.send('c32. post() 전송완료');

      console.log('req요청.body.ig_title:'+req요청.body.ig_title);
      console.log('req요청.body.ig_data:'+req요청.body.ig_data);

      // 38) 
      // .collection('ig_counter'), findOne
      db.collection('ig_counter').findOne({name: '게시물갯수'}, function(p_err,p_db결과) {

        if (p_err) { return console.log('error')    }

        console.log(`p_db결과.totalPost:`+p_db결과.totalPost)
        console.log(`p_db결과.name:`+p_db결과.name)
        
        
        //  _id:총게시물갯수 +1 
        db.collection('ig_collection').insertOne({ _id:  p_db결과.totalPost ,제목 : req요청.body.ig_title, 날짜 : req요청.body.ig_data}, function(){
          console.log('저장완료 c38-2')          
          
          // 🦄🦄c 선생님 40 게시물마다 id넣기2 - id에 +1하기, updateOne(.), mongodb operator: inc
          console.log('🦄🦄c40')  
   

          // updateOne, $inc
          db.collection('ig_counter').updateOne({name:'게시물갯수'},{$inc :{totalPost:+1}},function(p_err,p_db) { 
            if (p_err) { return console.log('err')  }                  

          })
        })
      })
    });   


    // c30-4) 서버띄우는 코드 여기로 옮기기      
    app.listen(3000, function(){
    console.log('c30 listening on 3000')
    });


    // 🦄32-2. ejs문법  (list탭 확인)
    // 👉views/list.ejs 생성
    
    app.get('/list',function(req,res){      //34-4)

        // // .find().toArray() 
        db.collection('ig_collection').find().toArray(function(p_err, p_db결과){   //34-2)    
          console.log(p_db결과)
      
          // render() , list.ejs , ig_posts : p_db결과
          res.render('list.ejs', { ig_posts : p_db결과 })     //34-4)  36-4)
        })
    });



    // 🦄🦄c42 AJAX로 DELETE 요청하기1, $.ajax(.), app.delete('delete',(.)={})
    // 🦄🦄c44 AJAX로 DELETE 요청하기2, deleteOne(.), data-~~, .dataset.~~, parseInt(.)
    // 🦄🦄c46 AJAX로 DELETE 요청하기3, jQuery기능 .status(200).send()
    console.log('🦄🦄c42,44,46')

    //c44) 🍄req요청.body에 담겨온 id를 가진 오브젝트를 db에서 찾아서, 삭제
    // 👉./views/list.ejs
    app.delete('/delete',function (req요청,res응답) {

      // 😎console.log("c42,44,46"+ req.body) 이렇게 하면 에러남. (이유는 모름)
      console.log(req요청.body)
      console.log(req요청.body._id)

      /*
       "req요청.body.~id"를 number로 바꿈  -> "req요청.body"를 deleteOne()에 사용함. 
        ("req요청.body._id"  가 아니라. "req요청.body") 
      */
      req요청.body._id = parseInt(req요청.body._id);

      // ~.deleteOne()
      db.collection('ig_collection').deleteOne(req요청.body,function (err,obj결과) {
        console.log(err)
        console.log('c44 delete Finished')
        

        // c46-30) 성공코드 200:  res응답.status(200).send({message : "c46, success"});  
        // 👉 list.ejs
        res응답.status(200).send({message : "c46, fail"});
        
        // c46-40) 실패코드 400:  res응답.status(400).send({message : "c46, fail"});        
        // res응답.status(400).send({message : "c46, fail"});
      });      
    });


    // 🦄🦄c48 상세페이지를 만들어보자 :id (URL parameter), req요청.params.id
    // 👉detail_c48.ejs

    // :id
    app.get('/detail/:id',function (req요청,res응답) {
      
      //  req요청.params.id 
      // findOne({~},function(){})
      // parseInt 
      db.collection('ig_collection').findOne({_id: parseInt(req요청.params.id)}, function (err,p_db결과) {

        console.log(p_db결과)
        
        // .render('~c~',{ ~b~ : ~a~ })
        res응답.render('detail_c48.ejs',{ig_data : p_db결과 });        
      })      
    });


    // 🦄🦄c52 글 수정 기능1, edit page, html에서 PUT요청하기, method-override
    // 🦄🦄c54 글 수정 기능2. DB 데이터를 수정해보자. updateOne 비밀input보내기, redirect(~), submit button
    console.log('🦄🦄c52, 54')

    // 👉edit_c52.ejs

    /* 🍀
      한번에 모든 기능 만드려면 혼란스러우니,
      순서를 정하자
      일단 frontend파트 먼저 만들어놓고, 기능개발
    */
    /* 🍄
      10) ~/edit/:id 로 접속하면 :id 게시물 데이터 + 수정할수있는 웹페이지로 감

      20) 수정하고, submit         👉edit_c52.ejs

      30) list페이지에서 수정된 데이터가 반영됨
    */
   /* 
    👉상단코드: method-override
    npm install method-override   
   */

    // 52-10)
    // '/edit/:id'
    app.get('/edit/:id',(req요청,res응답)=>{    
      
      // findOne({_id: req요청.params.id},()=>{})
      db.collection('ig_collection').findOne({_id: parseInt(req요청.params.id)},function (p_err,p_db결과) {
        
        
        console.log(p_db결과)

        // .render('~c~',{ ~b~ : ~a~ }) : ~a~데이터를, ~b~이름으로,  ~c~~로 보냄,      
        res응답.render('edit_c52.ejs', {ig_posts: p_db결과})
      })
    });

    // 52-20-2)
    // 🍀c54 👉edit_c52.ejs, style="display:none; 안보이는 input만들어서, 몰래 id정보를 server.js로 보내기

    // 🍀Operator  (c40 reference)
    // $set:  업데이트 해줌 , (없으면 추가해줌)

    app.put('/edit',function (req요청,res응답) {
      /* 🍄
        form에 담긴 데이터를 활용해서,
        db.collecton 에 업데이트함

        updateOne({업데이트할 게시물 오브젝트}),{업데이트값},function (p_err,p_db결과) {})
      */
     db.collection('ig_collection').updateOne({_id: parseInt(req요청.body.ig_id)},{$set:{ 제목: req요청.body.ig_title , 날짜: req요청.body.ig_data}},function (p_err,p_db결과) {  

      console.log('c54 :'+ req요청.body.ig_id +req요청.body.ig_title)  
      console.log('c54 : updateOne fin')

      // .redirect('/list')
      res응답.redirect('/list')
     })

    });



})

// // 🌊 실습코드 끝------


// 🦄🦄c50 Bootstrap, nav.ejs..리액트처럼 첨부하기. <%- include('~') %>

/* 2)
 👉./public/style.css 만들기

  static files는 public폴더안에 보관하는게 관습
  CSS파일이 여기에 해당됨
  (static files : 데이터에 의해 변하지 않는 파일)
*/


// 4) 👉상단코드) app.use('.public', express.static('pulbic'));
// static 파일 보관위해 public폴더 쓸거라는 뜻


/* 6)
  👉 ./views/nav.html 만들기

  공유할 html 파일 : 
  views폴더
  html형식  (ejs X)
  
  적용은 ~.ejs파일에만 적용가능함
*/
/* 8)
  👉./views/~~~.ejs에 삽입하기

  여기 이자리에 nav_c50.html을 넣을수있음
   <%- include('nav_c50.html') %>
*/

/* 10)
  👉./views/index.ejs 파일변경, 폴더이동.. 
  👉./views/write.ejs 파일변경, 폴더이동.. 
*/

// app.listen(3000, function(){
//     console.log('c30 listening on 3000')
//   });

app.get('/', function(req요청, res응답) {               //2)
  // res응답.sendFile(__dirname + '/index.html')       //4)

  // c50-10)  res응답.render('index.ejs')   
  res응답.render('index.ejs')               
})   

app.get('./public_c50/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.get('/write',(req요청,res응답)=>{       //2, 2-1)
  // res응답.sendFile(__dirname + '/write.html')       //2-2)

  // c50-10)  res응답.render('index.ejs')   
  res응답.render('write.ejs')
});

app.get('/detail',(req요청,res응답)=>{    

  res응답.render('detail.ejs')
});





// // 🦄🦄c56 (회원 로그인0) 세션, JWT, OAuth 등 회원인증 방법 이해하기
// // 🦄🦄c58 (회원 로그인1) app.use(~), passport, passport-local, express-session, passport.authenticate(~),passport.use(new LocalStorategy(~))

// // 🦄🦄c60 (회원 로그인2) 아이디 비번을 DB와 비교하고 세션 만들어주기, passport.serializeUser(~)
// // 🦄🦄c62 (회원 로그인3) 로그인 유저만 접속할 수 있는 페이지 만들기
// console.log('🦄🦄c56,58,60,62')

// // 👉login_c58.ejs

// // 🍀c58-10)
// // const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));



// // 🦄c58
//   app.get('/login',function (req요청,res응답) {
//     res응답.render('login_c58.ejs')
    
//   });

//   /*🍀-20)
//     passport.authenticate('local') : (인증해주세요)함수 ,  
  
//     인증 실패시 :  app.get('/fail',~~)로 연결 (failureRedirect : '/fail')

//     인증 성공시 : res응답.redirect('/') 
//   */
//   app.post('/login',passport.authenticate('local',{
//     failureRedirect : '/fail'
//   }),function (req요청,res응답) {

//     // redirect
//     res응답.redirect('/')
//   });

//   app.get('/fail',function () {
//     res응답.render('fail_c58.ejs')    
//   })
       
//   // 🍀c60-30) passport.authenticate('local',~)...로그인 성공시, 다음코드 실행됨
//     passport.use(new LocalStrategy({
//       usernameField: 'ig_login_id',                 // 👉login_c58.ejs
//       passwordField: 'ig_login_password',            // 👉login_c58.ejs
//       session: true,                                // login 후 session을 저장할것인지?
//       passReqToCallback: false,
//     }, function (req, 입력한아이디, 입력한비번, done) {

//       console.log(입력한아이디, 입력한비번);

//       /*-40)
//         error처리
//         DB에 ID가 없을때
//         DB에 ID가 있을때
//         DB에 ID가 있으면, input password == DB password 비교함

//         -50)
//         done: 3개의 argument를 가짐
//         done(서버에러, 성공시 사용자 db데이터, 에러 메시지)

//         -60)        
//         입력한 비밀번호를 암호화한 후 ,DB의 비밀번호와 비교해야함 (나중에 알아서 하세요)
//       */
//       db.collection('ig_login').findOne({ id: 입력한아이디 }, function (에러, user결과) {

//         if (에러) return done(에러)

//         if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })

//         if (입력한비번 == user결과.ig_password) {

//           return done(null, user결과)
//         } else {

//           return done(null, false, { message: '비번틀렸어요' })
//         }
//       })
//     }));


//     // -70)
//     // login 성공 때, id를 이용해서 session을 저장
//     passport.serializeUser(function (user,done) {
//       done(null, user.id)
      
//     });

//     // login 성공 때, 위의 session데이터를 가진사람을 db에서 찾아주세요
//     passport.deserializeUser(function (아이디,done) {
      
//       done(null, {})
      
//     });


// // MongoClient.connect(uri, function(에러, p_client){ 
  
// //   if (에러) {
// //     return console.log(에러);
// //   }

// //   console.log('c30 데이터베이스 연결 success');

// //   // database설정 :  db() : .... 'ig_database' 에 연결
// //   db = p_client.db('ig_database');

// // });


// 🦄🦄c64 .env 파일, environment variable, 가변적인 변수 데이터들 관리하기 
console.log('🦄🦄c64 ')


/* 
  🍀 npm install dotenv

  🍀 👉상단코드 : require('dotenv').config()
  
  🍀 server.js와 같은 폴더에 '.env'파일 만듬
   👉.env  
*/