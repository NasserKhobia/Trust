import Archif from "../model/Archif";

export const Add = async (userid, res) => {
  try {
    if (userid) {
      const newArchif = new Archif({
        userId: userid,
      });
      if (newArchif) {
        console.log("created!");
        await newArchif.save();
        console.log("done");
      }
    } else {
      console.log("parametr is empaty");
      res.status(403).json("parametr is empaty");
    }
  } catch (error) {
    console.log("error in controller archif add", error);
    res.status(500).json("internal error message");
  }
};

export const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Archif.findByIdAndDelete(id);
      console.log("delete!");
      res.status(202).json("deleted!");
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller archif add", error);
    res.status(500).json("internal error message");
  }
};

export const Get = async (req, res) => {
  try {
    const archif = await Archif.find();
    if (archif) {
      console.log("done!");
      res.status(202).json(archif);
    } else {
      console.log("not found");
      res.status(404).json("not found !");
    }
  } catch (error) {
    console.log("error in controller archif Get", error);
    res.status(500).json("internal error message");
  }
};

export const GetByUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const archif = await Archif.find({ userId: id });
      if (archif) {
        console.log("done!");
        res.status(202).json(archif);
      } else {
        console.log("archif is not found ");
        res.status(404).json("archif is not found");
      }
    } else {
      console.log("params is not found ");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller archif Get", error);
    res.status(500).json("internal error message");
  }
};
