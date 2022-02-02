const cellarRouter = require('express').Router();
const Joi = require('joi');
const multer = require('multer');
const cellar = require('../models/cellarModel');
const match = require('../models/matchModel');


const upload = multer({ dest: 'uploads/images' });


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

cellarRouter.post(
  '/',
  upload.single('image'),
  async (req, res) => {
    const { value: newWine, error } = uploadSchemaWine.validate(req.body);

    if (error) {
      return res.status(400).json(error);
    }

    try {
      const [{ insertId: id }] = await cellar.insertArticle(
        newWine,
        req.file.path,
      );

      return res.status(200).json({
        id,
        ... newWine,
        image: req.file.fileName,
      });
    } catch (errors) {
      console.log(errors);
      return res.status(500).json({ errors });
    }
  },
);

cellarRouter.delete('/:id', async (req, res) => {
  await cellar.deleteArticle(req.params.id);
  return res.status(204).json();
});

cellarRouter.put(
  '/:id',upload.single('image'),
  async (req, res) => {
    const { value: updateWine, error } = uploadSchemaWine.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: 'remplissez les champs',
      });
    }

    await cellar.updateWine(updateWine, req.file, req.params.id);
    return res.status(204).json({ message: 'your cellar have been updated' });
  },
);

cellarRouter.get('/search/winematch', async (req, res) => {
  const [match] = await match.findWineMatch(
    req.query.term,
  );
  return res.json(match);
});

module.exports = cellarRouter;
