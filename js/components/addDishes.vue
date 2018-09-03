<style>
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
    <my-layout current-menu="addDishes">
        <template slot="breadCrumb">
            <Breadcrumb :style="{margin: '24px 0'}" >
                <BreadcrumbItem>首页</BreadcrumbItem>
                <BreadcrumbItem>增加菜品</BreadcrumbItem>
            </Breadcrumb>
        </template>
        <template slot="content">
            <Content :style="{padding: '24px', minHeight: '200px', background: '#fff'}" slot="content">
                <Shop :shop-id="shopId"></Shop>
                <DishTable :shop-id="shopId" v-on:showModal="showModal" v-on:showDetail="showDishDetail"></DishTable>
                <DishForm :is-show="addDish" :shop-id="shopId" v-on:hideModal="hideModal"></DishForm>
                <Modal
                        title="菜品详情"
                        width="600"
                        v-model="isShowDish"
                        :scrollable="true"
                >
                    <Dish :dish-data='dishData'></Dish>


                </Modal>
            </Content>
        </template>
    </my-layout>
</template>


<script>
	import myLayout from './Layout';
	import { Button, Icon ,Breadcrumb,BreadcrumbItem,MenuItem,Content,Row,Col,Alert,Input,Card,Modal} from 'iview';
	import Shop from './shop';
	import DishTable from './dishTable';
	import DishForm from './dishesForm';
	import Dish from './dish';
	export default {
		data(){
			let shopId = this.$url.getUrlParam('shopid');
			return {
				shopId,
                addDish:false,
				dishData:{},
				// dishData:{"comments":[5],"pics":["http://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar","http://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar","http://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"],"_id":"5b897683716350420d4ca3e8","name":"232323","type":6,"description":"asdfasdfadfa","shopid":1535733011012,"favourites":85,"__v":0},
                isShowDish: false,
			}
		},
		components:{
			myLayout, Icon, Button ,Breadcrumb,BreadcrumbItem,Content,Row,Col,Alert,Card,Input,Shop,DishTable,DishForm,Dish,Modal
		},
		methods:{
			hideModal(){
				this.addDish = false;
            },
			showModal(){
			    this.addDish = true;
            },
			cancel(){
				this.$linkPage('/html/shopList.html');
			},
			showDishDetail(dishData){
				this.dishData=dishData;
				this.isShowDish = true;
            }
		}
	}


</script>