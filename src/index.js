
const Koa = require('Koa');
const Router = require('koa-router');
const fs = require('fs');
const app = new Koa();
const router = new Router();


(function reg () {
  autoRegControl('users');
})()

function autoRegControl (dir_name) {
  let files = fs.readdirSync(__dirname + `/${ dir_name }`).filter(ele => {
    return ele.endsWith('.js');
  });
  files.forEach(file => {
    let mapping = require(__dirname +  `/${dir_name}/` + file);
    if (mapping !== undefined && mapping) autoMapping(mapping);
  });
}

function autoMapping (mapping) {
  for (let i in mapping) {
    let index = i.indexOf('/_//') + 3;
    let methodIndex = -1;
    ['GET', 'POST', 'PUT', 'DELETE'].forEach((ele, index) => {
      if (i.startsWith(ele)) methodIndex = index;
    });
    if (methodIndex === -1) return;
    switch (methodIndex) {
      case 0:
        router.get(i.substring(index), mapping[i]);
      case 1:
        router.post(i.substring(index), mapping[i]);
      case 2:  
        router.put(i.substring(index), mapping[i]);
      case 3:
        router.delete(i.substring(index), mapping[i]);
    }
  }
}

app.use(router.routes());

app.listen(3000);
console.log('app listening at port 3000');
