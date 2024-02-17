var sql=require('mysql');
var http=require('http');
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
const { error } = require('console');
const { url } = require('inspector');
var urlencodedParser=bodyParser.urlencoded({extended: true});
var con=sql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password: '',
    database: 'node'
});

con.connect((err)=>{
    if(err) throw error;
    console.log('connected');
})
// con.query("CREATE DATABASE node",function(err,result){
//     if(err) throw err;
//     console.log("Database Created")
//  })

// con.query(`CREATE TABLE USERS (USER_ID INT(6), USERNAME VARCHAR(30), EMAIL VARCHAR(30))`,(err,result)=>{
//     if(err) throw error;
//     console.log("TABLE CREATED");
// })

// con.query(`CREATE TABLE POSTS (POST_ID INT(6),TITLE VARCHAR(30),CONTENT VARCHAR(50), USER_ID INT(6), CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,(err,result)=>{
//     if(err) throw error;
//     console.log("TABLE CREATED");
// })

// con.query(`CREATE TABLE COMMENTS (COMMENT_ID INT(6), POST_ID INT(6), USER_ID INT(6), COMMENT_TEXT VARCHAR(30)) `,(err,result)=>{
//     if(err) throw error;
//     console.log("TABLE CREATED");
// })
// con.query(`ALTER TABLE POSTS DROP COLUMN RATINGS`,(err)=>{
//     if(err) throw error;
//     console.log("ALTERED");
// })
// con.query(`ALTER TABLE POSTS ADD COLUMN RATINGS INT(5) DEFAULT 0`,(err)=>{
//     if(err) throw error;
//     console.log("ALTERED");
// })

app.get('/values',(req,res)=>{
    var rr="<html>";
    var rr = rr + "<link rel='stylesheet' type='text/css' href='style.css'>";
    var rr=rr+"<body>";
    var rr=rr+"<form method='post' action='send/user'>";
    var rr=rr+"ENTER USER ID "+"<input type='number' name='userid' value=' '><br>";
    var rr=rr+"ENTER USER NAME"+"<input type='text' name='username' value=' '><br>";
    var rr=rr+"ENTER EMAIL"+"<input type='email' name='useremail' value=' '><br>";
    var rr=rr+"<input type='submit' name='t1' value='Submit user details'>";
    var rr=rr+"</form>";
    var rr=rr+"<br>";
    var rr=rr+"<form method='post' action='send/post'>";
    var rr=rr+"ENTER POST ID "+"<input type='number' name='postid' value=' '><br>";
    var rr=rr+"ENTER POST TITLE"+"<input type='text' name='title' value=' '><br>";
    var rr=rr+"ENTER POST CONTENT"+"<input type='text' name='content' value=' '><br>";
    var rr=rr+"ENTER USER ID "+"<input type='number' name='user_id' value=' '><br>";
    var rr=rr+"ENTER RATINGS"+"<input type='number' name='ratings' value=' '><br>";
    var rr=rr+"<input type='submit' name='t2' value='Submit post details'>";
    var rr=rr+"</form>";
    var rr=rr+"<br>";
    var rr=rr+"<form method='post' action='send/comment'>";
    var rr=rr+"ENTER COMMENT ID "+"<input type='number' name='commentid' value=' '><br>";
    var rr=rr+"ENTER POST ID"+"<input type='number' name='post_id' value=' '><br>";
    var rr=rr+"ENTER USER ID "+"<input type='number' name='user_id1' value=' '><br>";
    var rr=rr+"ENTER COMMENT TEXT"+"<input type='text' name='comment' value=' '><br>";
    var rr=rr+"<input type='submit' name='t3' value='Submit comment details'>";
    var rr=rr+"</form>";
    var rr=rr+"<br>";
    var rr=rr+"<form method='get' action='recieve/3post'>";
    var rr=rr+"<input type='submit' name='t4' value='Retrieve latest posts'>";
    var rr=rr+"</form>";
    var rr=rr+"<br>";
    var rr=rr+"<form method='post' action='delete/comment'>";
    var rr=rr+"ENTER COMMENT ID"+"<input type='number' name='COMid' value=' '><br>";
    var rr=rr+"<input type='submit' name='t5' value='DELETE COMMENT'>";
    var rr=rr+"</form>";
    var rr=rr+"<form method='get' action='recieve/positive'>";
    var rr=rr+"<input type='submit' name='t6' value='Retrieve positive comments'>";
    var rr=rr+"</form>";
    var rr=rr+"</body>";
    var rr=rr+"</html>";
    res.send(rr);
})

app.post('/send/user',urlencodedParser,(req,res)=>{
    con.query(`INSERT INTO USERS VALUES (${req.body.userid},'${req.body.username}','${req.body.useremail}')`,(err)=>{
    if(err) throw error;
    res.write("TUPLE INSERTED");
    res.end();
    })
}).listen(8100);

app.post('/send/post',urlencodedParser,(req,res)=>{
    con.query(`INSERT INTO POSTS (POST_ID, TITLE, CONTENT, USER_ID,RATINGS) VALUES (${req.body.postid},'${req.body.title}','${req.body.content}',${req.body.user_id},${req.body.ratings})`,(err)=>{
        if(err) throw error;
        res.write("TUPLE INSERTED");
        res.end();  
    })
})

app.post('/send/comment',urlencodedParser,(req,res)=>{
    con.query(`INSERT INTO COMMENTS VALUES (${req.body.commentid},${req.body.post_id},${req.body.user_id1},'${req.body.comment}')`,(err)=>{
        if(err) throw error;
        res.write("TUPLE INSERTED");
        res.end();  
    })
})

app.get('/recieve/3post',urlencodedParser,(req,res)=>{
    con.query(`SELECT POSTS.POST_ID,POSTS.TITLE,POSTS.CONTENT,POSTS.USER_ID,POSTS.RATINGS,USERS.USERNAME FROM POSTS JOIN USERS ON POSTS.USER_ID=USERS.USER_ID ORDER BY POSTS.CREATED_AT DESC LIMIT 3 `,(err,result)=>{
        if(err) throw error;
        var ha=result.map(item=> `<tr><td>${item.POST_ID}</td><td>${item.TITLE}</td><td>${item.CONTENT}</td><td>${item.USER_ID}</td><td>${item.RATINGS}</td><td>${item.USERNAME}</td></tr>`).join(' ');
        var html=`<table border='1'><tr><th>POST_ID</th><th>TITLE</th><th>CONTENT</th><th>USER_ID</th><th>RATINGS</th><th>USERNAME</th></tr>${ha}</table>`;
        res.send(html);
        res.end();
    })
})

app.post('/delete/comment',urlencodedParser,(req,res)=>{
    con.query(`DELETE FROM COMMENTS WHERE COMMENT_ID=${req.body.COMid} `,(err)=>{
        if(err) throw error;
        res.write("Comment Deleted");
        res.end();
    })
})

app.get('/recieve/positive',urlencodedParser,(req,res)=>{
    con.query(`SELECT COMMENTS.COMMENT_TEXT,USERS.USERNAME FROM COMMENTS JOIN USERS ON COMMENTS.USER_ID=USERS.USER_ID JOIN POSTS ON COMMENTS.POST_ID=POSTS.POST_ID WHERE POSTS.RATINGS>0 `,(err,result)=>{
        if(err) throw err;
        var ha=result.map(item=> `<tr><td>${item.COMMENT_TEXT}</td><td>${item.USERNAME}</td></tr>`).join(' ');
        var html=`<table border='1'><tr><th>COMMENTS_TEXT</th><th>USERNAME</th></tr>${ha}</table>`;
        res.send(html);
       // res.json(result);
        res.end();
    })
})

