module.exports = {
  port: 3000,
  jwtSecret: '!!CryptoCat@!!',
  jwtExpirationInSeconds: 60 * 60, // 1 hour
  roles: {
    USER: 'user',
    ADMIN: 'admin'
  },
  productPriceUnits: {
    DOLLAR: 'dollar',
    EURO: 'euro',
    INR: 'inr'
  },
  menuCategory: {
    Beverages: 'Beverages',
    Dessert: 'Dessert',
    Starters: 'Starters',
    Breakfast: 'Breakfast',
    Lunch: 'Lunch',
    Dinner: 'Dinner'
  }
}
