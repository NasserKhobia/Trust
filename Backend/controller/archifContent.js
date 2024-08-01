import ContentArchif from "../model/ArchifContent.js";

export const Add = async (req, res) => {
  try {
    const { day, content, auther, archifId } = req.body;
    if (day && content && auther && archifId) {
      const content = new ContentArchif({
        day,
        content,
        auther,
        archifId,
      });
      if (content) {
        console.log("created !");
        await content.save();
        res.status(202).json(content);
      } else {
        console.log("dose not created");
        res.status(401).json("dose not created");
      }
    } else {
      console.log("invaled data");
      res.status(402).json("invaled data");
    }
  } catch (error) {
    console.log("error in controller archifContent add", error);
    res.status(500).json("internal server error");
  }
};

export const Delete = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await ContentArchif.findByIdAndDelete(id);
      console.log("deleted..!");
      res.status(202).json("deleted..!");
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller archifContent Delete", error);
    res.status(500).json("internal server error");
  }
};

export const Update = async (req, res) => {
  try {
    const id = req.params.id;
    const { day, content, auther, archifId } = req.body;
    if (id) {
      if (day && content && auther && archifId) {
        const contentUpdated = await ContentArchif.findByIdAndUpdate(id, {
          day,
          content,
          auther,
          archifId,
        });
        if (contentUpdated) {
          console.log("updated!");
          await contentUpdated.save();
          res.status(202).json({
            content: contentUpdated,
          });
        } else {
          console.log("dose not created!");
          res.status(403).json("dose not created!");
        }
      } else {
        console.log("invaled data !");
        res.status(401).json("invaled data !");
      }
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller archifContent Update", error);
    res.status(500).json("internal server error");
  }
};

export const GetByArchifId = async (req, res) => {
  try {
    const id = req.params.archifId;
    if (id) {
      const archifContent = await ContentArchif.find({ archifId: id });
      if (archifContent) {
        console.log("done!");
        res.status(202).jaon(archifContent);
      } else {
        console.log("not Found");
        res.status(404).json("not Found");
      }
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller archifContent GetByarchif", error);
    res.status(500).json("internal server error");
  }
};

export const GetByAutherId = async (req, res) => {
  try {
    const id = req.params.autherId;
    if (id) {
      const archifContent = await ContentArchif.find({ auther: id }).sort({
        day,
      });
      if (archifContent) {
        console.log("done!");
        res.status(202).jaon(archifContent);
      } else {
        console.log("not Found");
        res.status(404).json("not Found");
      }
    } else {
      console.log("params is not found");
      res.status(404).json("params is not found");
    }
  } catch (error) {
    console.log("error in controller archifContent GetVByAuther", error);
    res.status(500).json("internal server error");
  }
};

export const GetByDay = async (req, res) => {
  try {
    const { day } = req.body;
    if (day) {
      const content = await ContentArchif.find({ day: day });
      if (content) {
        console.log("done");
        res.status(202).json(content);
      }
    } else {
      console.log("invaled data");
      res.status(404).json("invaled data");
    }
  } catch (error) {
    console.log("error in controller archifContent GetByDay", error);
    res.status(500).json("internal server error");
  }
};
