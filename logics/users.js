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
    
export function getCrust(){
return client.db("options")
    .collection("crust")
    .find().toArray();
}

export function getSauce(){
    return client.db("options")
        .collection("sauce")
        .find().toArray();
    }

   export function getCheese(){
return client.db("options")
    .collection("cheese")
    .find().toArray();
}
 
export function getVeggies(){
    return client.db("options")
        .collection("veggies")
        .find().toArray();
    }

    export function getMeat(){
        return client.db("options")
            .collection("meat")
            .find().toArray();
        }

