<template>
	<div class="all-data-box">
    <h3>微集分余量 {{toMoney(calculus_totals)}}</h3>
    <!--新增-->
    <div>
      <h4>新增总量　　{{toMoney(add_value)}}</h4>
      <el-row :model="formDate">
        <el-col :span="8">
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
        <el-col :span="14">
          <div class="multi">
            <span class="demonstration">来源</span>
            <el-select v-model="formDate.formInline.resourceAdd" clearable placeholder="全部">
              <el-option label="优众" value="1"></el-option>
              <el-option label="大富翁" value="2"></el-option>
              <el-option label="重宝奇兵" value="3"></el-option>
            </el-select>
          </div>
          <div class="multi end-multi">
            <span class="demonstration">行为</span>
            <el-select v-model="formDate.formInline.actionAdd" clearable placeholder="全部">
              <el-option label="兑换能量" value="1"></el-option>
              <el-option label="购买优惠卷" value="2"></el-option>
              <el-option label="购买商品" value="3"></el-option>
              <el-option label="退货" value="4"></el-option>
              <el-option label="过期清除" value="5"></el-option>
              <el-option label="补差价" value="6"></el-option>
              <el-option label="兑换商品" value="7"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" class="search" @click="onSearchAdd(1)">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="add_totals"
        height="300"
        border
        v-loading="listLoading"
        style="width: 100%">
        <el-table-column
          prop="channel"
          label="来源"
          width="220"
        >
          <template scope="scope">
            <span v-if="scope.row.channel == 1">优众</span>
            <span v-else-if="scope.row.channel == 2">大富翁</span>
            <span v-else-if="scope.row.channel == 3">重宝奇兵</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="行为"
          width="220">
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
          prop="changeAmount"
          label="数量">
          <template scope="scope">
            <p>{{ toMoney(scope.row.changeAmount) }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--消耗-->
    <div>
      <p style="margin-top: 30px; border:1px solid cornflowerblue"></p>
      <h4>消耗总量  {{toMoney(del_value)}}</h4>
      <el-row v-model="formDate">
        <el-col :span="8">
          <div class="block">
            <span class="demonstration">选择日期</span>
            <el-date-picker
              v-model="formDate.value2"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="formDate.pickerOptions2">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="multi">
            <span class="demonstration">来源</span>
            <el-select v-model="formDate.formInline.resourceDel" clearable placeholder="全部">
              <el-option label="优众" value="1"></el-option>
              <el-option label="大富翁" value="2"></el-option>
              <el-option label="重宝奇兵" value="3"></el-option>
            </el-select>
          </div>
          <div class="multi end-multi">
            <span class="demonstration">行为</span>
            <el-select v-model="formDate.formInline.actionDel" clearable placeholder="全部">
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
          <el-button type="primary" class="search" @click="onSearchAdd(0)">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="del_totals"
        height="300"
        border
        style="width: 100%">
        <el-table-column
          prop="channel"
          label="来源"
          width="180">
          <template scope="scope">
            <span v-if="scope.row.channel == 1">优众</span>
            <span v-else-if="scope.row.channel == 2">大富翁</span>
            <span v-else-if="scope.row.channel == 3">重宝奇兵</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="行为"
          width="180">
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
          prop="changeAmount"
          label="数量">
          <template scope="scope">
            <p>{{ toMoney(scope.row.changeAmount) }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
        calculus_totals: 0,
        add_totals:[],
        add_value: 0,
        del_value: 0,
        del_totals:[],
        add_num: 1,
        listLoading: false,
        formDate: {
          formInline: {
            resourceAdd: '',
            actionAdd: '',
            resourceDel: '',
            actionDel: ''
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
          value2: '',
        },
        resource: '',
        value4: '',
        action: '',
      }
		},
		components: {
		},
		methods: {
      onSearchAdd(isValue){
        this.getUsersAdd(isValue);
      },
//      新增记录
      getUsersAdd(param){
        let para = {
          startTime: this.formDate.value1[0] ? this.format(this.formDate.value1[0]): '',
          endTime: this.formDate.value1[1] ? this.format(this.formDate.value1[1]): '',
          channel: param ? this.formDate.formInline.resourceAdd : this.formDate.formInline.resourceDel,
          type: param ? this.formDate.formInline.actionAdd : this.formDate.formInline.actionDel,
          changeType: param  ? 1 : 2
        };
        this.listLoading = true;
        this.postUser(para);
      },
      postUser(data){
        var _this = this;
        this.asyncHttp('post', '/drp-management-web/account/aggregateData',data, function (res) {
          if(data.changeType == 1){
            _this.add_value = res.execData.totalAmount;
            _this.totalnum = res.execData.totalNum;
            _this.add_totals = res.execDatas;
          }else{
            _this.del_value = res.execData.totalAmount;
            _this.totalnum = res.execData.totalNum;
            _this.del_totals = res.execDatas;
          }
          _this.listLoading = false;
        }, true);
      }
		},
		mounted() {
      var _this=this;
      this.asyncHttp('post', '/drp-management-web/account/queryCalculus',{}, function (res) {
        _this.calculus_totals = res.execData;
      }, true);
      this.postUser({changeType:1});
      this.postUser({changeType:2});
		}
	}
</script>

<style lang="scss" scoped>
  h3,h4{
    border-bottom: 1px solid #bfcbd9;
    height: 40px;
    line-height: 40px;
    font-weight: inherit;
  }
  h4{
    margin: 10px auto 5px auto;
    padding-left: 10px;
  }
  .all-data-box{
    margin: 20px auto;
  }
  .block,.multi{
    display: inline-block;
  }
  .end-multi{
    margin-left: 20px;
  }
  .el-row{
    padding: 10px 0;
  }
.el-table{
    margin-top: 5px;
  }
</style>
