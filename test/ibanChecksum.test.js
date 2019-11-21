const assert = require('assert')
var expect = require('chai').expect;
var should = require('chai').should();

import { rearrange, replaceAlphaChars, calculateChecksum } from '../src/ibanValidator'

describe("When preparing to calculate the checksum", ()=> {

  it("should rearrange the IBAN ready for checking", () => {
    const ibanUnderTest = "DE1234567890123456789012"
    const rearrangedIban = "34567890123456789012DE00"
    rearrange(ibanUnderTest).should.equal(rearrangedIban)
  })

  it("should replace letters with values", () => {
    const ibanUnderTest1 = "DE34567890123456789012345"
    const rearrangedIban1 = "131434567890123456789012345"
    replaceAlphaChars(ibanUnderTest1).should.equal(rearrangedIban1)

    const ibanUnderTest2 = "NL11ABNA0481433284"
    const rearrangedIban2 = "232111101123100481433284"
    replaceAlphaChars(ibanUnderTest2).should.equal(rearrangedIban2)
  })

})

describe("When calculating the checksum", () => {

  it("should calculate the checksum correctly", () => {

    // NL14ABNA0226614812
    const ibanUnderTest1 = "101123100226614812232100"
    calculateChecksum(ibanUnderTest1).should.equal('14')

    // NL11ABNA0481433284
    let ibanUnderTest2 = "101123100481433284232100"
    calculateChecksum(ibanUnderTest2).should.equal('11')

    // NL11ABNA0481433284
    let ibanUnderTest3 = "193"
    calculateChecksum(ibanUnderTest3).should.equal('02')

  })

})
