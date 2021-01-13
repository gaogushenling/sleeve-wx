import {Cell} from "./cell";

class Fence{
  cells = [];
  specs;
  title;
  id;

  constructor(specs) {
    this.specs = specs;
    this.title = specs[0].key;
    this.id = specs[0].key_id;
  }

  init(){
    this._initCells();
  }

  _initCells(){
    this.specs.forEach(s=>{
      // 规格值去重
      const existed = this.cells.some(c=>c.id===s.value_id);
      if(existed){
        return;
      }
      const cell = new Cell(s);
      this.cells.push(cell);
      // this.pushValueTitle(s.value)
    })
  }

  // pushValueTitle(value){
  //   this.valueTitles.push(value)
  // }
}

export {
  Fence
}
