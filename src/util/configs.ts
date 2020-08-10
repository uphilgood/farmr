import * as dotenv from "dotenv";
dotenv.config();
export default {
PORT: process.env.PORT,
EMAIL: process.env.EMAIL,
PASS: process.env.PASS
};