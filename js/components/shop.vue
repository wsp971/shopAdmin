<style>
    .logo{
        width:70px;
        height:70px;
    }
</style>

<template>
    <Row>
        <Col span="24" >
            <Card dis-hover>
                <p slot="title">店铺信息</p>
                <Row>
                    <Col span="2" >店铺名称</Col>
                    <Col span=22>{{shopData.name}}</Col>
                </Row>
                <Row>
                    <Col span="2" >logo</Col>
                    <Col span=22> <img :src="shopData.logo" alt="" class="logo"></Col>
                </Row>
                <Row>
                    <Col span="2" >店铺联系人</Col>
                    <Col span="22">{{shopData.contacts}}</Col>
                </Row>
                <Row>
                    <Col span="2">店铺联系电话</Col>
                    <Col span="22">{{shopData.phone}}</Col>
                </Row>
                <Row>
                    <Col span="2">店铺地址</Col>
                    <Col span="22">{{shopData.address}}</Col>
                </Row>
                <Row>
                    <Col span="2">店铺星级</Col>
                    <Col span="22">{{shopData.star}}</Col>
                </Row>
                <Row>
                    <Col span="2">收藏人数</Col>
                    <Col span="22">{{shopData.favourite}}</Col>
                </Row>
            </Card>
        </Col>
    </Row>
</template>
<script>
    import {Card,Row,Col} from 'iview';
    export default {
    	props:['shopId'],
        components:{
	        Card,Row,Col
        },
        data(){
    		return {
                shopData:{}
            }
        },
        created(){
            this.$ajax.get({
               url:'/shop/queryByid',
               data:{
               	    shopid:this.shopId
               }
            }).then(res=>{
            	if(res.data.code == 0){
            		this.shopData = res.data.data[0];
                }else{
            		this.$Message.error('查询店铺失败！');
                }
            }).catch(e=>{
	            this.$Message.error('查询店铺失败！');
            })
        },
    }


</script>