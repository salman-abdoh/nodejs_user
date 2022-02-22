

const mongoose=require('mongoose');


const mongo = 'mongodb://127.0.0.1:27017/users';


const Schema=mongoose.Schema;

const user_schema=new Schema({

   
    name:{ type:String,required:true,  unique : true },
  email:{ type:String,required:true,  unique : true },
    picture:{type:String,required:true},
    cv:{type:String,required:true}
});

const user=mongoose.model("user",user_schema);
module.exports=user;