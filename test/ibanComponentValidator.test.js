const assert = require('assert')
var expect = require('chai').expect;
var should = require('chai').should();

import { cleanIban, checkInvalidChars, checkStartOfIBAN, checkCountryCode, checkLength } from '../src/ibanValidator'

describe('When coarse format checking', () => {

  describe('non-valid characters', () =>{

    it('should clean out spaces', () => {
      const ibanUnderTest = "DE12 3456 7890 1234 5678 90"
      const cleanedIban = "DE12345678901234567890"
      cleanIban(ibanUnderTest).should.equal(cleanedIban)
    })

    it('should clean out dashes', () => {
      const ibanUnderTest = "DE12-3456-7890-1234-5678-90"
      const cleanedIban = "DE12345678901234567890"
      cleanIban(ibanUnderTest).should.equal(cleanedIban)
    })

    it('should reject invalid characters', () => {
      const ibanUnderTest = "DE*123,456789🐶01234567890"
      const cleanedIban = "DE12345678901234567890"
      checkInvalidChars(ibanUnderTest).should.equal(false)
    })

    it("should pass valid characters", () => {
      const ibanUnderTest = "DE12345678901234567890"
      checkInvalidChars(ibanUnderTest).should.equal(true)
    })

  })

  describe('IBAN start characters', () => {

    it("should reject an IBAN that starts with numbers", () => {
      const IBANUnderTest = "12345678901234567890"
      checkStartOfIBAN(IBANUnderTest).should.equal(false)
    })

    it("should reject an IBAN that starts with a single uppercase letter", () => {
      const IBANUnderTest = "A12345678901234567890"
      checkStartOfIBAN(IBANUnderTest).should.equal(false)
    })

    it("should reject an IBAN that starts with a single lowercase letter", () => {
        const IBANUnderTest = "a12345678901234567890"
        checkStartOfIBAN(IBANUnderTest).should.equal(false)
    })

    it("should reject an IBAN that starts with non-alpha characters", () => {
        const IBANUnderTest = "🐶🐔12345678901234567890"
        checkStartOfIBAN(IBANUnderTest).should.equal(false)
    })

    it("should pass an IBAN that starts with two uppercase letters", () => {
      const IBANUnderTest = "AB12345678901234567890"
      checkStartOfIBAN(IBANUnderTest).should.equal(true)
    })

    it("should pass an IBAN that starts with two lowercase letters", () => {
      const IBANUnderTest = "ab12345678901234567890"
      checkStartOfIBAN(IBANUnderTest).should.equal(true)
    })

    it("should reject an IBAN with alpha characters in the checkdigits", () => {
      const IBANUnderTest = "ABCD345678901234567890"
      checkStartOfIBAN(IBANUnderTest).should.equal(false)
    })

    it("should pass an IBAN with numeric characters in the checkdigits", () => {
      const IBANUnderTest = "AB11345678901234567890"
      checkStartOfIBAN(IBANUnderTest).should.equal(true)
    })

    it("should reject an IBAN with an invalid country code", () => {
      const IBANUnderTest = "XY11345678901234567890"
      checkCountryCode(IBANUnderTest).should.equal(false)
    })

    it("should pass an IBAN with an valid country code", () => {
      const IBANUnderTest = "DE11345678901234567890"
      checkCountryCode(IBANUnderTest).should.equal(true)
    })

    it("should pass an IBAN with an valid lowercase country code", () => {
      const IBANUnderTest = "de11345678901234567890"
      checkCountryCode(IBANUnderTest).should.equal(true)
    })

  })

  describe('length', () => {

    it("should reject IBANs that have more than 34 characters", () => {
      const ibanUnderTest = "DE345678901234567890123456789012345"
      expect(() => checkLength(ibanUnderTest)).to.throw('invalidLength');
    })

    it("should reject IBANs that have more than max # of characters for the country code", () => {
      const de_ibanUnderTest = "DE345678901234567890123" // DE max = 22, should fail
      const be_ibanUnderTest = "BE345678901234567" // BE max = 16, should fail
      const mt_ibanUnderTest = "MT3456789012345678901234567890123" // MT max = 31, should fail

      expect(() => checkLength(de_ibanUnderTest)).to.throw('invalidLength');
      expect(() => checkLength(be_ibanUnderTest)).to.throw('invalidLength');
      expect(() => checkLength(mt_ibanUnderTest)).to.throw('invalidLength');
    })

    it("should pass IBANs with correct # of characters for country code", () => {
      const de_ibanUnderTest = "DE34567890123456789012" // DE=22
      const be_ibanUnderTest = "BE34567890123456" // BE = 16
      const mt_ibanUnderTest = "MT34567890123456789012345678901" // MT = 31

      checkLength(de_ibanUnderTest).should.equal(true)
      checkLength(be_ibanUnderTest).should.equal(true)
      checkLength(mt_ibanUnderTest).should.equal(true)
    })

  })

})
