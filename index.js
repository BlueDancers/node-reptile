let fs = require('fs')
let axios = require('axios')
let cheerio = require('cheerio')


let juejina = []

function reptile() {
  axios.get('https://juejin.im/welcome/frontend')
    .then(res => {
      // console.log(res.data);
      let $ = cheerio.load(res.data)
      let title = $('.title')
      console.log(title);
      title.map(res => {
        if (title[res].name == 'a') {
          console.log(title[res], '----------------------');
          juejina.push(title[res])
        }
      })
    })
    .then(() => {
      console.log(juejina);

      // writeHTML(juejina, './juejin.html')
    })
    .catch(res => {
      console.log(res);
    })
}

function writeHTML(data, pathName) {
  new Promise((resolve, reject) => {
      fs.unlink(pathName, (err) => {
        if (!err) {
          console.log('清空文件');
          resolve()
        } else {
          reject()
        }
      })
    })
    .then(() => {
      fs.writeFile(pathName, data, (err) => {
        if (!err) {
          console.log('写入成功');
        } else {
          console.log('写入失败');
        }
      })
    })
}

reptile()