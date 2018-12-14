<template>
  <div>
    <headers :Checked="Checked"></headers>
    <div class="set-box">
      <!--基础设定-->
      <div class="basic-set-box">
        <h3>基础设定</h3>
        <div class="basic-data bg-purple-light">
          <el-row>
            <el-col :span="4"><div class="grid-content">微集分对应人民币比例</div></el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span v-model="basic_totals.id"></span>
                <label for=""><input class="proportion" type="text" v-model="basic_totals.proportion">：1</label>
              </div>
            </el-col>
            <el-col :span="14"><div class="grid-content">（微集分消耗时价值比例）</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content">微集分有效期</div></el-col>
            <el-col :span="6">
              <div class="grid-content">
                <label for=""><input class="validityTime" type="text" v-model="basic_totals.validityTime">&nbsp&nbsp年</label>
              </div>
            </el-col>
            <el-col :span="14"><div class="grid-content">（用户每次获取的微集分，都拥有有效期限，到期失效消失）</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content">账号未登录锁定</div></el-col>
            <el-col :span="6">
              <div class="grid-content">
                <label for=""><input class="lockLogin" type="text" v-model="basic_totals.lockLogin">&nbsp&nbsp年</label>
              </div>
            </el-col>
            <el-col :span="14"><div class="grid-content">（账号一定时间不登录，则暂时锁定）</div></el-col>
          </el-row>
          <el-button type="primary" @click="Save(basic_totals.id,basic_totals.proportion,basic_totals.validityTime,basic_totals.lockLogin)">保存设置</el-button>
        </div>
      </div>
      <!--渠道设定-->
      <!--<div class="channel-box">
        <h3>渠道设定</h3>
        <div class="basic-data bg-purple-light">
          <el-row>
            <el-col :span="4"><div class="grid-content">优众网反馈积分比例</div></el-col>
            <el-col :span="6">
              <div class="grid-content">
                <label for=""><input class="channel-txt" type="text" :disabled="disable">：1</label>
              </div>
            </el-col>
            <el-col :span="7"><div class="grid-content">（对应网站反馈积分比例）</div></el-col>
            <el-col :span="7">
              <el-button class="on"  @click = "disable = false">开启</el-button>
              <el-button class="off" @click = "disable = true">关闭</el-button>
            </el-col>
          </el-row>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import headers from '../../components/header'
  export default {
    data() {
      return {
        disable: false,
        Checked: true,
        basic_totals: {
          proportion: '',
          validityTime: '',
          lockLogin: '',
          id: 7764
        },
      };
    },
    components: {
      headers
    },
    methods: {
//      保存成功提示框
      Alert: function(){
        this.$alert('保存成功！', '消息', {
          confirmButtonText: '确定',
        });
      },
//      保存设置
      Save: function(id,roportion,validitytime,locklogin){
        let para = {
          proportion: roportion,
          validityTime: validitytime,
          lockLogin: locklogin,
          id: id
        }
        var _this=this;
        this.asyncHttp('post', 'drp-management-web/account/updatBasicSetting',para, function (res) {
          _this.Alert();
        }, true);
      }
    },
    mounted(){
//      this.Save();
      var _this=this;
      this.asyncHttp('post', 'drp-management-web/account/querySetting',{}, function (res) {
        if(res){
          _this.basic_totals = res.execData;
        }
      }, true);
    }
  }
</script>

<style lang="scss" scoped>
  .set-box{
    margin: 60px 30px 0;
    overflow: hidden;
  }
  .basic-set-box .el-button{
    display: block;
    margin: 0 auto;
  }
  .basic-data{
    padding: 10px;
  }
  input{
    width: 50px;
    text-align: center;
  }




  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
    line-height: 250%;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
