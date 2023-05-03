import express from 'express';

const port = 3030;

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static('./public'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
