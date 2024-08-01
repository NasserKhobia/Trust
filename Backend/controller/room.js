import Class from "../model/Class.js";
import Room from "../model/Room.js";

export const Add = async(req,res)=>{
    try {
        const {name, classId} = req.body;
        if(name && classId){
            const room = await Room.findOne(name);
            if(!room ){
                const classes = await Class.findById(classId);
                if(classes){
                    const newRoom = new Room({
                        name, classId
                    })
                    if(newRoom){
                        await newRoom.save();
                        res.status(202).json({
                            room : newRoom
                        })
                    }else{
                        console.log('room is not created');
                        res.status(401).json("room is not created")
                    }
                }else{
                    console.log('class is not found');
                    res.status(404).json('class is not found');
                }
            }else{
                console.log('room is exist');
                res.status.json({room:room});
            }
        }else{
            console.log('invaled data');
            res.status(300).json('invaled data')
        }
    } catch (error) {
        console.log('error in controller room Add',error);
        res.state(500).json("interall server error");
    }
}




export const Get = async(req,res)=>{
    try {
        const rooms = await Room.find().populate('classId');
        if(rooms){
            console.log('done');
            res.status(202).json(rooms);
        }else{
            console.log('rooms not found');
            res.status(404).json("rooms not Found")
        }
    } catch (error) {
        console.log('error in controller room Get',error);
        res.state(500).json("interall server error");
    }
}




export const Delete = async(req,res)=>{
    try {
        const id = req.params.id;
        if(id){
            await Room.findByIdAndDelete(id);
            console.log('deleted!');
            res.status(200).json('deleted!')
        }else{
            console.log('params is not defind');
            res.status(404).json('params is not defind')
        }
    } catch (error) {
        console.log('error in controller room Delete',error);
        res.state(500).json("interall server error");
    }
}





export const Update = async(req,res)=>{
    try {
        const id = req.params.id;
        const {name , classId} = req.body;
        if(id){
            if(name && classId){
                const roomUpdated = await Room.findByIdAndUpdate(id,{
                    name,classId
                });
                if(roomUpdated){
                    await roomUpdated.save();
                    res.status(202).json({
                        room : roomUpdated
                    })
                }else{
                    console.log('room is not created');
                    res.status(400).json('room is not created');
                }
            }else{
                console.log('invalid data');
                res.status(400).json('invalid data')
            }
        }else{
            console.log('params is not defind');
            res.status(404).json('params is not defind');
        }
    } catch (error) {
        console.log('error in controller room Update',error);
        res.state(500).json("interall server error");
    }
}