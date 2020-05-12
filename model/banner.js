import {Http} from "../utils/http";

class Banner{
  static bannerB = 'b-1';

  static getHomeLocationB(){
    return Http.request({
      url: `/banner/name/${Banner.bannerB}`,
    })
  }
}

export {
  Banner
}
