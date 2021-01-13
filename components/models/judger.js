import {SpuCode} from "./spu-code";
import {CellStatus} from "../../core/enum";
import {SpuPaging} from "../../models/spu-paging";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {
  fenceGroup;
  pathDict = [];
  skuPending;

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup;
    this._initPathDict();
    this._initSpuPending();
  }

  _initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(s => {
      const spuCode = new SpuCode(s.code);
      this.pathDict = this.pathDict.concat(spuCode.totalSegments);
    })
  }

  _initSpuPending() {
    this.skuPending = new SkuPending()
  }

  judge(cell, x, y) {
    this._changeCurrentCellStatus(cell, x, y);
    this.fenceGroup.eachCell((cell, i, j) => this._changeOtherCellStatus(cell, i, j));
  }

  _changeCurrentCellStatus(cell, x, y) {
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED;
      this.skuPending.insertCell(cell, x);
    }
    if (cell.status === CellStatus.SELECTED) {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
      this.skuPending.removeCell(x);
    }
  }

  _changeOtherCellStatus(cell, x, y) {
    const path = this._findPotentialPath(cell, x, y);
    // console.log(path)
    if(!path){
      return;
    }
    const isInDict = this._isInDict(path);
    if (isInDict) {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
    } else {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN;
    }
  }

  _isInDict(path) {
    return this.pathDict.includes(path)
  }

  _findPotentialPath(cell, x, y) {
    const joiner = new Joiner('#');
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      const selected = this.skuPending.findSelectedCellByX(i);
      if (x === i) {
        // 当前行 1-17
        // if(cell.status === CellStatus.SELECTED){ 这种写法 会出现同行选中多个 Cell 的问题
        if(this.skuPending.isSelected(cell, x)){
          // 当前行 如果已选中不加入到潜在路径
          return
        }
        const cellCode = this._getCellCode(cell.spec);
        joiner.join(cellCode)
      } else {
        // 其它行 选中项 3-29
        if (selected) {
          const selectedCellCode = this._getCellCode(selected.spec);
          joiner.join(selectedCellCode)
        }
      }
    }
    return joiner.getStr();
  }

  _getCellCode(spec) {
    return spec.key_id + '-' + spec.value_id;
  }
}

export {
  Judger
}
