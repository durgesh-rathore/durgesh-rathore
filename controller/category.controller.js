const db=require('../database/conection');
//let m=0;
exports.addCategory=(req,res)=>{
    // let categoryename=req.body.categoryName;
    // let categoryImage=req.file.fileName;
    console.log(req.file.filename);
    console.log(req.body);
    let category_id=new Date().getTime();
       db.collection("Categoryfe").insertOne({categoryName:req.body.categoryName,categoryImage:req.file.filename,id:category_id})
       .then((result)=>{
         res.redirect('/addCategory');
   }).catch(err=>{
       console.log('Error your program');
   });
}