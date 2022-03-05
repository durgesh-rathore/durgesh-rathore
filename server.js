const express=require('express');
const app=express();
const path=require('path');
const session=require('express-session');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'ramshreeram'
}));
const indexrouter=require('./routes/indexrouter.js')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(indexrouter);
app.listen(3200,()=>{
    console.log("your server is running");
});