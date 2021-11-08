import client from "../models/client.js";

const registerClient = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Datos incompletos");
  const existingClient = await  client.findOne({name: req.body.name}); 
    if(existingClient)
        return res.status(400).send("Este Cliente ya existe");
    const clientSchema = new client({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    
    const result = await clientSchema.save();
    if(!result) res.sendStatus(500).send("No se pudo agregar en la BD");  
    return res.status(200).send({result});    
};

const listClient = async (req,res) => {
  const clientSchema = await client.find();
  if(!clientSchema || clientSchema.length==0) return res.status(400).send("Empty Client list");
  return res.status(200).send({clientSchema});
}

export default {registerClient, listClient}
