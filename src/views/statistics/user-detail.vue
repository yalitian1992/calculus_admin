<template>
	<div class="user-detial">
    <el-row class="userD-header">
      <el-col :span="12" class="border-color">
        <div>用户信息:{{userNews.loginName}}</div>
        <div class="user-header">
          <div class="user-header-left">
            <img :src="headUrl" alt="" >
          </div>
          <div class="header-right">
            <p>账户余额:{{toMoney(userNews.accountBalance)}}</p>
            <p>ID:{{userNews.userId}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div>绑定账户</div>
        <p v-if="userNews.ihaveuAccount">优众网:{{userNews.ihaveuAccount}}</p>
        <p v-if="userNews.cardAccount">重宝骑兵:{{userNews.cardAccount}}</p>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="formDate" class="demo-form-inline">
      <el-form-item label="选择日期">
        <el-date-picker v-model="formDate.value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="formDate.pickerOptions2"></el-date-picker>
      </el-form-item>
      <el-form-item label="微集分增减">
        <el-select v-model="formDate.changeType" clearable placeholder="全部">
          <el-option label="新增" value="1"></el-option>
          <el-option label="消耗" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="来源">
        <el-select v-model="formDate.channel" clearable placeholder="全部">
          <el-option label="优众网" value="1"></el-option>
          <el-option label="大富翁" value="2"></el-option>
          <el-option label="重宝奇兵" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行为">
        <el-select v-model="formDate.type" clearable placeholder="全部">
          <el-option label="兑换能量" value="1"></el-option>
          <el-option label="购买优惠卷" value="2"></el-option>
          <el-option label="购买商品" value="3"></el-option>
          <el-option label="退货" value="4"></el-option>
          <el-option label="过期清除" value="5"></el-option>
          <el-option label="补差价" value="6"></el-option>
          <el-option label="兑换商品" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="4" class="color-red">
        新增总量:{{toMoney(appendAmount)}}
      </el-col>
      <el-col :span="4" class="color-green">
        消耗总量:{{toMoney(reduceAmount)}}
      </el-col>
    </el-row>
    <el-table :data="user_date" border style="width: 100%" v-loading="listLoading" class="user-detail-table">
      <el-table-column prop="createTime" label="时间" width="200"></el-table-column>
      <el-table-column label="来源" width="180">
        <template scope="scope">
          <span v-if="scope.row.channel == 1">优众</span>
          <span v-else-if="scope.row.channel == 2">大富翁</span>
          <span v-else-if="scope.row.channel == 3">重宝奇兵</span>
          <span v-else>暂无来源</span>
        </template>
      </el-table-column>
      <el-table-column prop="thirdAccount" label="来源账号" width="180"></el-table-column>
      <el-table-column prop="type" label="行为" width="180">
        <template scope="scope">
          <span v-if="scope.row.type == 1">兑换能量</span>
          <span v-else-if="scope.row.type == 2">购买优惠卷</span>
          <span v-else-if="scope.row.type == 3">购买商品</span>
          <span v-else-if="scope.row.type == 4">退货</span>
          <span v-else-if="scope.row.type == 5">过期清除</span>
          <span v-else-if="scope.row.type == 6">补差价</span>
          <span v-else-if="scope.row.type == 7">兑换商品</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="微集分数" width="180">
        <template scope="scope">
          <span v-if="scope.row.changeType == 1" class="color-red" >{{toMoney(scope.row.changeAmount)}}</span>
          <span v-else-if="scope.row.changeType == 2" class="color-green">{{toMoney(scope.row.changeAmount)}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="账户余额">
        <template scope="scope">
          <span>{{toMoney(scope.row.accountBalance)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="user_length" style="float:right;">
      </el-pagination>
    </el-col>
    <el-col :span="24">
      <a :href="user_date.length==0 ? 'javascript:void(0)' : 'http://10.0.1.87:8770/drp-management-web/account/exportExcelByUserAccountLog?'+this.paradate">
        <el-button type="primary"  style="float: right" >导出excel</el-button>
      </a>
    </el-col>
	</div>
</template>


<script>
	export default {
		data() {
			return {
        formDate: {
          channel: '',
          type: '',
          changeType:'',
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value6: '',
          value7: ''
        },
        userNews:[],
        user_date:[],
        user_length:0,
        listLoading: false,
        page: 1,
        pageSize:15,
        appendAmount: '',
        reduceAmount: '',
        headUrl:'',
        img: require('../../images/header.png'),
        paradate:''
      }
		},
		components: {
		},
		methods: {
      onSubmit() {
        this.getUsers()
      },
      handleCurrentChange: function(val) {
        this.page = val;
        this.getUsers();
      },
      getUsers() {
        let para = {
          userId: this.$route.query.userid,
          pageNo: this.page,
          pageSize: this.pageSize,
          channel: this.formDate.channel,
          type: this.formDate.type,
          changeType:this.formDate.changeType,
          startTime: this.formDate.value7[0] ? this.format(this.formDate.value7[0]) : '' ,
          endTime: this.formDate.value7[1] ? this.format(this.formDate.value7[1]) : ''
        };
        this.paradate = JSON.stringify(para);
        this.paradate = this.paradate.replace(/:/g, "=").replace(/,/g, "&").replace(/"/g, "").replace(/{/g, "").replace(/}/g, "");
        this.listLoading = true;
        var _this = this;
        this.asyncHttp('post', '/drp-management-web/account/queryUserInfoById',para, function (res) {
          _this.user_date = res.execData.accountLogModel;
          _this.appendAmount = res.execData.appendAmount;
          _this.reduceAmount = res.execData.reduceAmount;
          _this.user_length = res.execData.countNum;
          _this.listLoading = false;
        }, true);
      }
		},
		mounted() {
      var _this = this;
      this.asyncHttp('post', '/drp-management-web/account/queryUserListInfo',{loginName: this.$route.query.username}, function (res) {
        _this.userNews = res.execDatas[0];
        _this.userNews.headUrl ? _this.headUrl = _this.userNews.headUrl : _this.headUrl = _this.img;
      }, true);
      _this.getUsers();
		}
	}
</script>
<style scoped lang="scss">

  .user-detial{
    width: 100%;
    overflow: hidden;
    .userD-header{
      border:1px solid #97a8be;
      margin:20px 0;
      .border-color{
        border-right: 1px solid #97a8be;
      }
      .el-col{
        padding:20px;
      }
      .user-header{
        margin-top:20px;
        div{
          display: inline-block;
          vertical-align: middle;
        }
        .user-header-left{
          width:80px;
          height:80px;
          overflow: hidden;
          border-radius:50%;
          border:2px solid #97a8be;
          margin-right:30px;
          img{
            width:100%;
          }
        }
      }
    }
    .user-detail-table{
      margin-top:20px;
      .el-table_1_column_5.is-leaf>cell{
        text-align: center;
      }
    }
  }
  .color-red{
    color: #ff0000;
    font-weight: bold;
  }
  .color-green{
    color: #008000;
    font-weight: bold;
  }
</style>
