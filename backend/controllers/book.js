import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (!req.body.name || !req.body.author || !req.body.yearPublication)
    return res.status(400).send("Datos incompletos");
  const existingBook = await book.findOne({name: req.body.name}); 
    if(existingBook)
        return res.status(400).send("Este Libro ya existe");
    const bookSchema = new book({
        name: req.body.name,
        author: req.body.author,
        year: req.body.yearPublication,
        pages: req.body.pages,
        gender: req.body.gender,
        price: req.body.price,
    });
    
    const result = await bookSchema.save();
    if(!result) res.sendStatus(500).send("No se pudo agregar en la BD");  
    return res.status(200).send({result});    
};

const listBook = async (req,res) => {
  const bookSchema = await book.find();
  if(!bookSchema || bookSchema.length==0) return res.status(400).send("Empty Book list");
  return res.status(200).send({bookSchema});
}

export default {registerBook, listBook}
