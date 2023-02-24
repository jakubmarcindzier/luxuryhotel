export function currencySwitcher(picked, currency, price) {

  let rates = picked.rates ? picked.rates : []
  let symbol = picked.currency ? picked.currency : '$'
  let hotelCurrency = rates.filter( obj => obj.currency === currency);

  let sum = Number(price).toFixed(0)

  if(hotelCurrency.length) {
    sum = Number( price / hotelCurrency[0].exchange_rate_buy ).toFixed(0)
  }
  
  return symbol + ' ' + sum
}