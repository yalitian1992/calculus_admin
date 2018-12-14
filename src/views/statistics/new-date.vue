<template>
	<div>
    <el-row :model="formDate">
      <el-col :span="4"><p class="add-txt">新增总量：{{toMoney(add_value)}}</p></el-col>
      <el-col :span="6">
        <div class="block">
          <span class="demonstration">选择日期</span>
          <el-date-picker
            v-model="formDate.value1"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="formDate.pickerOptions2">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="multi">
          <span class="demonstration">来源</span>
          <el-select v-model="formDate.formInline.resource" clearable placeholder="全部">
            <el-option label="优众" value="1"></el-option>
            <el-option label="大富翁" value="2"></el-option>
            <el-option label="重宝奇兵" value="3"></el-option>
          </el-select>
        </div>
        <div class="multi end-multi">
          <span class="demonstration">行为</span>
          <el-select v-model="formDate.formInline.action" clearable placeholder="全部">
            <el-option label="兑换能量" value="1"></el-option>
            <el-option label="购买优惠卷" value="2"></el-option>
            <el-option label="购买商品" value="3"></el-option>
            <el-option label="退货" value="4"></el-option>
            <el-option label="过期清除" value="5"></el-option>
            <el-option label="补差价" value="4"></el-option>
            <el-option label="兑换商品" value="5"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" class="search" @click="onSubmit">查询</el-button>
      </el-col>
    </el-row>
    <!--table表-->
    <el-table
      :data="add_totals"
      style="width: 100%"
      border
      v-loading="listLoading"
      class="user-detail-table">
      <el-table-column
        prop="id"
        label="微集分ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="微集分账户"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="来源"
        width="150">
        <template scope="scope">
          <span v-if="scope.row.channel == 1">优众</span>
          <span v-else-if="scope.row.channel == 2">大富翁</span>
          <span v-else-if="scope.row.channel == 3">重宝奇兵</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="thirdAccount"
        label="来源账号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="type"
        label="行为"
        width="150">
        <template scope="scope">
          <span v-if="scope.row.type == 1">兑换能量</span>
          <span v-else-if="scope.row.type == 2">购买优惠卷</span>
          <span v-else-if="scope.row.type == 3">购买商品</span>
          <span v-else-if="scope.row.type == 4">退货</span>
          <span v-else-if="scope.row.type == 5">过期清除</span>
          <span v-else-if="scope.row.type == 6">补差价</span>
          <span v-else-if="scope.row.type == 7">兑换商品</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userId"
        label="订单号"
        width="170">
      </el-table-column>
      <el-table-column
        prop="accountBalance"
        label="订单金额（￥）"
        width="150">
        <template scope="scope">
          <p>{{toMoney(scope.row.accountBalance)}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="changeAmount"
        label="微集分数"
        width="150">
        <template scope="scope">
          <p>{{toMoney(scope.row.changeAmount)}}</p>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="totalnum" style="float:right;">
      </el-pagination>
    </el-col>
    <el-col :span="24">
      <a :href="add_totals.length == 0 ? 'javascript:void(0)' : 'http://10.0.1.87:8770/drp-management-web/account/exportExcelByAccountLog?'+this.paradate">
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
          formInline: {
            resource: '',
            action: ''
          },
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
          value1: '',
        },
        value3: '',
        value4: '',
        add_value: 0,
        add_totals: [],
        totalnum: 0,             //总数
        listLoading: false,
        changeType: 1,
        page: 1,
        pageSize: 15,
        resource: '',
        paradate:''
			}
		},
		components: {
		},
		methods: {
//		  查询
      onSubmit(){
        this.getUsers();
      },
//      分页
      handleCurrentChange: function(val) {
        this.page = val;
        this.getUsers();
      },
      getUsers() {
        let para = {
          changeType: this.changeType,
          pageNo: this.page,
          pageSize: this.pageSize,
          startTime: this.formDate.value1[0] ? this.format(this.formDate.value1[0]): '',
          endTime: this.formDate.value1[1] ? this.format(this.formDate.value1[1]): '',
          channel: this.formDate.formInline.resource,
          type: this.formDate.formInline.action
        };
        this.paradate = JSON.stringify(para);
        this.paradate = this.paradate.replace(/:/g, "=").replace(/,/g, "&").replace(/"/g, "").replace(/{/g, "").replace(/}/g, "");
        this.listLoading = true;
        var _this = this;
        this.asyncHttp('post', '/drp-management-web/account/queryAppendAccountRecord',para, function (res) {
          _this.add_value = res.execData.totalAmount;
          _this.totalnum = res.execData.totalNum;
          _this.add_totals = res.execDatas;
          _this.listLoading = false;
        }, true);
      },
    },
		mounted() {
		  this.getUsers();
		}
	}
</script>
<style lang="scss" scoped>
  .el-row{
    border-bottom: 1px solid #bfcbd9;
    padding: 30px 0 20px 0;
  }
  .block,.multi{
    display: inline-block;
  }
  .end-multi{
    margin-left: 20px;
  }
  .add-txt{
    height: 100%;
    line-height: 50%;
  }
</style>
