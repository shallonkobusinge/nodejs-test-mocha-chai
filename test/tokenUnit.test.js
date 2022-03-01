const { expect } = require("chai");
const { validateAmount, validateMeter, validateTokenNumber } = require("../src/models/Token");

describe('validate the token model data entered', () => {
    it('should validate the meter entered', async () => {
        expect(validateMeter(10)).to.be.false;
        expect(validateMeter(1056)).to.be.false;
        expect(validateMeter(106799)).to.be.true;
    })
    it('should validate amount entered', () => {
        expect(validateAmount(10)).to.be.false;
        expect(validateAmount(59)).to.be.false;
        expect(validateAmount(200)).to.be.true;
    })
    it('should validate token number generated', () => {
        expect(validateTokenNumber(10)).to.be.false;
        expect(validateTokenNumber(105699)).to.be.false;
        expect(validateTokenNumber(10679912)).to.be.true;

    })
})