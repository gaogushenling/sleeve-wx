Component({
  properties: {
    banner: Object
  },
  // 监听器
  observers: {
    'banner': function(banner){   // 不支持 arrow function
      if (!banner) {
        return
      }
      if (banner.items.length=== 0) {
        return
      }
      const left = banner.items.find(i => i.name === 'left');
      const rightTop = banner.items.find(i => i.name === 'right-top');
      const rightBottom = banner.items.find(i => i.name === 'right-bottom');
      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
  },
  data: {},
  methods: {}
});
