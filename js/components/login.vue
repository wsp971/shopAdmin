<style>
    .loginContainer{
        width: 320px;
        height: 280px;
        margin: auto;
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
    }

    .loginInput,.loginSubmit{
        margin:10px 0;
    }

</style>
<template>
    <Card class="loginContainer">
        <div style="text-align:center">
            <h3>登录管理系统</h3>
            <div>
                <Input placeholder="请输入用户名"  :clearable="true" size ='large' class="loginInput" v-model="inputUserName" >
                    <Icon type="ios-contact" slot="prefix" />v-
                </Input>

                <Input placeholder="请输入密码" type ='password' :clearable="true" size="large" class="loginInput" v-model="inputPassword">
                    <Icon type="ios-lock" slot="prefix" />
                </Input>
                <Alert type="error" show-icon v-show="errTip" >{{errTip}}</Alert>
                <Button type="success" long class="loginSubmit" @click.stop="tologin">登录</Button>
            </div>
        </div>
    </Card>
</template>
<script>
    import md5 from 'js-md5';
    import {Card,Input,Alert,Button,Icon} from 'iview';
    export default {
    	data(){
    		return {
    			inputUserName:'',
                inputPassword:'',
                errTip:'',
            }
        },
        components:{
	        Card,Input,Alert,Button,Icon
        },
        methods:{
	        tologin(){
                if(!this.inputUserName){
                	this.errTip = '请输入要登陆的用户名！';
                	return;
                }
                if(!this.inputPassword){
                	this.errTip = '请输入登录密码！';
                	return;
                }
                this.errTip = '';
                let postData = {
                	username: this.inputUserName,
                    password: md5(this.inputPassword),
                };
                this.$ajax.get({
                    url:`/adminuser/login`,
                    data:postData
                }).then(res=>{
                	if(res.data.code ==0){
		                this.$Message.success('登录成功！');
		                this.$linkPage('/html/shopList.html')
		                console.log(document.cookie);
	                }else{
                		this.$Message.error('登录失败');
                    }
                }).catch(e=>{
                	this.$Message.error('登录失败！');
                });
            },

            toRegister(){
	            this.$ajax.get({
		            url:`/adminuser/register`,
		            data:{
			            name:'李晶',
			            username:'lijing',
			            password:md5('lijing')
		            }

	            }).then(res=>{
	            	if(res.code ==0){

                    }
		            this.$Message.success('插入用户成功！');
	            }).catch(e=>{
		            this.$Message.error('注册失败！');
	            });
            }
        }


    }

</script>