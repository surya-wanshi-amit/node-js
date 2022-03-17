const express = require('express');
const jwt= require('jsonwebtoken');
const auth = require('../middlewares/middleware.js')
const connection = require('../dbconnection/database.js')

const router = express.Router();

// Login 
router.post('/login',(req,res)=>{
    let email = 'abc@gmail.com'
    let password = '123456789'

    connection.query(
        'SELECT * FROM `user` WHERE `email` = ? AND `password`= ?',
        [email,password],(err, results, fields) =>{

        if(err)
        {
            res.status(400).send("Wrong Credentials");
        }
          const accessToken = jwt.sign({data:results[0].email},'amitp',{expiresIn: '100s'})
          res.status(200).json({"accessToken":accessToken})
      
        }
      );

})


// Adding authorization to all api

 router.use(auth)

// Getting all posts

router.get('/post/get',(req,res)=>{

  connection.query(
    'SELECT * FROM `post` where `softdelete` is null',(err, results, fields) =>{
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send(results)
     }
   );
})

// get post by id

router.get('/post/:id/get',(req,res)=>{

  connection.query(
    'SELECT * FROM `post` where `softdelete` is null and `id`=?',[req.params.id],(err, results, fields) =>{
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send(results)
     }
   );
})

// Creating new post

router.post('/post/create',(req,res)=>{

  let id=4;
  let caption ='hello';
  let usid=1;
  const data=[[id,caption,usid]]
  
  let sql="INSERT INTO post (id,caption,usid) VALUES ?" 
  connection.query(sql,[data],(err, results, fields) =>{
     
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send("Successfully created post")
     }
   );
})

// deleting post 

router.delete('/post/:id/delete',(req,res)=>{

  let id=req.params.id;
  let sql='UPDATE `post` SET `softdelete`=1 where `id`=?' 
  connection.query(sql,[id],(err, results, fields) =>{
     
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send("Deleted post")
     }
   );
})

// Getting all comments of post

router.get('/post/:id/comments',(req,res)=>{

  connection.query(
    'SELECT * FROM `comment` where `softdelete` is null and `pid`=?',[req.params.id],(err, results, fields) =>{
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send(results)
     }
   );
})

// Creating new comments

router.post('/post/:id/comment/create',(req,res)=>{

  let id=1;
  let comment ='nice post';
  let pid=req.params.id;
  const data=[[id,comment,pid]]
  
  let sql="INSERT INTO comment (id,comment,pid) VALUES ?" 
  connection.query(sql,[data],(err, results, fields) =>{
     
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send("Commented Successfully ")
     }
   );
})

// deleting post 

router.delete('/post/:pid/comment/:cid/delete',(req,res)=>{

  let pid=req.params.pid;
  let cid=req.params.cid
  let sql='UPDATE `comment` SET `softdelete`=1 where `pid`=? and `id`=?' 
  connection.query(sql,[pid,cid],(err, results, fields) =>{
     
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send("Comment deleted")
     }
   );
})

// update comment
router.put('/post/:pid/comment/:cid/edit',(req,res)=>{
  let pid=req.params.pid;
  let cid=req.params.cid
  let comment=req.body.comment;
  let sql='UPDATE `comment` SET `comment`=? where `pid`=? and `id`=?' 
  connection.query(sql,[comment,pid,cid],(err, results, fields) =>{
     
       if(err)
       {
          res.status(400).send(err);
       }
       res.status(200).send("Comment updated")
     }
   );
})

module.exports=router;