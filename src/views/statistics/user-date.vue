<template>
	<div class="user-date">
    <el-form :inline="true" :model="formDate" class="demo-form-inline">
      <el-form-item>
        <div>用户总量:{{toMoney(countUsers)}}</div>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker v-model="formDate.value7" type="daterange" align="right" placeholder="选择日期范围" format :picker-options="formDate.pickerOptions2"></el-date-picker>
      </el-form-item>
      <el-form-item label="输入查询">
        <el-input v-model="formDate.Name" placeholder="微集分账户"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="user_date" border style="width: 100%" v-loading="listLoading" class="user-detail-table">
      <el-table-column prop="calculusId" label="微集分ID" width="150"></el-table-column>
      <el-table-column prop="loginName" label="微集分账户" width="150"></el-table-column>
      <el-table-column prop="nickName" label="用户名" width="150"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="ihaveuAccount" label="优众账号" width="150"></el-table-column>
      <el-table-column prop="cardAccount" label="重宝奇兵账号" width="150"></el-table-column>
      <el-table-column prop="accountBalance" label="账户余额" width="150">
        <template scope="scope">
          <span>{{toMoney(scope.row.accountBalance)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.userId,scope.row.loginName)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="user_length" style="float:right;">
      </el-pagination>
    </el-col>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        formDate: {
          Name:'',
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
          value7: ''
        },
        user_date:[],
        countUsers: 0,
        user_length:0,
        listLoading: false,
        page: 1,
        pageSize:15
      }
    },
    components: {
    },
    methods: {
      onSubmit() {
        this.getUsers();
      },
      handleEdit: function (userid,username) {
        this.$router.push({path: '/user_detail',query: {userid: userid,username: username} });
      },
      handleCurrentChange: function(val) {
        this.page = val;
        this.getUsers();
      },
      getUsers() {
        let para = {
          pageNo: this.page,
          pageSize: this.pageSize,
          loginName: this.formDate.Name,
          startTime: this.formDate.value7[0] ? this.format(this.formDate.value7[0]) : '' ,
          endTime: this.formDate.value7[1] ? this.format(this.formDate.value7[1]) : ''
        };
        this.listLoading = true;
        var _this = this;
        this.asyncHttp('post', '/drp-management-web/account/queryUserListInfo',para, function (res) {
          _this.user_date = res.execDatas;
          _this.countUsers = res.execData.countUsers;
          _this.user_length = res.execData.countNum;
          _this.listLoading = false;
        },true);
      }
    },
    mounted() {
      this.getUsers();
    }
  }

</script>
<style scoped lang="scss">
  .user-date{
    margin-top:20px;
  }
</style>
