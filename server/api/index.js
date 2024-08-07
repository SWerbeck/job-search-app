import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import verifyJWT from './auth-middleware/authorization.js';
import applicationRouter from './routes/application.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

const corsOrigin = {
  origin: 'http://localhost:5173', //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
// const corsOptions = {
//   credentials: true,
//   origin: process.env.URL || '*',
// };

// app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

//app.use(verifyJWT);
app.use('/api', router);
//app.get('/users', db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

//seeds all 3 sql files
//"seed":  "psql -d jsadb -a -f ./server/db/user.sql && psql -d jsadb -a -f ./server/db/company.sql && psql -d jsadb -a -f ./server/db/application.sql && psql -d jsadb -a -f ./server/db/contact.sql"

// below seeds from seed.js
//"seed":  "psql -d jsadb -a -f ./server/db/seed.js"
