// components/Dialog/dialog.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    // content: {
    //   type: String,
    //   value: '弹窗内容'
    // },
    // 弹窗取消按钮文字
    // cancelText: {
    //   type: String,
    //   value: '取消'
    // },
    // 弹窗确认按钮文字
    // confirmText: {
    //   type: String,
    //   value: '确定'
    // }
  },
  data: {
    // 弹窗显示控制
    isShow: false
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    preventTouchMove: function () { },
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      });
      this.triggerEvent("closeEvent");
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      });
    },
  }
})