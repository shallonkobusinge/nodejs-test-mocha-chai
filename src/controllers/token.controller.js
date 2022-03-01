
const { validateAmount, validateMeter, validateToken, validateTokenNumber, Token, generateToken, generateNumberOfDaysForAvalidToken } = require("../models/Token");
const { ETokenStatus } = require("../utils/enumerations");


const isTokenExisting = async (tokenGenerated, user) => {
    return await Token.findOne({
        $and: [
            { token: tokenGenerated },
            { username: user }
        ]
    })
}

exports.create = async (req, res) => {
    const { error } = validateToken(req.body);
    if (error) {
        res.status(400).send({ message: error.details[0].message });
    }
    if (!validateMeter(req.body.meter)) { //validate meter if has 6 digits
        res.status(400).send({ success: false, message: "Meter should be 6 digit number" });
        return;
    }
    if (!validateAmount(req.body.amount)) { //validate amount
        res.status(400).send({ success: false, message: "Invalid Amount" });
        return;
    }

    const tokenGenerated = await generateToken(); // generate 8 digit token
    //validate if the same token exists

    while (await isTokenExisting(tokenGenerated, req.body.username)) {
        tokenGenerated = await generateToken();
    }

    const currentDate = new Date("2013-03-10T02:00:00Z");

    const generateReport = new Token({
        token: tokenGenerated,
        meter: req.body.meter,
        amount: parseInt(req.body.amount),
        username: req.body.username,
        status: ETokenStatus.USED,
        numberOfDays: generateNumberOfDaysForAvalidToken(parseInt(req.body.amount)),
    })
    generateReport.acquiredOnDate = new Date();
    generateReport.expiryDate = new Date().setDate(new Date().getDate() + generateNumberOfDaysForAvalidToken(req.body.amount))
    const savedReport = await generateReport.save();
    return res.status(201).send({ success: true, message: " Token generated successfully", data: savedReport })
};

exports.getReport = async (req, res) => {
    const report = await Token.find();
    return res.status(200).send({ success: true, message: "Retrieved success", data: report });
}
