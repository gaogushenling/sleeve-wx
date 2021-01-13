// 用于封装小程序 wx 的异步请求，使用 async/await 语法
const  promisic = function (func) {
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

// 排列组合函数
const combination = function (arr, size) {
  const r = [];

  function _(t, a, n) {
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (let i = 0, l = a.length - n; i <= l; i++) {
      const b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }

  _([], arr, size);
  return r;
};

export {
  promisic,
  combination
}
