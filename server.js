const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const app = express();
const knex = require('knex');
const register = require('./controllers/Register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '0000',
    database : 'smartbrain'
  }
});

app.use(cors());
app.use(express.json());

app.get('/',(req , res)=>{
	res.send("its working")
})

// app.get('/profile/:id' , (req , res) => { profile.profileHandler(req , res , db) } )

app.put('/image' , (req , res) => { image.imageHandler(req , res , db) })

app.post('/imageUrl' , (req , res) => { image.handleApiCall(req , res) })

app.post('/signin', (req , res) => {signin.signinHandler(req , res , db , bcrypt)});

app.post('/register', (req , res) => { register.registerHandler(req , res , db , bcrypt) });



app.listen(process.env.PORT || 3000 ,()=>{

	console.log(`app running on port ${process.env.PORT}`);
})




// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", "$2a$10$3n7wxhBZK2YCdqm4zqOjr.F1zu69sAyS21krhKAlNAR3q66p0x.Pi", function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// }); 