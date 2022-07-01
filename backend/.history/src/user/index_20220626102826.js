const { Router } = require("express");
const {
  Login,
  register,
  get,
  addContact,
  getContacts,
  deleteContact,
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
router.post("/get_ByEmail", getContactsByEmail);
router.post("/get_ByPhoneNb", getContactsByNb);
router.post("/get_ByName", getContactsByName);
router.delete("/delete_contact", deleteContact);

module.exports = router;
