
<template>
    <my-layout current-menu="shopList">
        <template slot="breadCrumb">
            <Breadcrumb :style="{margin: '24px 0'}" >
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>店铺列表</BreadcrumbItem>
            </Breadcrumb>
        </template>
        <template slot="content">
            <Content :style="{padding: '24px', minHeight: '200px', background: '#fff'}" slot="content">
                <div style="margin-bottom: 10px;">
                    <Button type="info" @click="addShop">新增店铺</Button>
                    <span style="float:right; display:none;">
                        <Input v-model="searchText" placeholder="搜索店铺" style="width: 300px"/> 
                        <Button type="info" shape="circle" icon="ios-search" >搜索</Button>
                    </span>
                </div>

                <div style="margin: 10px 0;">
                    <Table :loading="loading" :columns="tableColumnn" :data="tableData"></Table>
                </div>
                <Page :total="totalNum"  v-on:on-change="pageChange" v-on:on-page-size-change = 'pageSizeChange' :page-size="pageSize" ></Page>
                <!--<Modal-->
                        <!--v-model="modalShow"-->
                        <!--title="发起名单审核"-->
                        <!--@on-ok="confirm"-->
                        <!--@on-cancel="cancel">-->
                    <!--<p>确定发起名单审核流程吗？您需要制定一个审核人，请输入审核人的erp</p>-->

                    <!--<Form :model="formItem" label-position="left" :label-width="100">-->
                        <!--<FormItem label="制定审核人">-->
                            <!--<Select-->
                                    <!--filterable-->
                                    <!--remote-->
                                    <!--:remote-method="searchErp"-->
                                    <!--v-model="serchInput"-->
                                    <!--@on-change="selectErp"-->
                                    <!--:loading="searchLoading">-->
                                <!--<Option v-for="(option, index) in options" :value="option.value" :key="index">-->
                                    <!--<p class="nameText"> {{option.name}}</p>-->
                                    <!--<p class="smallText">{{option.department}}</p>-->
                                    <!--{{option.label}}-->
                                <!--</Option>-->
                            <!--</Select>-->
                        <!--</FormItem>-->
                        <!--<form-item label="填写备注">-->
                            <!--<Input v-model="formItem.input1" type="textarea" :rows="4" placeholder="Enter something..."></Input>-->
                        <!--</form-item>-->
                    <!--</Form>-->
                <!--</Modal>-->
            </Content>
        </template>

    </my-layout>
</template>
<script>
    import myLayout from './Layout';
    import {Breadcrumb,BreadcrumbItem,Button,Table,Input,Page,Icon} from 'iview';
	export default {
		data () {
			return {
				searchText:'',
				tableColumnn: [

					{
						title: '店铺id',
						key: 'id'
					},
					{
						title: '店铺logo',
						key: 'logo',
                        render:(h,params)=>{
							return h('img',{
								style:{
									width:'50px',
                                    height:'50px'
                                },
								attrs:{
									src: params.row.logo
                                }

                            })
                        }
					},
							{
						title: '店铺名称',
						key: 'name'
					},
					{
						title: '法人',
						key: 'contacts'
					},
					{
						title: '联系电话',
						key: 'phone'
					},
					{
						title: '星级',
						key: 'star'
					},{
						title: '地址',
						key: 'address'
					},{
						title: '收藏数',
						key: 'favourite'
					},
					{
						title: '操作',
						key: 'action',
						width: 250,
						align: 'center',
						render: (h, params) => {
							return h('div', [

								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											sessionStorage.setItem('modifyShopData', JSON.stringify(params.row));
											this.$linkPage('/html/addShop.html');
											console.log(params);
										}
									}
								}, '修改'),

								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.remove(params)
										}
									}
								}, '删除'),

								h('Button', {
									props: {
										type: 'success',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.addDishes(params);
										}
									}
								}, '详情'),

								h('Button', {
									props: {
										type: 'info',
										size: 'small'
									},
									on: {
										click: () => {
											this.addDishes(params);
										}
									}
								}, '新增菜品')
							]);
						}
					}
				],
				tableData: [],
				loading: true,
                searchLoading: false,
                modalShow: false,
				options:[],
				serchInput:'',
                pageSize:5,
                totalNum:0,
                pageIndex:0
			};
		},
        components:{
		    myLayout,Breadcrumb,BreadcrumbItem,Page,Table,Input,Icon
        },
        created(){
			this.queryData();

        },
		methods: {
			show (index) {
				this.$Modal.info({
					title: 'User Info',
					content: `xxx`
				})
			},
			remove (params) {
				console.log(params);
				this.$ajax.get({
                    url:'/shop/delete',
                    data:params.row
                }).then(res=>{
                	if(res.data.code ==0){
		                this.$Message.success('删除成功');
		                this.queryData();
                    }else{
		                this.$Message.error('删除失败！');
                    }
                }).catch(e=>{
					this.$Message.error('删除失败！');
				})
			},
			pageChange(pageIndex){
				this.pageIndex = pageIndex-1;
				this.queryData();
				console.log(pageIndex);
            },
            confirm(){

            },
            cancel(){

            },
			addShop(){
				this.$linkPage('/html/addShop.html');
            },
            addDishes(params){
			    this.$linkPage('/html/addDishes.html?shopid=' + params.row.id);
            },
			processStart(){
				this.modalShow = true;
            },
			pageSizeChange(value){
                this.pageSize =value;
                this.queryData();
            },
			queryData(){
				this.$ajax.get({
					url:`/shop/shopList`,
					data:{
						pageIndex: this.pageIndex,
						pageSize: this.pageSize
					}
				}).then(res=>{
					if(res.data.code ==0){
						this.loading = false;
						this.tableData = res.data.data;
						this.totalNum = res.data.totalCount
					}else{
						this.$Message.error('获取数据失败');
					}
				}).catch(e=>{
					this.$Message.error('获取数据失败！');
				});
            }
		}
	}
</script>
