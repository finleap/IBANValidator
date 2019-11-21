const countries = { "AL" : 28,
                    "AD" : 24,
                    "AT" : 20,
                    "AZ" : 28,
                    "BH" : 22,
                    "BY" : 28,
                    "BE" : 16,
                    "BA" : 20,
                    "BR" : 29,
                    "BG" : 22,
                    "CR" : 22,
                    "HR" : 21,
                    "CY" : 28,
                    "CZ" : 24,
                    "DK" : 18,
                    "DO" : 28,
                    "TL" : 23,
                    "EE" : 20,
                    "FO" : 18,
                    "FI" : 18,
                    "FR" : 27,
                    "GE" : 22,
                    "DE" : 22,
                    "GI" : 23,
                    "GR" : 27,
                    "GL" : 18,
                    "GT" : 28,
                    "HU" : 28,
                    "IS" : 26,
                    "IE" : 22,
                    "IL" : 23,
                    "IT" : 27,
                    "JO" : 30,
                    "KZ" : 20,
                    "XK" : 20,
                    "KW" : 30,
                    "LV" : 21,
                    "LB" : 28,
                    "LI" : 21,
                    "LT" : 20,
                    "LU" : 20,
                    "MK" : 19,
                    "MT" : 31,
                    "MR" : 27,
                    "MU" : 30,
                    "MC" : 27,
                    "MD" : 24,
                    "ME" : 22,
                    "NL" : 18,
                    "NO" : 15,
                    "PK" : 24,
                    "PS" : 29,
                    "PL" : 28,
                    "PT" : 25,
                    "QA" : 29,
                    "RO" : 24,
                    "SM" : 27,
                    "SA" : 24,
                    "RS" : 22,
                    "SK" : 24,
                    "SI" : 19,
                    "ES" : 24,
                    "SE" : 24,
                    "CH" : 21,
                    "TN" : 24,
                    "TR" : 26,
                    "AE" : 23,
                    "GB" : 22,
                    "VG" : 24 }

const letters = {
                  "A": 10,
                  "B": 11,
                  "C": 12,
                  "D": 13,
                  "E": 14,
                  "F": 15,
                  "G": 16,
                  "H": 17,
                  "I": 18,
                  "J": 19,
                  "K": 20,
                  "L": 21,
                  "M": 22,
                  "N": 23,
                  "O": 24,
                  "P": 25,
                  "Q": 26,
                  "R": 27,
                  "S": 28,
                  "T": 29,
                  "U": 30,
                  "V": 31,
                  "W": 32,
                  "X": 33,
                  "Y": 34,
                  "Z": 35
                }

const cleanIban = (iban) => {
  return iban.replace(/(\s|-)/g, '')
}

const checkInvalidChars = (iban) => {
  const regex = RegExp('[^A-Za-z0-9]')
  return !regex.test(iban)
}

const checkStartOfIBAN = (iban) => {
  const startChars = iban.substring(0, 2).toLocaleUpperCase()
  const checkDigits = iban.substring(2, 4).toLocaleUpperCase()
  const startRegex = RegExp('[A-Z][A-Z]')
  const checkRegex = RegExp('[0-9][0-9]')
  return startRegex.test(startChars) && checkRegex.test(checkDigits)
}

const checkCountryCode = (iban) => {
  const startChars = iban.substring(0, 2).toLocaleUpperCase()
  return startChars in countries
}

const rearrange = (iban) => {

    let startIndex = iban.startIndex

    // Get first 4 chars
    const firstFourChars = iban.substring(0, 4)

    // Discard chars 3,4 (old checksum)
    const firstTwoChars = firstFourChars.substring(0, 2)

    // Get remaining chars
    const remainingChars = iban.substring(4)

    return remainingChars + firstTwoChars + "00"

}

const replaceAlphaChars = (iban) => {

  const ibanArray = iban.split("")
  const codedIbanArray = new Array()

  ibanArray.forEach( element => {

    const regex = RegExp('[0-9]')
    var value = ""

    if (!regex.test(element) ) {
      // Find key for element value
      value = letters[element]
    } else {
      value = element
    }

    // replace element with the key
    codedIbanArray.push(value)

  })

  var codedIban = ""

  codedIbanArray.forEach( element => {
    codedIban = codedIban + element.toString()
  })

  return codedIban

}

const calculateChecksum = (iban) => {

    const ibanNumber = BigInt(iban)

    const modulus = ibanNumber % BigInt(97)

    const checksumInt = BigInt(98) - modulus

    if (checksumInt < 10) {
      return `0${checksumInt}`
    }

    return checksumInt.toString()

}

const checkLength = (iban) => {

  // ANY IBAN longer than 34 should be rejected
  if (iban.length > 34) {
    throw new Error('invalidLength')
  }

  // Split country characters
  const startChars = iban.substring(0,2).toLocaleUpperCase()

  // Get corresponding length
  const validIbanLength = countries[startChars]

  if (validIbanLength) {

    if (iban.length == validIbanLength) {

      return true

    } else {

      throw new Error('invalidLength')
      
    }

  } else {

    throw new Error('invalidCountryCode')

  }

}

module.exports = { cleanIban, checkInvalidChars, checkStartOfIBAN, checkCountryCode, rearrange, replaceAlphaChars, calculateChecksum, checkLength }
