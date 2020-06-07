<style>
    .dishPic{
        width: 100%;
    }
</style>
<template>
    <Row v-show="dishData.name">
        <Col span="24" >
        <Card dis-hover>
            <p slot="title">菜品信息</p>
            <Row>
                <Col span="4" >菜品名称</Col>
                <Col span=20>{{dishData.name}}</Col>
            </Row>

            <Row>
                <Col span="4" >菜品价格</Col>
                <Col span=20>{{dishData.price}}</Col>
            </Row>
            <Row>
                <Col span="4" >菜品评分</Col>
                <Col span=20> {{dishData.comments | averages}}</Col>
            </Row>
            <Row>
                <Col span="4" >收藏人数</Col>
                <Col span="20">{{dishData.favourites}}</Col>
            </Row>
            <Row>
                <Col span="4" >菜品标签</Col>
                <Col span="20">
                    <template v-for= "tag in hasTag " >
                        <Tag :color="tag.color" >{{tag.name}}</Tag>
                    </template>
                </Col>
            </Row>
            <Row>
                <Col span="4">菜品描述</Col>
                <Col span="20">{{dishData.description}}</Col>
            </Row>
            <Row>
                <Col span="4">菜品图片</Col>
            </Row>
            <Row v-for="item in dishData.pics">
                <Col span="20" offset="2">
                <img :src="item" alt="" class="dishPic">
                </Col>
            </Row>
        </Card>
        </Col>
    </Row>

</template>
<script>

	import {Card,Row,Col,Tag} from 'iview';

	const tagMap = {

        'new':{name:'新品',color:'primary',isCheck: true,key:'new'},
        'hot':       {name:'热门',color:'error',isCheck: false, key:'hot'},
        'saleGood':       {name:'热卖',color:'orange',isCheck: false, key:'saleGood'},
        'hotter':      {name:'超火爆',color:'gold',isCheck: false, key:'hotter'},
        'minus':     {name:'满减',color:'cyan',isCheck: false, key:'minus'},
        'discount':     {name:'狠优惠',color:'volcano',isCheck: true,key:'discount'},
        'style':    {name:'有格调',color:'green',isCheck: false, key:'style'},
        'sign':     {name:'招牌',color:'red',isCheck: false, key:'sign'},
        'newDiscount':    {name:'新客立减',color:'pink',isCheck: false, key:'newDiscount'},
        'packet':   {name:'有红包',color:'geekblue',isCheck: false, key:'packet'}

    };

	export default {
		props:['dishData'],
		components:{
			Card,Row,Col,Tag
		},

		data(){
			return {
				tagMap
			}
		},

        computed:{
                hasTag: function(){
                let hasTag = {};
                    if(!this.dishData.name) return;
                                for(let key in tagMap ){
                    if(this.dishData.tags.indexOf(key) > -1){
                        hasTag[key] = tagMap[key];
                    }
                }
                return hasTag;
            }
        },

        mounted(){

        },


        filters:{
			averages: (arr) =>{
                if(!arr){
                	return;
                }
				return arr.average();
            }
        }

	}


</script>