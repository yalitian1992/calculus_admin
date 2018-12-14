<template>
	<el-row class="headerNav">
		<el-col :span="24" class="header">
			<el-col :span="20" class="header-btn">
				<router-link to="/basicSet">
          <el-button v-if="!Checked" type="info">基础设定</el-button><el-button v-if="Checked" >基础设定</el-button>
        </router-link>
				<router-link to="/Interated">
          <el-button v-if="!Checked">数据统计</el-button><el-button v-if="Checked" type="info" >数据统计</el-button>
        </router-link>
			</el-col>
			<el-col :span="4" class="userinfo">
				<span class="el-dropdown-link userinfo-inner">{{sysUserName}}　|</span>
				<el-button class="login-color" @click.native="logout">注销</el-button>
			</el-col>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
        sysUserName: ''
			}
		},
    props: {
      'Checked': {
        type: Boolean,
        default: true
      }
    },
		methods: {
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
      route: function () {
        return this.$route.path
      }
		},
		mounted() {
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }
		}
	}

</script>

<style scoped lang="scss">
	@import '../styles/vars';

	.headerNav {
		position: absolute;
		top: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.header-btn{
				text-align:center;
			}
      .header-btn button{
        margin:0 10px;
      }
			.login-color{
				background:none;
				border:none;
				color:#fff;
			}
			.login-color:hover{
				color:#ccc;
			}
			.userinfo{
				text-align:center;
			}
		}
	}
</style>
