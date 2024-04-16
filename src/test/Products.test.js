import mongoose from "mongoose";
import productManager from "../dao/manager_mongo/productManager.js";
import { config } from "dotenv";

mongoose.connect(config.mongoUrl);

describe("Test de productos", () => {
  before(function () {});
  it("La", () => {});
});
