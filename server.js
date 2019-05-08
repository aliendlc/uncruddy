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
var bodyParser = require('body-parser')
const User = require('./models/users.js')
var moment = require('moment');
moment().format();




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
    let thisUser = req.session.currentUser.username
    console.log(thisUser);
    if(req.session.currentUser){
      Profile.find({}, (error, allProfiles) => {
          Roast.find({}, (error, allRoasts) => {
              Profile.find({user: thisUser}, (error, myProfile) => {
                  Roast.find({user: thisUser}, (error, myRoast) => {
                    res.render('profiles.ejs', {
                        profile: allProfiles,
                        roast: allRoasts,
                        myProfile: myProfile,
                        myRoast: myRoast,
                        thisUser: thisUser
                  })
              })
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
                Profile.find({user: req.session.currentUser.username}, (error, myProfile) => {
                    Roast.find({user: req.session.currentUser.username}, (error, myRoast) => {
                      console.log(myRoast);
                      res.render('profiles.ejs', {
                          profile: allProfiles,
                          roast: allRoasts,
                          myProfile: myProfile,
                          myRoast: myRoast
                    })
                    console.log(req.session.currentUser.username);
                })
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
    res.render('vNew.ejs',
    {
      currentUser: req.session.currentUser
    });
});

app.get('/profiles/newRoast', (req, res) => {
    res.render('newRoast.ejs',
    {
      currentUser: req.session.currentUser
  });
});

app.get('/roast/:id/edit', (req, res) => {
    let thisUser = req.session.currentUser.username
    Roast.findById(req.params.id, (err, foundRoast) => {
        res.render('editRoast.ejs',{
            roast: foundRoast,
            thisUser: thisUser
        });
    })
});

app.get('/profiles/:id/edit', (req, res) => {
    let thisUser = req.session.currentUser.username
    Profile.findById(req.params.id, (err, foundProfile) => {
        res.render('edit.ejs',{
            profile: foundProfile,
            thisUser: thisUser,
            currentUser: req.session.currentUser
        });
    })
});

app.get('/roast/:id', (req, res) => {
    let thisUser = req.session.currentUser.username
    Roast.findById(req.params.id, (error, foundRoast) => {
        res.render('showRoast.ejs', {
            roast: foundRoast,
            thisUser: thisUser
        });
    });
});

app.get('/profiles/:id', (req, res) => {
    let thisUser = req.session.currentUser.username;
    Profile.findById(req.params.id, (error, foundProfile) => {
        res.render('show.ejs', {
            profile: foundProfile,
            thisUser: thisUser
        });
    });
});


app.post('/profiles/', (req, res) => {
    Profile.create(req.body, (error, createdProfile) => {
        res.redirect('/app')
    });
});
app.post('/roast', (req, res) => {
    Roast.create(req.body, (error, createdProfile) => {
        res.redirect('/app')
    });
});


app.put('/profiles/:id', (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProfile) => {
        res.redirect('/app');
    })
});

app.put('/roast/:id', (req, res) => {
    Roast.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProfile) => {
        res.redirect('/app');
    })
});

app.delete('/profiles/:id', (req, res) => {
    Profile.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/app');
    });
});

app.delete('/roast/:id', (req, res) => {
    Roast.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/app');
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
