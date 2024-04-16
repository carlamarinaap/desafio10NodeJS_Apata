import dotenv from "dotenv";

const environment = "DEVELOPMENT";

dotenv.config({
  path: environment === "DEVELOPMENT" ? "./.env.development" : "./.env.production",
});

export default {
  mongoUrl: process.env.MONGO_URL,
  privateKey: process.env.PRIVATE_KEY,
  userAdmin: {
    _id: 1,
    first_name: process.env.ADMIN_FIRST_NAME,
    last_name: process.env.ADMIN_LAST_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    age: 0,
    role: "admin",
  },
};
