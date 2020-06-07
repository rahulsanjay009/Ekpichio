let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Admin:Admin@cluster0-q4yrs.mongodb.net/Ekpichio?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Database connected sucessfully ')
},
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

const router = require('./controllers/user-controller')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname,'../www')))
app.use(cors())
// RESTful API root
app.use('/api', router)

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('PORT Connected on: ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});