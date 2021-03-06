import client from "../models/client.js";
import role from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerClient = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Datos incompletos");
  const existingClient = await  client.findOne({name: req.body.name}); 
    if(existingClient)
        return res.status(400).send("Este Cliente ya existe");
  const hash = await bcrypt.hash(req.body.password, 10);
  
  const roleId = await role.findOne({ name: "user" });
  if (!role) return res.status(400).send({ message: "No role was assigned" });

  const clientSchema = new client({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: roleId._id,
    });
    const result = await clientSchema.save();
    try {
      return res.status(200).json({
        token: jwt.sign(
          {
            _id: result._id,
            name: result.name,
            roleId: result.roleId,
            iat: moment().unix(),
          },
          process.env.SECRET_KEY_JWT
        ),
      });
    } catch (e) {
      return res.status(400).send({ message: "Register error" });
    } 
};

const registerAdminUser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send({ message: "Incomplete data" });

  const existingUser = await client.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send({ message: "The user is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userRegister = new client({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  const result = await userRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register user" })
    : res.status(200).send({ result });
};

const listClient = async (req,res) => {
  const clientSchema = await client.find();
  if(!clientSchema || clientSchema.length==0) return res.status(400).send("Empty Client list");
  return res.status(200).send({clientSchema});
}

const updateClient = async (req,res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Datos incompletos");

  const existingClient = await client.findOne({name: req.body.name, email: req.body.email, password: req.body.password}); 
  if(existingClient) return res.status(400).send("Este Cliente ya existe"); 
 
  const clientUpdate = await client.findByIdAndUpdate(req.body._id, {name:req.body.name, email: req.body.email, password: req.body.password});
  return !clientUpdate ? res.status(400).send("error al editar el cliente") : res.status(200).send({clientUpdate}); 
}

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const clientLogin = await client.findOne({ email: req.body.email });
  if (!clientLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const hash = await bcrypt.compare(req.body.password, clientLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign({
        _id: clientLogin._id,
        name: clientLogin.name,
        roleId: clientLogin.roleId,
        iat: moment().unix(),
      }, 
      process.env.SECRET_KEY_JWT
    ),
  });
  } catch (e) {
    return res.status(400).send({ message: "Login error" }, e);
  }
};

const deleteClient = async (req,res) => {
  const clientDelete = await client.findByIdAndDelete({_id: req.params["_id"] });
  return !clientDelete ? res.status(400).send("Cliente no encontrado") : res.status(200).send("Cliente Eliminado")
}

export default {registerClient, listClient, updateClient, deleteClient, login, registerAdminUser}
