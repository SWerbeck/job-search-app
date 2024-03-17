import express from 'express';
import router from './routes/routes.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.use('/api', router);
//app.get('/users', db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
