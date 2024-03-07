import nodemailer from 'nodemailer';
import { SMTP_PASSWORD, SMTP_USERNAME } from '$env/static/private';
import { dev } from '$app/environment';

let mailConfig;
if (dev) {
	mailConfig = {
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: SMTP_USERNAME,
			pass: SMTP_PASSWORD
		}
	};
} else {
	mailConfig = {
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: SMTP_USERNAME,
			pass: SMTP_PASSWORD
		}
	};
}

const transporter = nodemailer.createTransport(mailConfig);

type EmailInfo = { email: string; subject: string; body: string };

export async function sendEmail({ email, subject, body }: EmailInfo) {
	const emailOptions = {
		from: 'contato@instagain.club',
		to: email,
		subject,
		html: body
	};

	const info = await transporter.sendMail(emailOptions);
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
