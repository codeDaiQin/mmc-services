module.exports = () => {
  return async (ctx, next) => {
    console.log('中间件');
    await next()
  }
}