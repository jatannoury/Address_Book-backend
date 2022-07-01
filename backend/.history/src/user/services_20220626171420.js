//import all dependencies
const { use } = require(".");
const User = require("../../model/User");
const Contact = require("../../model/Contact");
const { findByIdAndRemove } = require("../../model/User");
const { findByIdAndUpdate } = require("../../model/Contact");

async function getByEmail(email) {
  //return first user having matching synonym
  return await User.findOne({
    email,
  });
}
async function addUser(body, hashedPassword) {
  //get from body name and email variables
  const { name, email } = body;
  //create new user schema
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  //save new schema
  return await user.save();
}
async function getUsers() {
  //get all users
  return await User.find(/*type here to filter*/);
}

async function getByid(id) {
  //find first using having matching id
  return await User.findById(id);
}

async function add_Contact(body) {
  //getting all variables from body
  const { fullName, phoneNb, rlsStatus, email, lat, long, curr_user } = body;
  const user = [curr_user];
  //creating new contact schema
  const contact = new Contact({
    fullName,
    phoneNb,
    rlsStatus,
    email,
    lat,
    long,
    user,
  });
  return await contact.save();
}
async function getAllContacts(id) {
  //get all contacts while populating
  return await User.findById(id).populate("contacts");
}
async function getContactByEmail(email) {
  //find first contact having matching input email
  return await Contact.find({ email }).populate("user");
}
async function getByNb(nb) {
  //find first contact having matching input number
  return await Contact.find({ phoneNb: nb }).populate("user");
}
async function getByName(name) {
  //find all contacts having similar input name
  return await Contact.find({ fullName: name }).populate("user");
}
async function Update(type, content, id) {
  return await Contact.findByIdAndUpdate(id, { toS: content });
}
module.exports = {
  getByEmail,
  addUser,
  getByid,
  getUsers,
  add_Contact,
  getAllContacts,
  getContactByEmail,
  getByNb,
  getByName,
  Update,
};
