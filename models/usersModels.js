const mongoose = require('mongoose');
const User = require('./usersModels');
const userSchema = mongoose.Schema(
	{
		fullname: {
			type: String,
			required: [true, 'Full Name is required!'],
			trim: true,
			minLength: [3, 'Full Name must have at least 3 characters!'],
		},
		email: {
			type: String,
			required: [true, 'Email is required!'],
			trim: true,
			unique: [true, 'Email must be unique!'],
			minLength: [5, 'Email must have 5 characters!'],
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Password must be provided!'],
			trim: true,
			select: false,
		},
		phone: {
			type: String, // Waan isticmaalay String si aan u xakameeyo dhererka
			required: [true, 'Phone number is required!'],
			unique: true,
			match: [/^\d+$/, 'Phone number must contain only numbers!'],
			minLength: [7, 'Phone number must be at least 7 digits!'],
			maxLength: [15, 'Phone number cannot be more than 15 digits!'],
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verificationCode: {
			type: String,
			select: false,
		},
		verificationCodeValidation: {
			type: Number,
			select: false,
		},
		forgotPasswordCode: {
			type: String,
			select: false,
		},
		forgotPasswordCodeValidation: {
			type: Number,
			select: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);