const assert = require('assert')
var expect = require('chai').expect;
var should = require('chai').should();

import { cleanIban, checkInvalidChars, checkStartOfIBAN, checkCountryCode } from '../src/ibanValidator'

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

})
