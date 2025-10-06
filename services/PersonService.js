import { Person } from "../models/personModel.js";

export const getAllPersonService = async () => {
  return await Person.findAll();
};

export const getCreatePersonService = async (name, age) => {
  return await Person.create({ name, age: parseInt(age) });
};

export const DeletePersonService = async (id) => {
  return await Person.destroy({ where: { id } });
};
