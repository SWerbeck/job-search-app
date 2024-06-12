import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const corsOptions = {
  credentials: true,
  origin: process.env.URL || '*',
};

// const corsOptions = {
//   credentials: true,
//   origin: process.env.URL || 'http://localhost:3000',
// };

app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.use('/api', router);
//app.get('/users', db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

//seeds all 3 sql files
//"seed":  "psql -d jsadb -a -f ./server/db/user.sql && psql -d jsadb -a -f ./server/db/company.sql && psql -d jsadb -a -f ./server/db/application.sql && psql -d jsadb -a -f ./server/db/contact.sql"

// below seeds from seed.js
//"seed":  "psql -d jsadb -a -f ./server/db/seed.js"
