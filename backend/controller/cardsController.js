const Joi = require("joi");
const AddCardModule = require("../models/CardInfo");
const addCard = async (req, res) => {
  try {
    const addCard = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      phone: Joi.string()
        .pattern(/^\d{10}$/, "phone number not match")
        .required(),
      location: Joi.string().required(),
    });
    const { value, error } = addCard.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(404).json({ mseg: "wrong data in validation" });
    }

    const NewAddCard = new AddCardModule({ ...value });

    await NewAddCard.save();
    res.status(201).json(NewAddCard);
  } catch (err) {
    res.status(401).json({ mesg: "can`t create card", error: err });
  }
};

const getAllcards = async (req, res) => {
  try {
    const allCards = await AddCardModule.find();
    res.status(200).json(allCards);
  } catch (err) {
    res.status(401).json({ mesg: "can`t get all cards", error: err });
  }
};

const deleteCard = async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    await AddCardModule.deleteOne({ _id: id });
    res.status(200).json({ massege: "delet const " });
  } catch (err) {
    res.status(400).json({ masseges: "cant del card " });
  }
};

const getCard = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await AddCardModule.findById(id);
    if (!card) {
      res.status(404).json({ massege: "card not found " });
    }
    res.status(200).json(card);
  } catch (err) {
    res.status(400).json({ massege: "cant get card " });
  }
};

const updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCard = await AddCardModule.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateCard) {
      res.status(404).json({ massege: "card not found " });
    }
    res.status(200).json(updateCard);
  } catch (err) {
    res.status(400).json({ masseges: "cant update card " });
  }
};
module.exports = { addCard, getAllcards, deleteCard, updateCard, getCard };
