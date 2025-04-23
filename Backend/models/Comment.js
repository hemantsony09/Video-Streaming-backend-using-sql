import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import User from "./User.js";
import Video from "./Video.js";

const Comment = sequelize.define("Comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  UserId: { type: DataTypes.INTEGER, allowNull: false },
  VideoId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true, // Ensures that Sequelize automatically handles createdAt and updatedAt
});

User.hasMany(Comment);
Video.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Video);

export default Comment;
