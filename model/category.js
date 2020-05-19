import {Http} from "../utils/http";

class Category {
  static getCategoryGrid(){
    return Http.request({
      url: '/category/grid/all'
    })
  }
}

export {
  Category
}
