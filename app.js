const express = require('express');
const cors = require('cors');
const setupRoutes = require('./routers/indexRouter');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
