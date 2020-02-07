const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailgun = require("mailgun-js");
const api_key = '9dab8e009f463bee3e67fe0cf8b2c9e2-2dfb0afe-c4fa1cec';
const DOMAIN = 'sandboxe01f34e5f5eb4cf1a62b0ad3668d5ec2.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});


const authConfig = require('../../config/auth');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
    return token = jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

router.post('/register', async (req, res) => {
    const {email} = req.body;
    let emailc = await User.findOne({email})

    try {
        if (emailc){
            return res.status(400).send({error: 'Email already exists'})
        };
    
        const user = await User.create(req.body);
        
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({error: 'Registration failed'})
    }
});

router.post('/authenticate', async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
    
        if(!user)
            return res.status(400).send({error: 'User not found'});

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: 'Invalid password'});

        user.password = undefined;


        res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({error})
    }
    
});

router.post('/forgot_password', async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).send({error: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        console.log(email);
        const data = {
            from: 'Deukaus <trovaodo@gmail.com>',
            to: 'deukaus@gmail.com',
            subject: 'Recuperação de senha',
            text: `Recuperação de senha ${token}`
        };

        mg.messages().send(data, function (error, body) {
            if (error) {
                console.log(error);
                return res.status(400).send({error: 'Cannot send forgot password email'});
            }
            res.send();
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({error: 'Erro on forgot password, try again'});
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({email})
            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({error: 'User not found'});  
            
        if (token !== user.passwordResetToken)
            return res.status(400).send({error: 'Token invalid'});

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({error: 'Token expired, generate a new one'});

        user.password = password;
        await user.save();

        res.send();
    } catch (err) {
        res.status(400).send({error: 'Cannot reset password, try again'});
    }
});

module.exports = app => app.use('/auth', router);
