export default {
  data(){
    return {
      timer: ''  //toast定时器
    }
  },
  install: function (Vue, options) {

    /*数组格式化*/
    Vue.prototype.toMoney = function (num){
      num = new Number(num);
      if(isNaN(num)){
        num = 0;
      }
      if (num == ''){
        num = 0;
      }
      num = num.toFixed(2);
      num = parseFloat(num)
      num = num.toLocaleString();
      return num;
    }

    /*请求封装*/
    Vue.prototype.asyncHttp = function (method, url, params, success, error) {
      this.$http({
        method: method,
        url: url,
        params: params
      }).then(function (res) {

        var data = res.body;
        data = typeof data == 'string' ? JSON.parse(data) : data;
        if (data.execErrCode == 200) {
          success(data);
        } else {
          this.logining = false;
          this.listLoading = false;
          this.$message({
            showClose: true,
            message: data.execMsg,
            type: 'error'
          })
        }
      }, function () {
        if (error) {
          this.logining = false;
          this.listLoading = false;
          this.$message({
            showClose: true,
            message: '请求处理失败',
            type: 'error'
          })
        }
      })
    }

    /*时间格式转转换*/
    Vue.prototype.format = function (str) {
      var date=str,
        t = {
          y: date.getFullYear(),
          M: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
          d: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
          h: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
          m: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        }
      return t.y + '-' + t.M + '-' + t.d
    }
  }
}
