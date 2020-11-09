<template>
  <my-layout current-menu="shopList">
    <template slot="breadCrumb">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>订单记录</BreadcrumbItem>
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
          title: '订单号',
          key: 'orderid',
        },
        {
          title: '菜品id',
          key: 'dishid',
        },
        {
          title: '下单时间',
          key: 'ordertime',
        },
        {
          title: '菜品名称',
          key: 'dishname',
        },
        {
          title: '联系人',
          key: 'contacts',
        },
        {
          title: '联系电话',
          key: 'phone',
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'success',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  this.addDishes(params);
                },
              },
            }, '详情'),
          ]),
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
              orderid: 20200801125345,
              dishid: '5ef9ace10e82f57243e9096e',
              dishname: '考卷菜',
              contacts: '王一一',
              phone: 13659593322,
              ordertime: '2020-08-01 12:53:45'
            },
            {
              orderid: 20200815122346,
              dishid: '5ef9ab240e82f57243e90968',
              dishname: '金针菇',
              contacts: '李一非',
              phone: 18634332213,
              ordertime: '2020-08-15 12:23:46'
            }
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
