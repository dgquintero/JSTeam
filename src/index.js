const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const routes = require('./routes/index')


// settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// Routes
app.use('/api', routes());

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})
