Component({
  properties: {
    cell: Object,
    x: Number,
    y: Number,
  },
  data: {},
  methods: {
    onTap(){
      this.triggerEvent('celltap', {
        // 子组件 -> 父组件
        cell: this.properties.cell,
        x: this.properties.x,
        y: this.properties.y
      }, {
        // 事件冒泡 使更外层的组件捕获响应
        bubbles: true,
        composed: true,
      })
    }
  }
});
