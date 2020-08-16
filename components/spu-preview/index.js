Component({
  properties: {
    data: Object
  },
  data: {
    tags: Array,
  },
  observers: {
    'data': function(data){
      if(!data){
        return
      }
      if(!data.tags){
        return
      }
      const tags = data.tags.split('$');
      this.setData({tags});
    }
  },
  methods: {
    onImgLoad: function(event){
      const {width, height} = event.detail;
      this.setData({
        w: 340,
        h: height*340/width
      })
    },
    onItemTap: function(event){
      const {pid} = event.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      })
    }
  }
});
