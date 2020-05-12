// 用于封装小程序 wx 的异步请求，使用 async/await 语法
const promisic = function (func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      });
      func(args)
    })
  }
};

export {
  promisic
}
