const { validateAmount, validateMeter, validateToken, Token, generateToken, generateNumberOfDaysForAvalidToken } = require("../models/Token");

exports.create = async (req, res) => {
    const { error } = validateToken(req.body);
    if (error) {
        res.status(400).send({ message: error.details[0].message });
    }

    const validMeter = validateMeter(req.body.meter); //validate meter if has 6 digits
    if (!validMeter) {
        res.status(400).send({ message: " Meter should be 6 digit number" });
        return;
    }
    const validAmount = validateAmount(req.body.amount); //validate amount
    if (validAmount === false) {
        res.status(400).send({ message: " Amount should be divisable by 100 and less than 182,500frw" });
        return;
    }

    const tokenGenerated = await generateToken(); // generate 8 digit token
    //validate if the same token exists
    const sameTokenGenerated = await Token.findOne({
        $and: [
            { token: tokenGenerated },
            { user: req.body.user }
        ]
    })
    if (sameTokenGenerated) {
        res.status(400).send({ message: "Token is invalid." });
        return;
    }
    const numberOfDayForAvalidToken = generateNumberOfDaysForAvalidToken(req.body.amount);

    let generateReport = new Token(req.body);
    generateReport.token = tokenGenerated;
    generateReport.numberOfDays = numberOfDayForAvalidToken;

    generateReport.save();
    return res.status(201).send({ success: true, message: " Token generated successfully", data: generateReport })



}