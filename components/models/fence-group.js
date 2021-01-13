import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
  constructor(spu) {
    this.spu = spu;
    this.spuList = spu.sku_list;
    this.fences = [];
  }

  /**
   * 规格值矩阵用循环方式实现转置及元素去重
   *
   * 金属灰 七龙珠 小号S             金属灰  青芒色  橘黄色
   * 青芒色 灌篮高手 中号M     =>    七龙珠  灌篮高手  圣斗士
   * 青芒色 圣斗士  大号L            小号S   中号M   大号L
   * 橘黄色 七龙珠  小号S
   */

  // 矩阵转置方式
  initFences() {
    const matrix = this._createMatrix(this.spuList);
    const fences = [];
    const AT = matrix.transpose();
    AT.forEach(specs => {
      const fence = new Fence(specs);
      fence.init();
      fences.push(fence)
    });
    // console.log('fences', fences);
    this.fences = fences;
  }

  initFences1() {
    const matrix = this._createMatrix(this.spuList);
    const fences = [];
    let currentJ = -1;
    matrix.each((element, i, j) => {
      if (currentJ !== j) {
        // 开启一个新列，创建新的 Fence
        currentJ = j;
        fences[currentJ] = this._createFence()
      }
      fences[currentJ].pushValueTitle(element.value)

    });
  }

  _createFence() {
    return new Fence()
  }

  _createMatrix(skuList) {
    const m = skuList.map(sku => sku.specs);
    return new Matrix(m)
  }

  eachCell(cb) {
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
        const cell = this.fences[i].cells[j];
        cb(cell, i, j);
      }
    }
  }
}

export {
  FenceGroup
}
