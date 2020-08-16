import {Spu} from "../../models/spu";

Page({
  data: {},
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);
    this.setData({
      spu
    })
  }
});
