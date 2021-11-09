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

const updateProvider = async (req,res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Datos incompletos");

  const existingProvider = await provider.findOne({name: req.body.name,address: req.body.address}); 
  if(existingProvider) return res.status(400).send("Este Proveedor ya existe"); 
 
  const providerUpdate = await provider.findByIdAndUpdate(req.body._id, {name: req.body.name, address: req.body.address});
  return !providerUpdate ? res.status(400).send("error al editar el proveedor") : res.status(200).send({providerUpdate}); 
}


const deleteProvider = async (req,res) => {
  const providerDelete = await provider.findByIdAndDelete({_id: req.params["_id"] });
  return !providerDelete ? res.status(400).send("Proveedor no encontrado") : res.status(200).send("Proveedor Eliminado")
}

export default {registerProvider, listProvider, updateProvider, deleteProvider}
