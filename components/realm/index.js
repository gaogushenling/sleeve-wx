import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

Component({
  properties: {
    spu: Object
  },
  data: {
    judger: Object,
  },
  observers: {
    'spu': function(spu){
      if(!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      // console.log(judger.pathDict)
      this.data.judger = judger;
      this.bindInitFences(fenceGroup.fences);
    }
  },
  methods: {
    bindInitFences(fences){
      this.setData({
        fences
      })
    },

    onCellTap(event){
      const cell = event.detail.cell;
      const x = event.detail.x;
      const y = event.detail.y;
      const judger = this.data.judger;
      judger.judge(cell, x, y);
      this.setData({
        fences: judger.fenceGroup.fences
      });
    }
  }
});
