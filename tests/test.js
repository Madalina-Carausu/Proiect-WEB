//TESTARE: node ./tests/test.js
const mongoose = require("mongoose");

const Plant = require("../models/Plant");


var Plants = require("../controllers/PlantsController");
var LoginUser = require("../controllers/LoginController");

mongoose.connect('mongodb://localhost:27017/eGardening');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const assert = require('assert');

const it = (desc, fn) => {
  try {
    fn();
    console.log('\x1b[32m%s\x1b[0m', `\u2714 ${desc}`);
  } catch (error) {
    console.log('\n');
    console.log('\x1b[31m%s\x1b[0m', `\u2718 ${desc}`);
    console.error(error);
  }
};

(async () => {

  var plantsFromFunction
  var plantsFromMongoDB 

  plantsFromFunction = await Plants.returnPlants("Beginner")
  plantsFromMongoDB = await Plant.find({"level":"Beginner"}).then((plants) => {return plants})
  it('should return the same plants from Beginner', () => {
    assert.strictEqual(plantsFromFunction.toString(), plantsFromMongoDB.toString())
  });

  plantsFromFunction = await Plants.returnPlants("Intermediate")
  plantsFromMongoDB = await Plant.find({"level":"Intermediate"}).then((plants) => {return plants})
  it('should return the same plants from Intermediate', () => {
    assert.strictEqual(plantsFromFunction.toString(), plantsFromMongoDB.toString())
  });

  plantsFromFunction = await Plants.returnPlants("Advanced")
  plantsFromMongoDB = await Plant.find({"level":"Advanced"}).then((plants) => {return plants})
  it('should return the same plants from Advanced', () => {
    assert.strictEqual(plantsFromFunction.toString(), plantsFromMongoDB.toString())
  });

  plantsFromFunction = await Plants.returnPlants("Beginner")
  plantsFromMongoDB = await Plant.find({"level":"Advanced"}).then((plants) => {return plants})
  it('should not return the same because is compating plants from Beginner and Advanced', () => {
    assert.notEqual(plantsFromFunction.toString(), plantsFromMongoDB.toString())
  });

  plantsFromFunction = await Plants.returnPlants("Intermediate")
  plantsFromMongoDB = await Plant.find({"level":"Advanced"}).then((plants) => {return plants})
  it('should not return the same because is compating plants from Intermediate and Advanced', () => {
    assert.notEqual(plantsFromFunction.toString(), plantsFromMongoDB.toString())
  });

  plantsFromFunction = await Plants.returnPlants("Beginner")
  plantsFromMongoDB = await Plant.find({"level":"Intermediate"}).then((plants) => {return plants})
  it('should not return the same because is compating plants from Beginner and Intermediate', () => {
    assert.notEqual(plantsFromFunction.toString(), plantsFromMongoDB.toString())
  });

  var login
  login = await LoginUser.findUserAndComparePassword("andreea", "andreutza")
  it('should return true because there is this user with this password in the database', () => {
    assert.strictEqual(login, true)
  });

  login = await LoginUser.findUserAndComparePassword("andreea", "andreutz")
  it("should return false because there is this user but does not have this password in database", () => {
    assert.strictEqual(login, false)
  });

  login = await LoginUser.findUserAndComparePassword("andree", "andreutz")
  it("should return 'Login failed!' because this user does not exist in database", () => {
    assert.strictEqual(login, "Login failed!")
  });

})()



