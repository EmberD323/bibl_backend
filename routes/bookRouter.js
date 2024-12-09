
const { Router } = require("express");
const bookRouter = Router();
const bookController = require("../controllers/bookController");
const verifyToken = require("../middleware/verifyToken");


bookRouter.post("/",verifyToken, bookController.createList);
bookRouter.get("/",verifyToken, bookController.getLists);
bookRouter.post("/addBook",verifyToken, bookController.addBook);
bookRouter.delete("/book/bookId",verifyToken, bookController.deleteBookAllUserLists);
bookRouter.get("/:listId",verifyToken, bookController.getList);
bookRouter.delete("/:listId",verifyToken, bookController.deleteList);

bookRouter.put("/:listId/addBook",verifyToken, bookController.listAddBook);
bookRouter.put("/:listId/deleteBook/:bookId",verifyToken, bookController.listDeleteBook);



// bookRouter.get("/received",verifyToken, bookController.receivedbooksGet);

// bookRouter.post("/",verifyToken, bookController.newbookCreate);
// bookRouter.put("/:bookid",verifyToken, bookController.bookUpdate);
// bookRouter.delete("/:bookid",verifyToken, bookController.bookDelete);



module.exports = bookRouter;
