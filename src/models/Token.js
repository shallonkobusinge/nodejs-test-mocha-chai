const mongoose = require('mongoose');
const Joi = require('joi');
const timestamps = require('mongoose-timestamp');
Joi.objectId = require('joi-objectid')(Joi);
const EStatus = ["USED", "ACTIVE", "EXPIRED"];


const TokenSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    meter: {
        type: Number,
        minLength: 6,
        maxLength: 6,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    token: {
        type: Number,
        minLength: 8,
        maxLength: 8,
        unique: true,
        required: true,
    },
    numberOfDays: {
        type: Number,
    },
    status: {
        type: String,
        enum: EStatus,
        required: true,
    },
    acquiredOnDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    }

});

TokenSchema.plugin(timestamps);


exports.validateToken = (user) => {
    const schema = Joi.object({
        amount: Joi.number().integer().required(),
        meter: Joi.number().integer().required(),
        username: Joi.string().required(),
    })
    return schema.validate(user);
};
exports.validateMeter = (phone) => {
    var pattern = /^[0-9]{6}$/;
    return pattern.test(phone);
}

exports.validateAmount = (number) => {
    return (number % 100 == 0) && (number < 182500) && (number >= 100);
}

exports.validateTokenNumber = (token) => {
    const pattern = /^[0-9]{8}$/;
    return pattern.test(token);
}

exports.generateNumberOfDaysForAvalidToken = (number) => {
    var days = (number / 100);
    return days;
}

exports.generateToken = async () => {
    var min = 10000000;
    var max = 99999999;
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
exports.Token = mongoose.model("Token", TokenSchema);