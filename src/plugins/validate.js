// vee-validate 表单验证区域
import Vue from 'vue';
import VeeValidate from 'vee-validate';
// 中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证    
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: {
        phone: "手机号",
        code: "验证码",
        password: "密码",
        password1: "确认密码",
        agree: '协议'
    },
});

// 使用
/* 
<input
    placeholder="请输入你的手机号"
    v-model="phone"
    name="phone"
    v-validate="{ required: true, regex: /^1\d{10}$/ }"
          : class="{ invalid: errors.has('phone') }"
/>
<span class="error-msg">{{ errors.first("phone") }}</span>
*/

//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});

// 表示所有验证成功
// const success = await this.$validator.validateAll();
