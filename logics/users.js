import { client, ObjectId} from "../db.js";
import jwt from "jsonwebtoken";

export function  addUser(req){
return client.db("pizza")
.collection("users")
.insertOne(req)
}

export function findUser(userEmail){
    return client.db("pizza")
    .collection("users")
    .findOne({email:userEmail})
}

export function generateJwtToken(id){
return jwt.sign({id},process.env.secretkey,{expiresIn:"10d"})
}

export function generateForgetToken(id,password){
    const secret = process.env.secretkey + password
return jwt.sign({id},secret,{expiresIn:"1m"})
}

export function findUserbyId(id){
    return client.db("pizza")
    .collection("users")
    .findOne({_id: new ObjectId(id)})
}

export function updatePassword(id,newpassword){
    return client.db("pizza")
    .collection("users")
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:{password:newpassword}})
    }
    
export function getOptions(){
    return client.db("options")
    .listCollections("crust","sauce","cheese","veggies","meat")
    .find().toArray();
}