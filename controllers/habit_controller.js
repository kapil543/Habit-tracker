const Habit = require("../models/habit");

module.exports.load = async function (request, response) {
  try {
    const habits = await Habit.find();
    return response.render("home", { habit_list: habits });
  } catch (err) {
    console.log("Error in fetching habits from DB");
    return;
  }
};

// This function helps in adding a habit in list.

module.exports.add = async function (request, response) {
  try {
    request.body.record_tracker = {};
    request.body.user = "AnyUser";
    console.log(request.body);
    const newhabit = await Habit.create(request.body);
    return response.redirect("back");
  } catch (err) {
    console.log("error in creating a habit");
    return;
  }
};

// This function helps in deleting a habit from list.
module.exports.delete = async function (request, response) {
  try {
    let id = request.query.id;
    await Habit.findByIdAndDelete(id);
    return response.redirect("back");
  } catch (err) {
    console.log("error in deletion");
    return;
  }
};

// Finds a habit by id given in query params and renders it
module.exports.viewhabit = async function (request, response) {
  try {
    let id = request.query.id;
    const habit = await Habit.findById(id);
    response.render("habit.ejs", { habit: habit });
  } catch (err) {
    console.log("error in finding habit");
    return;
  }
};

// Finds a habit by id given in query params and returns it's json object
module.exports.fetchhabit = async function (request, response) {
  try {
    let id = request.query.id;
    const habit = await Habit.findById(id);
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(habit));
  } catch (err) {
    console.log("error in finding habit");
    return;
  }
};

// first find an element in database using id
module.exports.updateDates = async function (request, response) {
  try {
    let id = request.query.id;
    let date = request.query.date;
    let value = request.query.value;
    console.log(date, value, id);
    const habit = await Habit.findById(id);
    const r_t = habit.record_tracker;
    if (date in r_t) {
      r_t[date] = value;
    } else {
      r_t.set(date, value);
    }
    console.log(r_t);
    await Habit.updateOne({ _id: id }, { $set: { record_tracker: r_t } });

    return response.end('{ "status":"success"}');
  } catch (err) {
    console.log("Error in updating habit!!!!");
    return response.end('{ "status":"failed"}');
  }
};
