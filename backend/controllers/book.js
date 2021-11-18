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
//ejecucion interna (cuando se hace login para saber que rol tiene)
const updateBook = async (req,res) => {
  if (!req.body.name || !req.body.author || !req.body.yearPublication)
    return res.status(400).send("Datos incompletos");

  const existingBook = await book.findOne({name: req.body.name, author: req.body.author}); 
  if(existingBook) return res.status(400).send("Este Libro ya existe"); 
 
  const bookUpdate = await book.findByIdAndUpdate(req.body._id, {name:req.body.name, author: req.body.author, yearPublication: req.body.yearPublication, pages: req.body.pages, gender: req.body.gender, price: req.body.price});
  return !bookUpdate ? res.status(400).send("error al editar el libro") : res.status(200).send({bookUpdate}); 
}


const deleteBook = async (req,res) => {
  const bookDelete = await book.findByIdAndDelete({_id: req.params["_id"] });
  return !bookDelete ? res.status(400).send("Libro no encontrado") : res.status(200).send("Libro Eliminado")
}

const findBook = async (req, res) => {
  const bookId = await book.findById({ _id: req.params["_id"] });
  return !bookId
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ bookId });
};

export default {registerBook, listBook, updateBook, deleteBook, findBook}
