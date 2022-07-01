const { Router } = require("express");
const {
  Login,
  register,
  get,
  addContact,
  getContacts,
  getContactsByEmail,
  getContactsByNb,
  getContactsByName,
} = require("./controller/user");
const router = Router();
const testMiddleware = require("../../middleware/test");

router.post("/auth/login", Login);
router.post("/register", register);
router.get("/", testMiddleware(), get);
router.post("/set_contact", testMiddleware(), addContact);
router.post("/get_contacts", getContacts);
router.get("/get_ByEmail", getContactsByEmail);
router.get("/get_ByPhoneNb", getContactsByNb);
router.get("/get_ByName", getContactsByName);

module.exports = router;
