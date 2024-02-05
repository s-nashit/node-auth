express = require('express');
path = require('path');
phash = require('bcrypt');
Student = require('./database');
app = express();
port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.set("views",path.join(__dirname,"views"))
// app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
    res.render('login')
})



app.post('/register', async(req,res)=>{
    const {uname, pass} = req.body;
    //console.log(uname, pass)
    saltRounds = 2;
    encpass = await phash.hash(pass, saltRounds);
    console.log(encpass)
    newStudent = new Student({uname, encpass});
    Studentsave = await newStudent.save();
    res.redirect('/register')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})