import {Http} from "../utils/http";

class Theme {
  static getHomeLocationA() {
    return Http.request({
      url: '/theme/by/names',
      data: {
        names: 't-1'
      },
    });
  }
}

export {
  Theme
};
