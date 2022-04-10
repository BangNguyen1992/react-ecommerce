import formatMoney from '../../lib/utilities/formatMoney'

describe('formatMoney function', () => {
  test('should have divided by 100 and have decimal number', () => {
    expect(formatMoney(1)).toEqual('$0.01')
    expect(formatMoney(140)).toEqual('$1.40')
    expect(formatMoney(999)).toEqual('$9.99')
  })
  test('should not have decimal when the amount is multiple of 100', () => {
    expect(formatMoney(1000)).toEqual('$10')
  })
})
