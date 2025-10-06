import { Person } from "../models/personModel.js";
import {
  getAllPersonService,
  getCreatePersonService,
  DeletePersonService,
} from "../services/PersonService.js";

export const getAllPerson = async (req, res) => {
  try {
    // const datas = await Person.findAll(); //lay all
    const datas = await getAllPersonService(); //lay all
    if (!datas) {
      return res.status(200).json({
        errmesssage: "err",
        errCode: 0,
      });
    }

    // return res.render("getAllperson", { datas });
    res.status(200).json({
      Message: "okee",
      data: datas,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCreatePerson = async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(200).json({
        errMessage: "Thieu name hoac age roi ne!!!",
        data: [],
      });
    }
    const data = await getCreatePersonService(name, age);
    res.status(200).json({
      errMessage: "Successfull",
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const DeletePerson = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(200).json({
        errMessage: "ID ko hop le!!!!",
      });
    }
    await DeletePersonService(id);
    res.status(200).json({
      errMessage: "Delete succcess!!!!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error deleting person");
  }
};

export const getFileUpdatePerson = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Person.findByPk(id);
    res.json({
      messsage: "oke ne",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error deleting person");
  }
};

export const getUpdatePerson = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { name, age } = req.body;
    const data = await Person.update(
      { name, age: parseInt(age) },
      { where: { id } }
    );
    const datane = await Person.findOne({ where: { id } });
    res.json({
      message: "oke",
      data: datane,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error Update person");
  }
};
