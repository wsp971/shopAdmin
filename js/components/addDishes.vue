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
                <DishTable :shop-id="shopId" v-on:showModal="showModal"></DishTable>
                <DishForm :is-show="addDish" :shop-id="shopId" v-on:hideModal="hideModal"></DishForm>
            </Content>
        </template>
    </my-layout>
</template>


<script>
	import myLayout from './Layout';
	import ajax from '../utils/ajax';
	import { Button, Icon ,Breadcrumb,BreadcrumbItem,MenuItem,Content,Row,Col,Alert,Input,Card} from 'iview';
	import Shop from './shop';
	import DishTable from './dishTable';
	import DishForm from './dishesForm';
	export default {
		data(){
			let shopId = this.$url.getUrlParam('shopid');
			return {
				shopId,
                addDish:false,
			}
		},
		components:{
			myLayout, Icon, Button ,Breadcrumb,BreadcrumbItem,Content,Row,Col,Alert,Card,Input,Shop,DishTable,DishForm
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
			}
		}
	}


</script>