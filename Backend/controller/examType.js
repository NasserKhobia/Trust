import ExamType from "../model/ExamType";

export const Add = async (req, res) => {
  try {
    const { name, min, max } = req.body;
    if (name && min && max) {
      const type = await ExamType.findOne({ name: name });
      if (!type) {
        const newExamType = new ExamType({
          name,
          max,
          min,
        });
        if (newExamType) {
          console.log("ccreated!");
          await newExamType.save();
          res.status(202).json({
            examtype: newExamType,
          });
        }
      } else {
        console.log("examType already is exist...!");
        res.status(401).json("examType already is exist...!");
      }
    } else {
      console.log("invaled data...!");
      res.status(401).json("invaled data...!");
    }
  } catch (error) {
    console.log("error in controller examType add", error);
    res.state(500).json("interall server error");
  }
};

export const Update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, max, min } = req.body;
    if (id) {
      if (name && max && min) {
        const examTypeUpdated = await ExamType.findByIdAndUpdate(id, {
          name,
          max,
          min,
        });
        if (examTypeUpdated) {
          console.log("updated!");
          await examTypeUpdated.save();
          res.status(202).json({
            examtype: examTypeUpdated,
          });
        }
      } else {
        console.log("invaled data ..!");
        res.state(401).json("invaled data ..!");
      }
    } else {
      console.log("params is not found");
      res.state(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller examType update", error);
    res.state(500).json("interall server error");
  }
};

export const Delete = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        await ExamType.findByIdAndDelete(id);
        console.log("deleted");
        res.status(202).json("deleted");
      } else {
        console.log("params is not found");
        res.status(404).json("params is not found");
      }
    } catch (error) {
      console.log("error in controller examType Delete", error);
      res.state(500).json("interall server error");
    }
  };

export const Get = async(req,res)=>{
    try {
        const examTypes = await ExamType.find();
        if(examTypes){
            console.log('done');
            res.status(202).json(
                examTypes
            );
        }else{
            console.log("not found");
            res.state(404).json("not found");
        }
    } catch (error) {
        console.log("error in controller examType get", error);
        res.state(500).json("interall server error");
    }
}