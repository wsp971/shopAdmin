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
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .hidden{
        visibility: hidden;
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
                <form class="form" name="shopForm">
                    <div class="formGroup">
                        <Row>
                            <Col span="16" offset="4"><Alert type="error" show-icon v-show="errTip" >{{errTip}}</Alert></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >店铺名称：</label></Col>
                            <Col span="13"><Input v-model="shopName" placeholder="请输入店铺名称" name="name" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >联系人/法人：</label></Col>
                            <Col span="13"><Input v-model="contacts" placeholder="请输入联系人"  name="contacts" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >联系电话：</label></Col>
                            <Col span="13"><Input v-model="phone" placeholder="请输入联系电话"  name="phone" size="large"/></Col>
                        </Row>
                    </div>
                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >地址：</label></Col>
                            <Col span="13"><Input v-model="address" placeholder="请输入地址"  name="address" size="large"/></Col>
                        </Row>
                    </div>

                    <div class="formGroup">
                        <Row>
                            <Col span="3" offset="4"><label for="" >logo：</label></Col>
                            <Col span="13">
                                        <div class="demo-upload-list" v-for="item in uploadList">
                                            <template v-if="item.status === 'finished'">
                                                <img :src="item.url">
                                                <div class="demo-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>

                                            <template v-else>
                                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                            </template>
                                        </div>

                                        <Upload
                                                ref="upload"
                                                :show-upload-list="false"
                                                :default-file-list="defaultList"
                                                :action="uploadAction"
                                                :format="['jpg','jpeg','png']"
                                                :max-size="2048"
                                                :on-success="handleSuccess"
                                                multiple
                                                type="drag"
                                                name="fileInput"
                                                style="display:inline-block;width:58px;"
                                                :style="{visibility: isHidden}"
                                        >
                                            <div style="width: 58px;height:58px;line-height: 58px;">
                                                <Icon type="ios-camera" size="20"></Icon>
                                            </div>
                                        </Upload>


                            </Col>
                        </Row>
                    </div>
                    <input type="hidden" name="favourite" value="0">
                    <div class="formGroup">
                        <Row>
                            <Col span="4" offset="8">
                            <Button type="info" icon="md-checkmark" @click.stop="createShop">{{this.isModify? '修改店铺': '创建店铺'}}</Button>
                            </Col>
                            <Col span="4"><Button type="error"  icon="md-close" @click.stop="cancel">取消</Button></Col>
                        </Row>
                    </div>
                </form>
                <Modal title="View Image" v-model="visible">
                    <img  :src = 'viewPic' v-if="visible" style="width: 100%">
                </Modal>
            </Content>
        </template>
    </my-layout>

</template>


<script>
	import myLayout from './Layout';
	import ajax from '../utils/ajax';
	import { Button, Icon ,Breadcrumb,BreadcrumbItem,MenuItem,Content,Row,Col,Alert,Input, Upload, Modal} from 'iview';
	export default {
		data(){
			let uploadAction = this.$url.getUrlParam('debug') ==1 ? 'http://localhost:9999/shop/upload': 'http://aoshiman.com.cn/shopServer/shop/upload';
			let StorageShop = JSON.parse(sessionStorage.getItem('modifyShopData'));
            sessionStorage.removeItem('modifyShopData');
			if(StorageShop){
				return {
					viewPic:'',
					visible:false,
					errTip:'',
					shopName:StorageShop.name,
					contacts:StorageShop.contacts,
                    logo: StorageShop.logo,
					phone:StorageShop.phone,
					address:StorageShop.address,
                    modifyShop:StorageShop,
					uploadAction,
					uploadList:[],
					defaultList:[{
						url:StorageShop.logo
                    }]
                }
            }
			return {
				viewPic:'',
				visible:false,
				errTip:'',
                shopName:'',
                contacts:'',
                phone:'',
                address:'',
				uploadAction,
				uploadList:[],
				defaultList:[]
            }
        },


		components:{
			myLayout, Icon, Button ,Breadcrumb,BreadcrumbItem,Content,Row,Col,Alert,Input,Upload,Modal
		},
        computed:{
		    isModify: function(){
			    return this.modifyShop? true: false
            },
            isHidden: function(){
		    	return this.uploadList.length >0 ? 'hidden': 'visible';
            }
        },
        mounted(){
			console.log(this.$refs.upload.fileList);
			this.uploadList = this.$refs.upload.fileList;


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
                if(!this.uploadList[0]){
	        		this.errTip = '请上传店铺logo';
	        		return;
                }
                let shopData = {
                    name:this.shopName,
                    phone: this.phone,
                    address: this.address,
                    favourite:0,
                    logo: this.uploadList[0].url,
	                contacts: this.contacts
                };

                if(this.modifyShop){
                	shopData = Object.assign({},this.modifyShop,shopData);
                	ajax.post({
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

                // let formData = new FormData(document.forms["shopForm"]);
                ajax.post({
                    url:'/shop/insert',
                    data: shopData
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
            },
	        handleView(pic){
	        	this.viewPic = pic;
	        	this.visible = true;
            },
	        handleRemove(file){

		        const fileList = this.$refs.upload.fileList;
		        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                // this.logo = '';
            },

	        handleSuccess (res, file) {
	        	file.url=file.response.filename;
		        file.name = file.name;
	        }
        }
    }


</script>