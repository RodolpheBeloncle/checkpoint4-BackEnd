const matchRouter = require('express').Router();
const multer = require('multer');
const match = require('../models/matchModel');

const upload = multer({ dest: 'uploads/images' });

matchRouter.get('/wineMatch/:id', async (req, res) => {
  const [[matches]] = await match.findMatchById(req.params.id);
  return res.json(matches);
});

// matchRouter.get('/match/:id', async (req, res) => {
//   const [[matches]] = await match.findWineMatchById(req.params.id);
//   return res.json(matches);
// });

matchRouter.post(
  '/insertNewMatch',
  upload.single('image'),
  async (req, res) => {
    const [{ insertId: id }] = await match.insertMatch(req.body);
    return res.status(201).json({
      id,
      ...req.body,
    });
  }
);

matchRouter.put('/:id', upload.single('image'), async (req, res) => {
  const { value: updateMatch } = req.body;

  await match.updatMatch(updateMatch, req.file, req.params.id);
  return res.status(204).json({ message: 'your cellar have been updated' });
});

matchRouter.delete('/deleteMatch/:id', async (req, res) => {
  await match.deleteMatch(req.params.id);
  return res.status(204).json();
});

module.exports = matchRouter;
