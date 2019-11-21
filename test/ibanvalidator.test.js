const assert = require('assert')
var expect = require('chai').expect;
var should = require('chai').should();

import { cleanIban, checkInvalidChars, checkStartOfIBAN, checkCountryCode, checkLength } from '../src/ibanValidator'

describe('When checking IBANs', () => {

  describe('valid IBANS', () =>{

    it.skip('should accept valid IBANs', () => {
    })

  })

  describe('invalid IBANS', () =>{

    it.skip('should reject IBANs that are too long', () => {
    })

    it.skip('should reject IBANs that are too short', () => {
    })

    it.skip('should reject IBANs that have weird characters', () => {
    })

  })

})
