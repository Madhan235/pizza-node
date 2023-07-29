import { client, ObjectId} from "../db.js";
import jwt from "jsonwebtoken";

export function  addAdmin(req){
return client.db("pizza")
.collection("admin")
.insertOne(req)
}

export function findAdmin(userEmail){
    return client.db("pizza")
    .collection("admin")
    .findOne({email:userEmail})
}

export function generateJwtToken(id){
return jwt.sign({id},process.env.secretkey,{expiresIn:"10d"})
}

export function generateForgetToken(id,password){
    const secret = process.env.secretkey + password
return jwt.sign({id},secret,{expiresIn:"1m"})
}

export function findAdminbyId(id){
    return client.db("pizza")
    .collection("admin")
    .findOne({_id: new ObjectId(id)})
}

export function updateAdminPassword(id,newpassword){
    return client.db("pizza")
    .collection("admin")
    .findOneAndUpdate({_id: new ObjectId(id)},{$set:{password:newpassword}})
    }
    