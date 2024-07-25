const nodemailer = require('nodemailer');
const {Email , Pass, Vurl} = require('../utility/config');


const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:Email,
        pass:Pass
    },
});


const Sendmail = async (to , subject, text,html) => {       

    const mailoptions = {
        from:Email,
        to:to,
        subject:subject,
        text:text,
        html:html
    };

    try {
        await transporter.sendMail(mailoptions);
        
        
    } catch (error) {
        console.log(error);        
    }

};

module.exports = {Sendmail};