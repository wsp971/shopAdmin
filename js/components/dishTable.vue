<style scoped>
    .dishInfo{
        margin-top:10px;
    }
</style>

<template>
    <Row class="dishInfo">
        <Col span="24" >
            <Card dis-hover >
                <p slot="title" >菜品信息</p>
                <Button type="primary" slot="extra" size="small" @click="addDishes">新增菜品</Button>
                <div style="margin: 10px 0;">
                    <Table :loading="loading" :columns="tableColumnn" :data="dishData"></Table>
                </div>
                <Page :total="totalNum"  v-on:on-change="pageChange" v-on:on-page-size-change = 'pageSizeChange' :page-size="pageSize" ></Page>
            </Card>
        </Col>
    </Row>
</template>
<script>
	import {Card,Table,Row,Col,Page} from 'iview';

	Array.prototype.average = function(){
		let sum = 0;
	    this.forEach(item => {sum = item + sum});
	    return parseFloat(sum/this.length).toFixed(1);
    };
	export default {
		props:['shopId'],
		components:{
			Card,Table,Row,Col,Page
		},
        data(){
		    return {
			    tableColumnn: [
			    	{
					    title: '菜品名称',
					    key: 'name'
				    },
				    {
					    title: '菜品评分',
					    key: 'comments',
					    render:(h,params)=>{
						    return  h('span',params.row.comments.average())
					    }
				    },

				    {
					    title: '收藏人数',
					    key: 'favourites'
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
						    ]);
					    }
				    }
			    ],
                dishData : [],
			    totalNum:0,
			    pageIndex: 0,
			    pageSize: 10,
			    loading: false
            }
        },
        created(){
            this.queryData();
            this.$bus.$on('refreshData',this.queryData);
        },
        methods:{
			queryData(){
				this.$ajax.get({
					url:'/dish/dishList',
					data:{
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
                        shopid: this.shopId,
					}
				}).then(res=>{
					if(res.data.code ==0){
						this.dishData = res.data.data;
						this.totalNum = res.data.totalCount;
					}else{
						this.$Message.error('获取菜品失败');
					}
				}).catch(e=>{
					this.$Message.error('获取菜品错误');
				})
            },

            pageChange(pageIndex){
                this.pageIndex = pageIndex-1;
                this.queryData();
                console.log(pageIndex);
            },

	        pageSizeChange(){

            },
	        addDishes(){
	        	this.$emit('showModal');
            }
        }
	}
</script>