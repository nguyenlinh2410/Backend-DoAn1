import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Person = sequelize.define(
  "Person",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    tableName: "Person",
    timestamps: false,
  }
);
