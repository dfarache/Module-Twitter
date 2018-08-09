/*
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
*/
import qs from 'querystring';
import express from 'express';
import passport from 'passport';
import request from 'request-promise';
import * as tokenHandler from './tokenHandler';

const router = express.Router();
const twitterCredentials = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET
};

router.route('/twitter/callback').post((req, res) => {
  console.log('callback');
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            oauth_callback: "http://localhost:8080/",
            ...twitterCredentials
        }
    }).then(body => {
        res.send(qs.parse(body));
    });
});

router.route('/twitter').get((req, res, next) => {
  console.log('non callback');
    request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
            ...twitterCredentials,
            token: req.query.oauth_token
        },
        form: {oauth_verifier: req.query.oauth_verifier}
    }).then(body => {
        let reqData = qs.parse(body);

        req.body['oauth_token'] = reqData.oauth_token;
        req.body['oauth_token_secret'] = reqData.oauth_token_secret;
        req.body['user_id'] = reqData.user_id;

        next();
    });
}, passport.authenticate('twitter-token', { session: true }), (req, res, next) => {
    if(!req.user) { return res.send(401, 'Auth failure'); }

    req.auth = { id: req.user.id };
    return next();
}, tokenHandler.generate, tokenHandler.send);

export default router;
