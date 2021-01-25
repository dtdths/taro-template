module.exports = {
  extends: ['taro/react', 'prettier'],
  plugins: ['prettier'],
  globals: {
    // BASENAME: true,
    // H5_CUSTOM_ROUTES: true
  },
  rules: {
    "prettier/prettier": "error",
    "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
