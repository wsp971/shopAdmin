<template>
  <my-layout current-menu="shopList">
    <template slot="breadCrumb">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>店铺列表</BreadcrumbItem>
      </Breadcrumb>
    </template>
    <template slot="content">
      <Content
        slot="content"
        :style="{padding: '24px', minHeight: '200px', background: '#fff'}"
      >
        <div style="margin-bottom: 10px;">
          <Button
            type="info"
            @click="addShop"
          >
            新增店铺
          </Button>
          <!-- <span style="float:right; display:block;">
            <Input
              v-model="searchText"
              placeholder="搜索店铺"
              style="width: 300px"
            />
            <Button
              type="info"
              shape="circle"
              icon="ios-search"
            >搜索</Button>
          </span> -->
        </div>

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
      </Content>
    </template>
  </my-layout>
</template>
<script>

import myLayout from './Layout';

export default {
  components: {
    myLayout
  },
  data() {
    return {
      searchText: '',
      tableColumnn: [

        {
          title: '店铺id',
          key: 'id',
        },
        {
          title: '店铺logo',
          key: 'logo',
          render: (h, params) => h('img', {
            style: {
              width: '50px',
              height: '50px',
            },
            attrs: {
              src: params.row.logo,
            },

          }),
        },
        {
          title: '店铺名称',
          key: 'name',
        },
        {
          title: '法人',
          key: 'contacts',
        },
        {
          title: '联系电话',
          key: 'phone',
        },
        {
          title: '星级',
          key: 'star',
        }, {
          title: '地址',
          key: 'address',
        }, {
          title: '收藏数',
          key: 'favourite',
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => h('div', [

            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  sessionStorage.setItem('modifyShopData', JSON.stringify(params.row));
                  this.$linkPage('/html/addShop.html');
                  console.log(params);
                },
              },
            }, '修改'),

            h('Button', {
              props: {
                type: 'error',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  this.remove(params);
                },
              },
            }, '删除'),

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

            h('Button', {
              props: {
                type: 'info',
                size: 'small',
              },
              on: {
                click: () => {
                  this.addDishes(params);
                },
              },
            }, '新增菜品'),
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
          this.tableData = res.data.data;
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
