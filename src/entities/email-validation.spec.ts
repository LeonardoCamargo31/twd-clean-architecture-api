import { Email } from './email'

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'any@email.com'
    const response = Email.validate(email)
    expect(response).toBeTruthy()
  })

  test('should not accept strings larger than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept domain part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@email.com'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email = '@email.com'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept empty domain part', () => {
    const email = 'any@'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept domain with part larger than 63 chars', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept local part with invalid char', () => {
    const email = 'any @email.com'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept local part with two dots', () => {
    const email = 'any..@email.com'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept local part with ending dot', () => {
    const email = 'any.@email.com'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })

  test('should not accept email without an @ or at-sign', () => {
    const email = 'anyemail.com'
    const response = Email.validate(email)
    expect(response).toBeFalsy()
  })
})
