
import jwt from 'jsonwebtoken';

export function send(req, res) {
    res.setHeader('x-auth-token', req.token);
    
    return res.status(200).send(JSON.stringify(req.user));
}

export function generate(req, res, next) {
    req.token = createToken(req.auth);
    return next();
}

function createToken(auth) {
    return jwt.sign({ id: auth.id }, 'cobi rocks', { expiresIn: 60 * 120 });
}
