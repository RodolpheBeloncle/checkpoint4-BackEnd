const cellarRouter = require('express').Router();
const Joi = require('joi');
const multer = require('multer');
const cellar = require('../models/cellarModel');
const match = require('../models/matchModel');
const dish = require('../models/dishModel');

const upload = multer({ dest: 'uploads/images' });

cellarRouter.get('/total', async (req, res) => {
  const totalBottles = await cellar.sumOfBottles();
  if (totalBottles) {
    return res.json(totalBottles);
  }
  return res.status(404).json();
});

cellarRouter.get('/search', async (req, res) => {
  const [[name]] = await match.findWine(req.query);
  return res.json(name);
});

cellarRouter.get('/dishes', async (req, res) => {
  const dishes = await dish.findAllDishes();
  if (dishes) {
    return res.json(dishes);
  }
  return res.status(404).json();
});

cellarRouter.get('/match/:id', async (req, res) => {
  const [[matches]] = await match.findWineMatchById(req.params.id);
  return res.json(matches);
});

cellarRouter.get('/', async (req, res) => {
  const [wines] = await cellar.findAllWines(req.query);
  return res.json(wines);
});

cellarRouter.get('/:id', async (req, res) => {
  const [[wine]] = await cellar.findOneWineById(req.params.id);
  if (wine) {
    return res.json(wine);
  }
  return res.status(404).json();
});

const uploadSchemaWine = Joi.object({
  name: Joi.string().required(),
  vintage: Joi.string().required(),
  type: Joi.string().required(),
});

cellarRouter.post('/', upload.single('image'), async (req, res) => {
  const { value: newWine, error } = uploadSchemaWine.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    const [{ insertId: id }] = await cellar.insertWine(newWine, req.file.path);

    return res.status(200).json({
      id,
      ...newWine,
      image: req.file.fileName,
    });
  } catch (errors) {
    console.log(errors);
    return res.status(500).json({ errors });
  }
});

cellarRouter.post('/newDishMatch/:id', async (req, res) => {
  await dish.createDishMatch(req.body, req.params.id);
  return res.status(201).json();
});

cellarRouter.delete('/:id', async (req, res) => {
  await cellar.deleteWine(req.params.id);
  return res.status(204).json();
});

cellarRouter.put('/quantity/:id', async (req, res) => {
  const { quantity } = req.body;

  await cellar.updateQuantity(quantity, req.params.id);
  return res.status(204).json({ message: 'quantities have been changed' });
});

cellarRouter.put('/:id', upload.single('image'), async (req, res) => {
  const { value: updateWine, error } = uploadSchemaWine.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'feel necessery filed',
    });
  }

  await cellar.updateWine(updateWine, req.file, req.params.id);
  return res.status(204).json({ message: 'your cellar have been updated' });
});

module.exports = cellarRouter;
