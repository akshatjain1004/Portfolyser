const router = require('express').Router();
const body = require('body-parser');
const multer = require("multer");
var encoder = body.urlencoded();
const introController=require('../controllers/maincontroller');
var path = require('path');


var profile = "hello";
var Storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req , file , cb) => {
      cb(null , file.fieldname+"_"+profile+"_"+path.extname(file.originalname))
    }
  
   })
  
   var upload_company_logo = multer({
     storage:Storage
   }).single('profile_pic');


router.use(body.urlencoded({
    extended: true
  }));


router.get("/",(req,res)=>{
    res.render('home');
});

router.get("/final" , introController.getintroDetails);
router.get("/intro" , introController.addintroForm);
router.post(
    "/",
    upload_company_logo,
    introController.postintroDetails
  );



module.exports = router;