const express = require("express")
const {addCard,getAllcards,deleteCard,updateCard ,getCard} = require("../controller/cardsController")
const router = express.Router()



router.post("/add-card-form" , addCard )

router.get("/get-all",getAllcards)

router.delete("/del-card/:id",deleteCard)

router.get("/update-card/:id",getCard)

router.put("/update-card/:id",updateCard)




module.exports = router;
