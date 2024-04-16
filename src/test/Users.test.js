import mongoose from "mongoose";
import userManager from "../dao/manager_mongo/userManager.js";
import { config } from "dotenv";
import chai from "chai";

const expect = chai.expect;

mongoose.connect(config.mongoUrl);

describe("Test de login", () => {
  before(function () {});
  it("La", () => {});
});

describe("Test de register", () => {
  before(function () {});
  it("La", () => {});
});
