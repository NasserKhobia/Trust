import Archif from "../model/Archif.js";
import { User } from "../model/User.js";

export const register = async(req,res)=>{
    try {
        const {name ,username ,password , phone, roomId ,gender ,archifId } = req.body;
        const yes = viefiy(name ,username ,password , phone, roomId ,gender ,archifId);
        if(!yes){
            res.status(301).json('invalid data')
        }
        const newUser = new User({
            name ,username ,password , phone, roomId ,gender
        });
        if(newUser){
            console.log('create archif');
            const newArchif = new Archif({
                userId : newUser._id
            })
            if(newArchif){
                const user = await Promise.all(
                    newArchif.save(),
                    newUser.save()
                );
                console.log('error in save ');
                res.status(202).json(
                    user 
                )
            }else{
                console.log('error in create archif');
            }
        }else{
            console.log('error in create archif');
        }
    } catch (error) {
        res.status(500).json("internal error server auth controller")
        console.log('error in controller auth register',error);
    }
}





export const login = async(req,res)=>{
    try {
        const {username ,password} = req.body;
        const user = await User.findOne({username});
        if(user){
            if(password === username.password){
                res.status(200).json({
                    user
                })
            }else{
                console.log("dose not match");
                res.status(400).json("error in email || password");
            }
        }else{
            console.log('not found');
            res.status(404).json('error in email || password');
        }
    } catch (error) {
        res.status(500).json("internal error server auth controller")
        console.log('error in controller auth register',error);
    }
}





export const logout = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json("internal error server auth controller")
        console.log('error in controller auth register',error);
    }
}





async function viefiy (username ,password , archifId){
    const user = await User.findOne({username});
    if(user){
        console.log('username is exit');
        return false
    }
    const archif = await Archif.findById({archifId});
    if(archif){
        console.log('archif is exit');
        return false
    }
    if(password < 8){
        console.log('password is shorted');
        return false
    }
    return true;
}
