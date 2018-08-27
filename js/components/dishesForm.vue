<template>
    <Modal
            v-model="isShow"
            title="添加菜品"
            :footer-hide='true'
            :closable="false"
            width="800"
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
            <FormItem label="菜品描述">
                <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder='菜品描述~~~'></Input>
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
    import {Modal,Form,FormItem,Input,Select,Option,Button} from 'iview';
    export default {
    	props:['isShow','shopId'],
        components:{
	        Modal,Form,FormItem,Input,Select,Option,Button
        },
    	data(){
    		return {
			    formItem:{
				    name: '',
                    type:'',
				    description: ''
                },
			    dishTypeMap: this.$dishTypeMap
            }
        },
        methods:{

	        addDish(){
	        	if(!this.formItem.name){
	        		this.$Message.error('请输入菜品名称');
	        		return;
                }
                if(!this.formItem.type){
	        		this.$Message.error('请选择菜品类型');
	        		return;
                }
	        	let postData = Object.assign(this.formItem,{
			        shopid: this.shopId,
                    favourites: Math.floor(Math.random() * 100),
			        comments:[5],
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
            }
        }
    }
</script>