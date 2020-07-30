import {Http} from "../utils/http";

class Banner{
  static bannerB = 'b-1';
  static bannerG = 'b-2';

  static getHomeLocationB(){
    return Http.request({
      url: `banner/name/${Banner.bannerB}`,
    })
  }

  static getHomeLocationG(){
    return Http.request({
      url: `banner/name/${Banner.bannerG}`
    })
  }
}

export {
  Banner
}
