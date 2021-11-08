import provider from "../models/provider.js";

const registerProvider = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Datos incompletos");
  const existingProvider = await provider.findOne({name: req.body.name}); 
    if(existingProvider)
        return res.status(400).send("Este Proovedor ya existe");
    const providerSchema = new provider({
        name: req.body.name,
        address: req.body.address,
    });
    
    const result = await providerSchema.save();
    if(!result) res.sendStatus(500).send("No se pudo agregar en la BD");  
    return res.status(200).send({result});    
};

const listProvider = async (req,res) => {
  const providerSchema = await provider.find();
  if(!providerSchema || providerSchema.length==0) return res.status(400).send("Empty Provider list");
  return res.status(200).send({providerSchema});
}

export default {registerProvider, listProvider}
