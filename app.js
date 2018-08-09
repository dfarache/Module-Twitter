'use strict';

import http from 'http';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import { Strategy as TwitterStrategy } from 'passport-twitter';

const app = express();
const port = process.env.PORT | 8080;

// Set some server parameters
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: 'COBI ROCKS',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// init the twitter auth params
const TWITTER_AUTH = {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET
};

passport.use(new TwitterStrategy({
      consumerKey: TWITTER_AUTH.key,
      consumerSecret: TWITTER_AUTH.secret,
      callbackURL: 'http://127.0.0.1:8080'
  }, (token, tokenSecret, profile, done) => {
      console.log(profile);
      done(null, profile);
  }
));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

app.use(express.static('dist'));

// start the server
http.createServer(app).listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
