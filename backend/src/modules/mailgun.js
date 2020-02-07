const mailgun = require("mailgun-js");
const api_key = '9dab8e009f463bee3e67fe0cf8b2c9e2-2dfb0afe-c4fa1cec';
const DOMAIN = 'sandboxe01f34e5f5eb4cf1a62b0ad3668d5ec2.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
/*const data = {
	from: 'Deukaus <trovaodo@gmail.com>',
	to: 'deukaus@gmail.com',
	subject: 'Recuperação de senha',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
    if (error) {
        console.log(error)
    }
	console.log(body);
});*/