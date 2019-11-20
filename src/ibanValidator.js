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

module.exports = { cleanIban, checkInvalidChars, checkStartOfIBAN, checkCountryCode }
