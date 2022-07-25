<template>
  <div class="register-container">
    <div class="foramTable">
      <h3 class="" style="margin-left:45px;">
        注册新用户
        <span class="go" 
          >我有账号，去 <a href="login.html" target="_blank" style="color:red">登陆</a>
        </span>
      </h3> 
    <!-- 注册内容 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top:10px;"
    >
      
      <el-form-item label="手机号:" prop="phone" class="content" size="small">
        <el-input
          v-model="ruleForm.phone"
          placeholder="请输入你的手机号"
        ></el-input>
      </el-form-item>
        
      <el-form-item label="验证码:" prop="code" size="small">
        <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
        <el-button @click="getCode"> 发送验证码</el-button>
      </el-form-item>
       
      <el-form-item label="密码:" prop="password" size="small">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          width="50px"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="password1" size="small">
        <el-input
          v-model="ruleForm.password1"
          placeholder="请输确认密码"
          width="50px"
        ></el-input>
      </el-form-item>
      
      <div class="controls">     
      <el-form-item label="" prop="agree">
          <el-checkbox-group v-model="ruleForm.agree">
            <el-checkbox label="同意协议并注册《尚品汇用户协议》" name="agree" ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
        <el-button @click="userRegister" style="margin-left:100px;margin-top: -15px;" type="danger">完成注册</el-button>    
    </el-form>
    </div>
    <!-- 底部 -->
    <div class="copyright">
          <!-- <label>手机号:</label>
          <input type="text" placeholder="请输入你的手机号" v-model="phone" /> -->
      <!-- <span class="error-msg">错误提示信息</span> -->
      <!-- <label>验证码:</label>
          <input type="text" placeholder="请输入验证码" v-model="ruleForm.code" /> -->
      <!-- <button style="width: 70px; height: 38px" @click="getCode">
            发送验证码
          </button> -->
             <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->
      <!-- <span class="error-msg">错误提示信息</span> -->
      <!-- <label>登录密码:</label>
          <input
            type="password"
            placeholder="请输入你的登录密码"
            v-model="ruleForm.password"
          />
          <span class="error-msg">错误提示信息</span> -->
          <!-- <label>确认密码:</label>
          <input
            type="password"
            placeholder="请输入确认密码"
            v-model="ruleForm.password1"
          />
          <span class="error-msg">错误提示信息</span> -->
           <!-- <input name="m1" type="checkbox" :checked="ruleForm.agree" />
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">错误提示信息</span> -->
          <!-- <button @click="userRegister">完成注册</button> -->
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Register",
  data() {
    //对密码进行验证  
    //  let patrn=/^[0-9A-Za-z]{8,20}$/;
    //  let valPhone = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
     //对手机进行验证
    // var validatePhone = (rule, value, callback) => {
    //     if (value === '' ) {
    //       callback(new Error('请输入手机号'));
    //     }else if( value !=valPhone){
    //       callback(new Error('您输入的格式不对，请重新输入请输入手机号'));
    //     }else{
    //        this.$refs.ruleForm.validateField('phone');
    //     }
    //   };
     var validatePass = (rule, value, callback) => {
        if (value === '' ) {
          callback(new Error('请输入密码'));
        }
        // else if( value !=patrn){
        //   callback(new Error('您输入的格式不对，请重新输入请输入密码'));
        // }
        else {
          if (this.ruleForm.password1 !== '') {
            this.$refs.ruleForm.validateField('password1');
          }
          callback();
        }
      };
      //确认密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      
      ruleForm: {
        phone: "",
        code: "",
        password: "",
        password1: "",
        //同意协议
        agree: true,
      },
      rules: {
        phone: [
          { min: 11, max: 11,message:'格式不对请重新输入',  trigger: "blur" },
        ],
        code: [
          { min: 6, max: 6, message: "长度为6个字符", trigger: "blur" },
        ],
        password: { validator: validatePass, trigger: 'blur' },
        password1: [
          { min: 8, max: 20, validator: validatePass2, trigger: "blur" },
        ],
        agree: [
            {  required: true, message: '务必勾选', trigger: 'change' }
          ],
      },
    };
  },
  methods: {
    //获取验证码
    async getCode() {
      try {
        let { phone } = this.ruleForm;
       phone && (await this.$store.dispatch("getCode",phone));
        this.ruleForm.code = this.$store.state.user.code;
      } catch (error) {
        alert("输入错误");
      }
    },
    //用户注册跳转
    async userRegister() {
      // try {
      //   const { phone, code, password, password1 } = this.ruleForm;
      //   phone &&code &&password == password1 &&(await this.$store.dispatch("userRegister", {
      //       phone,
      //       code,
      //       password,
      //     }));
      //   this.$router.push("/login");
      // } catch (error) {
      //   alert("注册失败");
      // }
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$router.push("/login");
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
    width: 270px;
  }
  .foramTable{
    margin-left:670px;
    width:500px;
    height:330px;
  }
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>