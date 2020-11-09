<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .footer{
        position:fixed;
        bottom:0;
        width: 100%;
        text-align: center;
    }
    .nameText{
        line-height:1.5;
        font-size:14px;
    }
    .smallText{
        font-size: 12px;
        color: #aaa;
    }
</style>

<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
        >
          <div class="layout-logo"></div>

          <Badge dot>
            <Icon
              type="ios-bell-outline"
              size="26"
            />
          </Badge>
        </Menu>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{background: '#fff',minHeight:'887px'}"
          style="min-height: 100%;"
        >
          <Menu
            active-name="1-1"
            theme="light"
            width="auto"
            :open-names="['1']"
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate" />
                中奖审核管理
              </template>
              <MenuItem name="1-1">
                发起流程
              </MenuItem>
              <MenuItem name="1-2">
                流程审核
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>

        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>home</BreadcrumbItem>
            <BreadcrumbItem>发起流程</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '200px', background: '#fff'}">
            <div style="margin-bottom: 10px;">
              <Button type="info">
                导出名单
              </Button>
              <Button
                type="info"
                @click="processStart"
              >
                发起名单审核
              </Button>
            </div>
            <div style="margin: 10px 0;">
              <Table
                :loading="loading"
                :columns="columns7"
                :data="tableData"
              />
            </div>
            <Page
              :total="100"
              show-sizer
              @on-change="pageChange"
            />
            <Modal
              v-model="modalShow"
              title="发起名单审核"
              @on-ok="confirm"
              @on-cancel="cancel"
            >
              <p>确定发起名单审核流程吗？您需要制定一个审核人，请输入审核人的erp</p>

              <Form
                :model="formItem"
                label-position="left"
                :label-width="100"
              >
                <FormItem label="制定审核人">
                  <Select
                    v-model="serchInput"
                    filterable
                    remote
                    :remote-method="searchErp"
                    :loading="searchLoading"
                    @on-change="selectErp"
                  >
                    <Option
                      v-for="(option, index) in options"
                      :key="index"
                      :value="option.value"
                    >
                      <p class="nameText">
                        {{ option.name }}
                      </p>
                      <p class="smallText">
                        {{ option.department }}
                      </p>
                      {{ option.label }}
                    </Option>
                  </Select>
                </FormItem>
                <form-item label="填写备注">
                  <Input
                    v-model="formItem.input1"
                    type="textarea"
                    :rows="4"
                    placeholder="Enter something..."
                  />
                </form-item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
      <Footer class="footer">
        hello footer
      </Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns7: [
        {
          title: '活动名称',
          key: 'name',
          render: (h, params) => h('div', [
            h('Icon', {
              props: {
                type: 'person',
              },
            }),
            h('strong', params.row.name),
          ]),
        },
        {
          title: '活动id',
          key: 'activeid',
        },
        {
          title: '用户昵称',
          key: 'nick',
        },
        {
          title: 'openid',
          key: 'openid',
        },
        {
          title: '京东pin',
          key: 'pin',
        },
        {
          title: '用户身份',
          key: 'userType',
        }, {
          title: 'shareid',
          key: 'shareid',
        }, {
          title: '点赞数',
          key: 'zancount',
        }, {
          title: '内容页链接',
          key: 'link',
        }, {
          title: '名次',
          key: 'mingci',
        }, {
          title: '奖品名称',
          key: 'prizeName',
        },

        {
          title: 'Action',
          key: 'action',
          width: 150,
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
                  this.show(params.index);
                },
              },
            }, '查看'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small',
              },
              on: {
                click: () => {
                  this.remove(params.index);
                },
              },
            }, '删除'),
          ]),
        },
      ],
      tableData: [],
      loading: true,
      searchLoading: false,
      modalShow: false,
      options: [],
      serchInput: '',
      formItem: {
        input1: '',
        input2: '',
        input3: '',

      },
      erpList: [{
        erp: 'wangshiping5',
        name: '王世平',
        department: '研发中心-促销与运营工具开发组-卖家运营工具开发组',
      }, {
        erp: 'wangshiping5',
        name: '王世平',
        department: '研发中心-促销与运营工具开发组-卖家运营工具开发组',
      }],
    };
  },
  created() {
    const self = this;
    setTimeout(() => {
      self.loading = false;
      self.tableData = [
        {
          name: 'John Brown',
          activeid: 182332,
          nick: 'wxw',
          openid: '235232341',
          pin: '23k4j13k4jk',
          userType: '2342',
          shareid: '1341234',
          zancount: 21341234,
          link: 'https://wqs.jd.com/indexv2.shtml',
          mingci: 23,
          prizeName: '相机',
        },
        {
          name: 'John Brown',
          activeid: 182332,
          nick: 'wxw',
          openid: '235232341',
          pin: '23k4j13k4jk',
          userType: '2342',
          shareid: '1341234',
          zancount: 21341234,
          link: 'https://wqs.jd.com/indexv2.shtml',
          mingci: 23,
          prizeName: '相机',
        },

      ];
    }, 3000);
  },
  methods: {
    show() {
      this.$Modal.info({
        title: 'User Info',
        content: 'xxx',
      });
    },
    remove(index) {
      console.log(index);
    },
    pageChange(pageIndex) {
      console.log(pageIndex);
    },
    confirm() {

    },
    cancel() {

    },
    processStart() {
      this.modalShow = true;
    },
    searchErp(query) {
      if (query !== '') {
        this.searchLoading = true;
        setTimeout(() => {
          this.searchLoading = false;
          const list = this.erpList.map(item => ({
            value: item.erp,
            name: `${item.name}(${item.erp})`,
            department: item.department,
          }));

          this.options = list.filter(item => item.value.toLowerCase().indexOf(query.toLowerCase()) > -1);

          console.log(this.options);
        }, 200);
      } else {
        this.options = [];
      }
    },
    selectErp() {
      debugger;
    },
  },
};
</script>
