<template>
  <my-layout current-menu="shopList">
    <template slot="breadCrumb">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>数据统计</BreadcrumbItem>
      </Breadcrumb>
    </template>
    <template slot="content">
      <Content
        slot="content"
        :style="{padding: '24px', minHeight: '200px', background: '#fff'}"
      >
        <div style="margin: 10px 0;">
          <Table
            :loading="loading"
            :columns="tableColumnn"
            :data="tableData"
          />
        </div>
        <Page
          :total="totalNum"
          :page-size="pageSize"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
        <Modal
          title="订单详情"
          width="600"
          :scrollable="true"
          v-model="showDetail"
        >
          <OrderDetail />
        </Modal>
      </Content>
    </template>
  </my-layout>
</template>
<script>

import myLayout from './Layout';

import OrderDetail from './orderDetail';

export default {
  components: {
    myLayout,
    OrderDetail
  },
  data() {
    return {
      searchText: '',
      showDetail: true,
      tableColumnn: [

        {
          title: '用户微信号',
          key: 'wechat',
        },
        {
          title: '用户昵称',
          key: 'userNick',
        },
        {
          title: '收藏店铺数',
          key: 'favershopcount',
        },
        {
          title: '喜欢菜品数',
          key: 'faverdishcount',
        },
        {
          title: '下单数',
          key: 'ordercount',
        },

      ],
      tableData: [],
      loading: true,
      searchLoading: false,
      modalShow: false,
      options: [],
      serchInput: '',
      pageSize: 5,
      totalNum: 0,
      pageIndex: 0,
    };
  },
  created() {
    this.queryData();
  },
  methods: {
    show() {
      this.$Modal.info({
        title: 'User Info',
        content: 'xxx',
      });
    },
    remove(params) {
      console.log(params);
      this.$ajax.get({
        url: '/shop/delete',
        data: params.row,
      }).then(res => {
        if (res.data.code === 0) {
          this.$Message.success('删除成功');
          this.queryData();
        } else {
          this.$Message.error('删除失败！');
        }
      }).catch(e => {
        console.log(e);
        this.$Message.error('删除失败！');
      });
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex - 1;
      this.queryData();
      console.log(pageIndex);
    },
    confirm() {

    },
    cancel() {

    },
    addShop() {
      this.$linkPage('/html/addShop.html');
    },
    addDishes(params) {
      this.$linkPage(`/html/addDishes.html?shopid=${params.row.id}`);
    },
    processStart() {
      this.modalShow = true;
    },
    pageSizeChange(value) {
      this.pageSize = value;
      this.queryData();
    },
    queryData() {
      this.$ajax.get({
        url: '/shop/shopList',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      }).then(res => {
        if (res.data.code === 0) {
          this.loading = false;
          this.tableData = [
            {
              userNick: 'Dora',
              wechat: 'wspsean',
              favershopcount: '6',
              faverdishcount: '21',
              ordercount: 3,
            },
            {
              userNick: 'Null',
              wechat: 'dddhhh1234',
              favershopcount: '8',
              faverdishcount: '28',
              ordercount: 9,
            },
            {
              userNick: 'X',
              wechat: 'xinnn_1923',
              favershopcount: '2',
              faverdishcount: '11',
              ordercount: 1,
            },
            {
              userNick: '廿一',
              wechat: 'ganchungen1986',
              favershopcount: '8',
              faverdishcount: '18',
              ordercount: 1,
            },
            {
              userNick: 'yuanyuan',
              wechat: 'mahr_0621',
              favershopcount: '2',
              faverdishcount: '3',
              ordercount: 1,
            },
            {
              userNick: '黎.',
              wechat: 'lijiajianx12',
              favershopcount: '10',
              faverdishcount: '23',
              ordercount: 7,
            },
            {
              userNick: '豆芽爸爸',
              wechat: 'q1qqq681',
              favershopcount: '23',
              faverdishcount: '3',
              ordercount: 12,
            },
            {
              userNick: '贝贝🍉',
              wechat: 'Madi917',
              favershopcount: '12',
              faverdishcount: '23',
              ordercount: 2,
            },
            {
              userNick: '罗宾',
              wechat: 'robin1984',
              favershopcount: '2',
              faverdishcount: '1',
              ordercount: 0,
            },
          ];
          this.totalNum = res.data.totalCount;
        } else {
          this.$Message.error('获取数据失败');
        }
      }).catch(e => {
        console.log(e);
        this.$Message.error('获取数据失败！');
      });
    },
  },
};
</script>
