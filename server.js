require('dotenv').config()

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI
const Profile = require('./models/profiles.js');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('WELCOME')
    res.render('profiles.ejs')
})

app.get('/profiles', (req, res) => {
    Profile.find({}, (error, allProfiles) => {
        res.render('profiles.ejs', {
            profile: allProfiles
        })
    })

})

app.get('/profiles/new', (req, res) => {
    res.render('vNew.ejs');
});

app.get('/profiles/:id/edit', (req, res) => {
    Profile.findById(req.params.id, (err, foundProfile) => {
        res.render('edit.ejs',{
            profile: foundProfile
        });
    })
});

app.get('/profiles/:id', (req, res) => {
    Profile.findById(req.params.id, (error, foundProfile) => {
        res.render('show.ejs', {
            profile: foundProfile
        });
    });
});

app.post('/profiles/', (req, res) => {
    Profile.create(req.body, (error, createdProfile) => {
        res.redirect('/profiles')
    });
});



app.put('/profiles/:id', (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProfile) => {
        res.redirect('/profiles');
    })
});

app.delete('/profiles/:id', (req, res) => {
    Profile.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/profiles');
    });
});


app.listen(PORT, () => console.log('auth happening on port', PORT))

mongoose.connect('mongodb://localhost:27017/' + 'profiles', { useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
