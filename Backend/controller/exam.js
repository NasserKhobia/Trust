import Exam from "../model/Exam.js";

export const Add = async (req, res) => {
  try {
    const { subjectId, type, date } = req.body;
    if (subjectId && type && date) {
      const exam = await Exam.findOne(subjectId, type, date);
      if (!exam) {
        const newExam = new Exam({
          subjectId,
          type,
          date,
        });
        if (newExam) {
          console.log("created");
          await newExam.save();
          res.status(202).json(newExam);
        } else {
          console.log("exam is not created ");
          res.status(402).json("exam is not created ");
        }
      } else {
        console.log("exam already exist!");
        res.status(402).json("exam already exist!");
      }
    } else {
      console.log("invaled data!");
      res.status(402).json("invaled data!");
    }
  } catch (error) {
    console.log("error in controller exam Add", error);
    res.status(500).json("internal error message");
  }
};

export const Get = async (req, res) => {
  try {
    const exam = await Exam.find();
    if (exam) {
      console.log("done!");
      res.status(202).json(exam);
    } else {
      console.log("exam is not found");
      res.status(404).json("exam is not found");
    }
  } catch (error) {
    console.log("error in controller exam Get", error);
    res.status(500).json("internal error message");
  }
};

export const Update = async (req, res) => {
  try {
    const id = req.params.id;
    const { subjectId, type, date } = res.body;
    if (id) {
      if (subjectId && type && date) {
        const updateExam = await Exam.findByIdAndUpdate(id, {
          subjectId,
          type,
          date,
        });
        if (updateExam) {
          console.log("updated");
          await updateExam.save();
          res.status(202).jaon(updateExam);
        } else {
          console.log("exam is not created");
          res.status(401).json("exam is not created");
        }
      } else {
        console.log("invaled data !");
        res.status(401).json("invaled data !");
      }
    } else {
      console.log("param is not found");
      res.status(404).json("param is not found");
    }
  } catch (error) {
    console.log("error in controller exam Update", error);
    res.status(500).json("internal error message");
  }
};

export const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Exam.findByIdAndDelete(id);
      console.log("deleted");
      res.status(202).json("deleted");
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller mark Delete", error);
    res.state(500).json("interall server error");
  }
};
