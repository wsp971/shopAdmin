<template>
  <Row class="dishInfo">
    <i-col span="24">
      <Card dis-hover>
        <p slot="title">
          菜品信息
        </p>
        <Button
          slot="extra"
          type="primary"
          size="small"
          @click="addDishes"
        >
          新增菜品
        </Button>
        <div style="margin: 10px 0;">
          <Table
            :loading="loading"
            :columns="tableColumnn"
            :data="dishData"
          />
        </div>
        <Page
          :total="totalNum"
          :page-size="pageSize"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
      </Card>
    </i-col>
  </Row>
</template>
<script>

export default {
  props: ['shopId'],
  data() {
    return {
      tableColumnn: [
        {
          title: '菜品名称',
          key: 'name',
        },
        {
          title: '菜品评分',
          key: 'comments',
          render: (h, params) => h('span', params.row.comments.average()),
        },

        {
          title: '收藏人数',
          key: 'favourites',
        },

        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => h('div', [
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
                type: 'info',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  this.showDetail(params);
                },
              },
            }, '详情'),
          ]),
        },
      ],
      dishData: [],
      totalNum: 0,
      pageIndex: 0,
      pageSize: 10,
      loading: false,
    };
  },
  created() {
    this.queryData();
    this.$bus.$on('refreshData', this.queryData);
  },
  methods: {
    queryData() {
      this.$ajax.get({
        url: '/dish/dishList',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          shopid: this.shopId,
        },
      }).then(res => {
        if (res.data.code === 0) {
          this.dishData = res.data.data;
          this.totalNum = res.data.totalCount;
        } else {
          this.$Message.error('获取菜品失败');
        }
      }).catch(e => {
        console.log(e);
        this.$Message.error('获取菜品错误');
      });
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex - 1;
      this.queryData();
      console.log(pageIndex);
    },

    pageSizeChange() {

    },
    showDetail(params) {
      this.$emit('showDetail', params.row);
    },
    addDishes() {
      this.$emit('showModal');
    },
    remove(params) {
      this.$ajax.get({
        url: '/dish/delete',
        data: {
          id: params.row._id,
        },
      }).then(res => {
        if (res.data.code === 0) {
          this.$Message.success('删除成功！');
          this.queryData();
        } else {
          this.$Message.error('删除失败');
        }
      }).catch(e => {
        console.log(e);
        this.$Message.error('删除出错！');
      });
    },
  },
};
</script>

<style scoped>
    .dishInfo{
        margin-top:10px;
    }
</style>
