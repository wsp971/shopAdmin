<style>
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
</style>

<template>
    <Modal
            v-model="isShow"
            title="添加菜品"
            :footer-hide='true'
            :closable="false"
            width="800"
            :mask-closable="false"
            >
        <Form :model="formItem" :label-width="60">
            <FormItem label="菜名">
                <Input v-model="formItem.name" placeholder="请输入菜品名称"></Input>
            </FormItem>

            <FormItem label="菜品类型">
                <Select v-model="formItem.type">
                    <Option v-for="(value, key) in dishTypeMap" :value="key">{{value}}</Option>
                </Select>
            </FormItem>

            <FormItem label="价格">
                <Input v-model="formItem.price" placeholder="请输入菜品当前价格"></Input>
            </FormItem>

            <FormItem label="原价">
                <Input v-model="formItem.prePrice" placeholder="请输入菜品原价"></Input>
            </FormItem>

            <FormItem label="菜品描述">
                <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder='菜品描述~~~'></Input>
            </FormItem>

            <FormItem label="菜品标签">
                <Tag checkable  v-for= "tag in tags " :color="tag.color" :checked="tag.isCheck"  :ref="tag.key">{{tag.name}}</Tag>
            </FormItem>

            <FormItem label="菜品图片">
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
                        :max-size="10240"
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
            </FormItem>
            <FormItem>
                <Button type="primary" @click="addDish">添加</Button>
                <Button style="margin-left: 8px" @click="cancel">取消</Button>
            </FormItem>
            <div slot="footer">
            </div>
        </Form>
    </Modal>
</template>
<script>
    import {Modal,Form,FormItem,Input,Select,Option,Button,Upload,Icon,Tag} from 'iview';
    export default {
    	props:['isShow','shopId'],
        components:{
	        Modal,Form,FormItem,Input,Select,Option,Button,Upload,Icon,Tag
        },
    	data(){
		    let uploadAction = '//aoshiman.com.cn/shopServer/shop/upload';
		    return {
			    formItem:{
				    name: '',
                    type:'',
                    price:0,
                    prrPrice:0,
				    description: ''
                },
			    dishTypeMap: this.$dishTypeMap,
			    uploadAction,
			    uploadList:[],
			    defaultList:[],
                tags:[
                	{name:'新品',color:'primary',isCheck: true,key:'new'},
                	{name:'热门',color:'error',isCheck: false, key:'hot'},
                	{name:'热卖',color:'orange',isCheck: false, key:'saleGood'},
                	{name:'超火爆',color:'gold',isCheck: false, key:'hotter'},
                	{name:'满减',color:'cyan',isCheck: false, key:'minus'},
                	{name:'狠优惠',color:'volcano',isCheck: true,key:'discount'},
                	{name:'有格调',color:'green',isCheck: false, key:'style'},
                	{name:'招牌',color:'red',isCheck: false, key:'sign'},
                	{name:'新客立减',color:'pink',isCheck: false, key:'newDiscount'},
                	{name:'有红包',color:'geekblue',isCheck: false, key:'packet'}
                ],
            }
        },
	    mounted(){
		    console.log(this.$refs.upload.fileList);
		    this.uploadList = this.$refs.upload.fileList;
	    },
        computed: {
	        isHidden: function(){
		        return this.uploadList.length >=10? 'hidden': 'visible';
	        },
            hasTags: function(){
                return  this.tags.filter( item=> this.$refs[item.key][0].isChecked );
            }
        },
        methods:{
	        addDish(){

	        	// debugger;

	        	if(!this.formItem.name){
	        		this.$Message.error('请输入菜品名称');
	        		return;
                }


                if(!this.formItem.type){
	        		this.$Message.error('请选择菜品类型');
	        		return;
                }


                if(!this.uploadList[0]){
	        		this.$Message.error('请至少上传一张该菜品图片~');
	        		return;
                }


	        	let postData = Object.assign(this.formItem,{
			        shopid: this.shopId,
                    favourites: Math.floor(Math.random() * 100),
			        comments:[5],
			        pics: this.uploadList.map(item=>item.url),
                    tags: this.hasTags.map(item =>item.key)
		        });


		        this.$ajax.post({
		            url:'/dish/insert',
		            data:postData
		        }).then(res=>{
		        	if(res.data.code ==0){
		        		this.$Message.success('添加成功！');
		        		this.$bus.$emit('refreshData');
                    }else{
		        		this.$Message.error('添加失败');
                    }
                    this.formItem={name:'',type:'',description:''};
                    this.$emit('hideModal');
		        }).catch(e=>{
		        	this.$emit('hideModal');
			        this.$Message.error('添加出错');
		        })
            },
            cancel(){
                this.$emit('hideModal');
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
	        },
	        switchTag(tag){
	        	debugger;
	        	tag.isCheck = !tag.isCheck;
            }
        }
    }
</script>