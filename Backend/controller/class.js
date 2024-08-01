import Class from "../model/Class.ja";

export const Add = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const classes = await Class.findOne({ name });
      if (!classes) {
        const newClass = new Class({
          name,
        });
        if (newClass) {
          console.log("created");
          await newClass.save();
          res.status(202).json({ class: newClass });
        } else {
          console.log("dose not created");
        }
      } else {
        console.log("class is exist");
        res.status.json({ class: classes });
      }
    } else {
      console.log("invaled data");
      res.status(300).json("invaled data");
    }
  } catch (error) {
    console.log("error in class controller Add", error);
    res.status(500).json("internal error server");
  }
};

export const Get = async (req, res) => {
  try {
    const classes = await Class.find();
    if (classes) {
      res.status(202).json({
        class: classes,
      });
      console.log("done");
    } else {
      res.status(404).json("classes not Found");
    }
  } catch (error) {
    console.log("error in class controller Get", error);
    res.status(500).json("internal error server");
  }
};

export const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Class.findByIdAndDelete(id);
      console.log("deleted!");
      res.status(202).json("deleted!");
    } else {
      console.log("error in params");
      res.status(404).json("params is not founded");
    }
  } catch (error) {
    console.log("error in class controller Delete", error);
    res.status(500).json("internal error server");
  }
};

export const Update = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body;
    if (id) {
      const ClassUpdated = await Class.findByIdAndUpdate(id, {
        name,
      });
      if (ClassUpdated) {
        console.log("updated");
        ClassUpdated.save();
        console.log("saved");
        res.status(202).json({
          class: ClassUpdated,
        });
      } else {
        console.log("error in update Class");
        res.status(300).json("error in update Class");
      }
    } else {
      console.log("not found id");
      res.status(404).json("not found id");
    }
  } catch (error) {
    console.log("error in class controller Put", error);
    res.status(500).json("internal error server");
  }
};
