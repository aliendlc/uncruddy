require('dotenv').config()

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'profiles' + 'roast'
const Profile = require('./models/profiles.js');
const Roast = require('./models/roast.js')
const session = require('express-session')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
app.use(express.static('images'))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.get('/app', (req, res)=>{
    if(req.session.currentUser){
      Profile.find({}, (error, allProfiles) => {
          Roast.find({}, (error, allRoasts) => {
          res.render('profiles.ejs', {
              profile: allProfiles,
              roast: allRoasts
          })
        })
      })
    } else {
        res.redirect('/sessions/new');
    }
});

app.get('/', (req, res) => {
    res.render('../controllers/index.ejs', {
    currentUser: req.session.currentUser
  })
})

app.get('/profiles', (req, res)=>{
    if(req.session.currentUser){
      Profile.find({}, (error, allProfiles) => {
          Roast.find({}, (error, allRoasts) => {
          res.render('profiles.ejs', {
              profile: allProfiles,
              roast: allRoasts
          })
        })
      })
    } else {
        res.redirect('/sessions/new');
    }
});

app.get('/roast', (req, res) => {
  Roast.find({}, (error, allRoasts) => {
      res.render('profiles.ejs', {
          roast: allRoasts
      })
  })
})

app.get('/profiles/new', (req, res) => {
    res.render('vNew.ejs');
});

app.get('/profiles/newRoast', (req, res) => {
    res.render('newRoast.ejs');
});

// app.get('/profiles/:id/editRoast', (req, res) => {
//     Roast.findById(req.params.id, (err, foundRoast) => {
//         res.render('editRoast.ejs',{
//             roast: foundRoast
//         });
//     })
// });

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
app.post('/roast', (req, res) => {
    Roast.create(req.body, (error, createdProfile) => {
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

const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

app.listen(PORT, () => console.log('auth happening on port', PORT))

mongoose.connect(mongoURI, { useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
