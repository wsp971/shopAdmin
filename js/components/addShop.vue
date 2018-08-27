<style scoped>
    .form{
        width: 800px;
        margin:auto;
        border: 1px dashed #ccc;
        font-size: 14px;
    }
    .formGroup{
        margin: 10px 0;
    }
    .formGroup label{
        text-align: right;
        line-height: 40px;
    }
</style>

<template>
    <my-layout current-menu="addShop">
        <template slot="breadCrumb">
            <Breadcrumb :style="{margin: '24px 0'}" >
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>增加店铺</BreadcrumbItem>
            </Breadcrumb>
        </template>
        <template slot="content">
            <Content :style="{padding: '24px', minHeight: '200px', background: '#fff'}" slot="content">
                <form class="form">
                    <div class="formGroup">
                        <Row>
                            <Col span="16" offset="4"><Alert type="error" show-icon v-show="errTip" >{{errTip}}</Alert></Col>
                        </Row>

                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >店铺名称：</label></Col>
                            <Col span="13"><Input v-model="shopName" placeholder="请输入店铺名称" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >logo：</label></Col>
                            <Col span="13"><Input v-model="logo" placeholder="请输入logo地址" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >联系人/法人：</label></Col>
                            <Col span="13"><Input v-model="contacts" placeholder="请输入联系人" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >联系电话：</label></Col>
                            <Col span="13"><Input v-model="phone" placeholder="请输入联系电话" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >地址：</label></Col>
                            <Col span="13"><Input v-model="address" placeholder="请输入地址" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="4" offset="8">
                            <Button type="info" icon="md-checkmark" @click.stop="createShop">{{this.isModify? '修改店铺': '创建店铺'}}</Button>
                            </Col>
                            <Col span="4"><Button type="error"  icon="md-close" @click.stop="cancel">取消</Button></Col>
                        </Row>
                    </div>


                </form>


            </Content>
        </template>
    </my-layout>
</template>


<script>
	import myLayout from './Layout';
	import ajax from '../utils/ajax';
	import { Button, Icon ,Breadcrumb,BreadcrumbItem,MenuItem,Content,Row,Col,Alert,Input} from 'iview';
	export default {
		data(){
			let StorageShop = JSON.parse(sessionStorage.getItem('modifyShopData'));
            sessionStorage.removeItem('modifyShopData');
			if(StorageShop){
				return {
					errTip:'',
					shopName:StorageShop.name,
					contacts:StorageShop.contacts,
                    logo: StorageShop.logo,
					phone:StorageShop.phone,
					address:StorageShop.address,
                    modifyShop:StorageShop
                }
            }

			return {
				errTip:'',
                shopName:'',
                contacts:'',
                phone:'',
                address:'',
                logo:'//img11.360buyimg.com/jdphoto/s120x122_jfs/t5683/191/7076936752/5123/834e5571/596dd62bN7a8affc5.png'
            }
        },

		components:{
			myLayout, Icon, Button ,Breadcrumb,BreadcrumbItem,Content,Row,Col,Alert,Input
		},
        computed:{
		    isModify: function(){
			    return this.modifyShop? true: false
            }
        },
        methods:{
	        createShop(){
                this.errTip = '';

	        	if(!this.shopName){
	        		this.errTip = '请输入店铺名称！';
	        		return;
                }

                if(!this.contacts){
	        		this.errTip = '请输入联系人';
	        		return;
                }

                if(!this.phone || !/[\d-]{7,11}/.test(this.phone)){
	        		this.errTip = '请输入正确的电话号码';
	        		return;
                }

                if(!this.address){
	        		this.errTip = '请输入地址';
	        		return;
                }

                let shopData = {
                    name:this.shopName,
                    phone: this.phone,
                    address: this.address,
                    favourite:0,
                    logo: this.logo,
	                contacts: this.contacts
                };
                if(this.modifyShop){
                	shopData = Object.assign({},this.modifyShop,shopData);
                	ajax.get({
                        url:'/shop/update',
                        data: shopData
                    }).then(res=>{
                    	if(res.data.code ==0){
		                    this.$Message.success('修改成功！');
		                    setTimeout(()=>{
			                    this.$linkPage('/html/shopList.html');

			                    // location.href = '/html/shopList.html'
		                    },1000);
                        }else{
                    		this.$Message.error('修改失败');
                        }
                    });
                    return;
                }
                ajax.get({
                    url:'/shop/insert',
                    data:shopData
                }).then( res=>{
                	if(res.data.code ==0){
		                this.$Message.success('创建成功！');
		                setTimeout(()=>{
		                	this.$linkPage('/html/shopList.html');
			                // location.href = '/html/shopList.html'
		                },1000);
                    }else{
		                this.$Message.error('创建失败');
	                }

                }).catch(e=>{
                    this.$Message.error('创建失败');
                });
            },
	        cancel(){
		        this.$linkPage('/html/shopList.html');
            }
        }
    }


</script>