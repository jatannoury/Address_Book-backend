//importing required dependencies
const User = require("../../../model/User");
const {
  getByName,
  getByEmail,
  getByNb,
  addUser,
  getByid,
  getUsers,
  add_Contact,
  getAllContacts,
  getContactByEmail,
} = require("../services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
//

//User APIS
async function Login(req, res) {
  try {
    //check validity of email
    const user = await getByEmail(req.body.email);
    if (!user) return res.status(400).send("invalid credentials");

    //check validity of password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("invalid credentials");

    //create jwt token
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      TOKEN_SECRET
    );

    return res.header("auth-token", token).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function register(req, res) {
  try {
    //encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //adding inputs to mongodb
    const addUserResult = await addUser(req.body, hashedPassword);
    return res.send({ user: addUserResult._id });
  } catch (error) {
    console.log(error);
  }
}
async function get(req, res) {
  try {
    //return single user if given id
    if (req.query.id) {
      const result = await getByid(id);
      return res.send(result);
    }
    //else return all users
    const result = await getUsers();
    console.log("result=>", result);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
}
//

/*Contacts APIS*/
async function addContact(req, res) {
  try {
    //retrieve new contact schema
    const addContactResult = await add_Contact(req.body);
    //retrieve user infos of the input id
    const curr_user = await getByid(req.body.curr_user);
    //update user's contact relation
    curr_user.contacts.push(addContactResult._id);
    curr_user.save();
    return res.send({ user: addContactResult._id });
  } catch (error) {
    console.log(error);
  }
}
async function getContacts(req, res) {
  try {
    //retrieve all contacts
    const result = await getAllContacts(req.body.curr_id);
    console.log(result);
    return res.send({ result });
  } catch (error) {
    console.log(error);
  }
}

async function getContactsByEmail(req, res) {
  try {
    //retrieve the user assigned with the input email
    const result = await getContactByEmail(req.body.curr_email);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactsByNb(req, res) {
  try {
    //retrieve the user assigned with the input number
    const result = await getByNb(req.body.phoneNb);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
}
async function getContactsByName(req, res) {
  try {
    //retrieve all the users assigned with the input name
    const result = await getByName(req.body.name);
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
}
//
module.exports = {
  Login,
  register,
  get,
  addContact,
  getContacts,
  getContactsByEmail,
  getContactsByNb,
  getContactsByName,
};
