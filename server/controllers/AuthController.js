import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

// Register new user
export const registerUser = async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);
	req.body.password = hashedPass;
	const newUser = new UserModel(req.body);
	const { username } = req.body;
	try {
		// addition new
		const oldUser = await UserModel.findOne({ username });

		if (oldUser)
			return res.status(400).json({ message: 'User already exists' });

		// changed
		const user = await newUser.save();
		const token = jwt.sign(
			{ username: user.username, id: user._id },
			process.env.JWTKEY,
			{ expiresIn: '1h' }
		);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login User

// Changed
export const loginUser = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await UserModel.findOne({ username: username });

		if (user) {
			const validity = await bcrypt.compare(password, user.password);

			if (!validity) {
				res.status(400).json('wrong password');
			} else {
				const token = jwt.sign(
					{ username: user.username, id: user._id },
					process.env.JWTKEY,
					{ expiresIn: '1h' }
				);
				res.status(200).json({ user, token });
			}
		} else {
			res.status(404).json('User not found');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

// Reset Password
export const resetPassword = async (req, res) => {
	const { currentPassword, newPassword, token } = req.body;

	try {
		const decoded = jwt.decode(token);
		if (!decoded) {
			res.status(401).json('Invalid token');
			return;
		}

		const { username, id } = decoded;
		const user = await UserModel.findOne({ username, _id: id });

		if (user) {
			const isPasswordValid = await bcrypt.compare(
				currentPassword,
				user.password
			);

			if (isPasswordValid) {
				const salt = await bcrypt.genSalt(10);
				const hashedNewPassword = await bcrypt.hash(newPassword, salt);
				user.password = hashedNewPassword;
				await user.save();
				res.status(200).json('Password reset successful');
			} else {
				res.status(401).json('Invalid current password');
			}
		} else {
			res.status(404).json('User not found');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

// Forgot Password

export const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await UserModel.findOne({ email });

		if (user) {
			const token = jwt.sign({ userId: user._id }, process.env.JWTKEY, {
				expiresIn: '1h',
			});

			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL,
					pass: process.env.EMAIL_PASSWORD,
				},
			});

			const mailOptions = {
				from: process.env.EMAIL,
				to: email,
				subject: 'Password Reset',
				html: `Click <a href="http://memist.vercel.app/resetPassword?token=${token}">here</a> to reset your password.`,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					res.status(500).json('Failed to send email');
				} else {
					console.log('Email sent: ' + info.response);
					res.status(200).json('Email sent');
				}
			});
		} else {
			res.status(404).json('User not found');
		}
	} catch (err) {
		console.log(err);
		res.status(500).json('Something went wrong');
	}
};

// Reset Password From Email
export const resetPasswordFromEmail = async (req, res) => {
	const { password, confirmPassword, token } = req.body;
	if (!token) return res.status(400).json('Invalid token');

	try {
		const decoded = jwt.verify(token, process.env.JWTKEY);
		const { userId } = decoded;
		const user = await UserModel.findById(userId);

		if (user) {
			if (password === confirmPassword) {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);
				user.password = hashedPassword;
				await user.save();
				res.status(200).json('Password reset successful');
			} else {
				res.status(400).json('Passwords do not match');
			}
		} else {
			res.status(404).json('User not found');
		}
	} catch (err) {
		console.log(err);
		res.status(500).json('Something went wrong');
	}
};

//Google Login
export const googleSignIn = async (req, res) => {
	const { idToken } = req.body;

	try {
		const ticket = await client.verifyIdToken({
			idToken,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const { sub, email } = ticket.getPayload();

		// Check if the user with the provided email exists in your database
		const user = await UserModel.findOne({ email });

		if (user) {
			// User already exists, generate and return a JWT token
			const token = jwt.sign({ userId: user._id }, process.env.JWTKEY, {
				expiresIn: '1h',
			});
			res.status(200).json({ token });
		} else {
			const newUser = new UserModel({
				googleId: sub,
				email,
			});
			await newUser.save();
			const token = jwt.sign({ userId: newUser._id }, process.env.JWTKEY, {
				expiresIn: '1h',
			});
			res.status(200).json({ token });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json('Something went wrong');
	}
};

// function onSignIn(googleUser) {
//   const idToken = googleUser.getAuthResponse().id_token;
//   // Send the idToken to your server using an HTTP request
//   fetch('/google/signin', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ idToken }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
