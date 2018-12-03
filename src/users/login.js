const login_index = async function (ctx, next) {
  await next();
  let name = ctx.request.body.name;
  let password = ctx.request.body.password;
  ctx.response.type = 'application/json';
  name === 'ppb3008' && password === '896430' ? ctx.response.body = { Code: 200, Data: 'login-success!' } : ctx.response.body = ctx.response.body = { Code: 200, Data: 'login-failed!' };
};

const login_check = async function (ctx, next) {
  // await next();
  ctx.response.type = 'application/json';
  ctx.response.body = { Code: 200, Data: 'ok' };
}

module.exports = {
  "POST/_//login": login_index,
  "GET/_//loginCheck": login_check,
};