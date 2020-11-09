<template>
  <my-layout current-menu="addDishes">
    <template slot="breadCrumb">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>增加菜品</BreadcrumbItem>
      </Breadcrumb>
    </template>
    <template slot="content">
      <Content
        slot="content"
        :style="{padding: '24px', minHeight: '200px', background: '#fff'}"
      >
        <Shop :shop-id="shopId" />
        <DishTable
          :shop-id="shopId"
          @showModal="showModal"
          @showDetail="showDishDetail"
          @editDish="editDish"
        />
        <DishForm
          :is-show="addDish"
          :shop-id="shopId"
          @hideModal="hideModal"
          :edit-dish-data="editDishData"
        />
        <Modal
          v-model="isShowDish"
          title="菜品详情"
          width="600"
          :scrollable="true"
        >
          <Dish :dish-data="dishData" />
        </Modal>
      </Content>
    </template>
  </my-layout>
</template>

<script>

import myLayout from './Layout';
import Shop from './shop';
import DishTable from './dishTable';
import DishForm from './dishesForm';
import Dish from './dish';

export default {
  components: {
    myLayout, Shop, DishTable, DishForm, Dish,
  },
  data() {
    const shopId = this.$url.getUrlParam('shopid');
    return {
      shopId,
      addDish: false,
      dishData: {},
      editDishData: null,
      // dishData:{"comments":[5],"pics":["http://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar","http://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar","http://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"],"_id":"5b897683716350420d4ca3e8","name":"232323","type":6,"description":"asdfasdfadfa","shopid":1535733011012,"favourites":85,"__v":0},
      isShowDish: false,
    };
  },
  methods: {
    hideModal() {
      this.addDish = false;
      this.editDishData = null;
    },
    showModal() {
      this.addDish = true;
    },
    editDish(dishData) {
      console.log('dishdata', dishData);
      this.addDish = true;
      this.editDishData = dishData;
    },
    cancel() {
      this.$linkPage('/html/shopList.html');
    },
    showDishDetail(dishData) {
      this.dishData = dishData;
      this.isShowDish = true;
    },
  },
};

</script>

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
