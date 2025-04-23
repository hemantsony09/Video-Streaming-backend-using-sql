import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Video = sequelize.define("Video", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  path: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
  views: { type: DataTypes.INTEGER, defaultValue: 0 }  
});

export default Video;
