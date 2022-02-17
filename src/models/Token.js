const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const TokenSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true,
    },
    meter: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    numberOfDays: {
        type: Number,
    }

},
    {
        timestamps: true
    }

);

TokenSchema.plugin(pagination);


exports.validateToken = (user) => {
    const schema = Joi.object({
        amount: Joi.string().required(),
        meter: Joi.string().required(),
        username: Joi.string().required(),
        token: Joi.string(),
        numberOfDays: Joi.number()
    })
    return schema.validate(user);
};
exports.validateMeter = (phone) => {
    var pattern = new RegExp("\\d{6}");;
    return phone.match(pattern);
}


exports.validateAmount = (number) => {
    const validNumber = (number % 100 == 0) && (number < 182500) ? number : false;
    return validNumber;
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