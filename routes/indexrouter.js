const { render } = require('ejs');
const { response, request } = require('express');
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/categoryImages' });
const addCategoryc = require('../controller/category.controller.js');
const router = express.Router('');
const db = require('../database/conection.js');
router.get('/', (req, res) => {
    res.render('home.ejs');
});
router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});
router.post('/signup',(req,res)=>{
    db.collection("Users").insertOne(req.body).then((result)=>{
        res.send('your data sucseful add');
    }).catch((err)=>{
        res.send('something went wrong');
    });
});
router.get('/addCategory', (req, res) => {
    res.render('category.ejs');
});
router.post('/addCategory',upload.single('categoryImage'),addCategoryc.addCategory);
router.get('/categoryList',(request,response)=>{
  db.collection('Categoryfe').find().toArray().then((results)=>{
    console.log(results);
   return response.render('categoryList',{
        categoryList:results
    });
  }).catch((err)=>{
      console.log(err);
  })
});
router.get('/delete-Category/:categoryID',(req,res)=>{
    let cid=req.params.categoryID;
    console.log(cid);
    db.collection('Categoryfe').deleteOne({id:cid*1}).then((result)=>{
        console.log(result);
        console.log("your data is succefull delete");
         return res.redirect('/categoryList');
    }).catch((err)=>{
        console.log("Err on delete");
    });

})
router.get("/editcategory/:cid",(req,res)=>{
    let cid=req.params.cid;
    db.collection('Categoryfe').findOne({id:cid*1})
    .then((result)=>{
        console.log(result)
        res.render('categoryEdit.ejs',{
          categoryItem:result
        });
    }).catch((err)=>{
        console.log(err);
    })
    
});
router.post('/EditCategory',upload.single('categoryImage'),(req,res)=>{
    let cid=req.body.cid;
    let Image=req.body.oldcategoryImage;
    console.log(cid);
    console.log(Image);
    if(req.file){
     Image=req.file.filename;
    }
     db.collection('Categoryfe').updateOne({id:cid*1},{$set:{categoryImage:Image,categoryName:req.body.categoryName}})
     return res.redirect('/categoryList');
});
module.exports = router;