import Exam from "../model/Exam.js";
import Mark from "../model/Mark.js";
import Subject from "../model/subject.js";
import { User } from "../model/User.js";

export const Add = async (req, res) => {
  try {
    const { examId, userId } = req.body;
    if (examId && userId) {
      const mark = await Mark.findOne({
        examId: examId,
        userId: userId,
      });
      if (!mark) {
        const exam = await Exam.findById(examId);
        const user = await User.findById(userId);
        if (exam && user) {
          const newMark = new Mark({
            examId,
            userId,
          });
          if (newMark) {
            await newMark.save();
            res.status(202).json({
              mark: newMark,
            });
          } else {
            console.log("mark is not created");
            res.status(401).json("mark is not created");
          }
        } else {
          console.log("exam or user is not found");
          res.status(404).json("exam or user is not found");
        }
      } else {
        console.log("mark is exist");
        res.status.json({ mark: mark });
      }
    } else {
      console.log("invaled data");
      res.status(300).json("invaled data");
    }
  } catch (error) {
    console.log("error in controller mark Add", error);
    res.state(500).json("interall server error");
  }
};

export const GetByExam = async (req, res) => {
  try {
    const examId = req.params.examId;
    if (examId) {
      const marks = await Mark.find({ examId: examId }).populate("userId");
      if (marks) {
        console.log("done!");
        res.status(202).json({ marks });
      } else {
        console.log("not found");
        res.status(404).json("dose not found any mark to this subject");
      }
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller mark Get", error);
    res.state(500).json("interall server error");
  }
};

export const GetByStudentAndExam = async (req, res) => {
  try {
    const exam = req.params.exam;
    const student = req.params.student;
    if (exam && student) {
      const student = await User.findById(student);
      const exam = await Exam.findById(exam);
      if (student && exam) {
        const last = req.params.last;
        if (last) {
          const mark = await Mark.find(
            { examId: exam._id },
            { userId: student._id }
          )
            .populate("examId", "userId")
            .sort({ created_at: -1 })
            .exec(function (err, post) {
              if (err) {
                console.error(err);
                return;
              }
              console.log(post);
              return post;
            });
          if (mark) {
            res.status(202).json({
              lastMark: mark,
            });
          } else {
            console.log("not found last mark");
            res.status(404).json("not found last mark");
          }
        } else {
          const marks = await Mark.find(
            { examId: exam._id },
            { userId: student._id }
          ).populate("examId", "userId");
          if (marks) {
            console.log("done!");
            res.status(202).json({
              marks,
            });
          } else {
            console.log("not found marks");
            res.status(404).json("not found marks");
          }
        }
      } else {
        console.log("you dont have that student Or exam");
        res.status(404).json("you dont have that student Or exam");
      }
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller mark GetByStudentAndExam", error);
    res.state(500).json("interall server error");
  }
};

export const GetByStudent = async (req, res) => {
  try {
    const studentId = req.params.subjectId;
    if (studentId) {
      const marks = await Mark.find({ userId: studentId }).populate(
        "examId",
        "userId"
      );
      if (marks) {
        res.status(202).json({
          marks,
        });
      } else {
        console.log("marks is not found");
        res.status(401).json("marks is not found");
      }
    } else {
      console.log("params is not found");
      res.status(401).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller mark GetByStudent", error);
    res.state(500).json("interall server error");
  }
};

export const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Mark.findByIdAndDelete(id);
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

export const Update = async (req, res) => {
  try {
    const { userId, examId } = req.body;
    const id = req.params.id;
    if (userId && examId) {
      if (id) {
        const markUpdated = await Mark.findByIdAndUpdate(id, {
          userId,
          examId,
        });
        if (markUpdated) {
          console.log("updated");
          await markUpdated.save();
          res.status(202).json({
            mark: markUpdated,
          });
        } else {
          console.log("field update");
          res.status(402).json("field update");
        }
      } else {
        console.log("params is not found ..!");
        res.status(402).json("params is not found ..!");
      }
    } else {
      console.log("invalid data ..!");
      res.status(402).json("invalid data ..!");
    }
  } catch (error) {
    console.log("error in controller mark update", error);
    res.state(500).json("interall server error");
  }
};
