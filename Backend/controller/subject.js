import Room from "../model/Room";
import Subject from "../model/subject";

export const Add = async(req,res)=>{
    try {
        const {name ,roomId} = req.body;
        if(name && roomId){
            const subject = await Subject.findOne({name:name});
            if(!subject){
                const room = await Room.findById(roomId);
                if(room){
                    const newSubject = new Subject({
                        name,
                        roomId
                    })
                    if(newSubject){
                        await newSubject.save();
                        res.status(202).json({
                            subject : newSubject
                        });
                    }else{
                        console.log('subject is not created');
                        res.status(401).json("subject is not created")
                    }
                }else{
                    console.log('room is not found');
                    res.status(404).json('room is not found');
                }
            }else{
                console.log('subject is exist');
                res.status.json({subject:subject});
            }
        }else{
            console.log('invaled data');
            res.status(300).json('invaled data')
        }
    } catch (error) {
        console.log('error in controller subject Add',error);
        res.state(500).json("interall server error");
    }
}




export const Get = async(req,res)=>{
    try {
        const subjects = await Subject.find();
        if(subjects){
            console.log('done');
            res.status(202).json({subjects:subjects});
        }else{
            console.log('subjects not found');
            res.status(404).json("subjects not Found")
        }
    } catch (error) {
        console.log('error in controller subject Add',error);
        res.state(500).json("interall server error");
    }
}




export const Update = async(req,res)=>{
    try {
        const id = req.params.id;
        const {name , roomId} = req.body;
        if(id){
            if(name && roomId){
                const subjectUpdated = await Subject.findByIdAndUpdate(id,{
                    name,roomId
                });
                if(subjectUpdated){
                    await subjectUpdated.save();
                    res.status.json({
                        subject : subjectUpdated
                    });
                }else{
                    console.log('subject is not created');
                    res.status(400).json('subject is not created');
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
        console.log('error in controller subject Add',error);
        res.status(500).json("interall server error");
    }
}




export const Delete = async(req,res)=>{
    try {
        const id = req.params.id;
        if(id){
            await Subject.findByIdAndDelete(id);
            console.log('deleted!');
            res.status(200).json('deleted!')
        }else{
            console.log('params is not defind');
            res.status(404).json('params is not defind')
        }
    } catch (error) {
        console.log('error in controller subject Add',error);
        res.status(500).json("interall server error");
    }
}