<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
        >
          <!-- <div class="layout-logo">
            <img
              src="//www.baidu.com/img/baidu_jgylogo3.gif"
              alt=""
            />
          </div> -->
          <p class="admin_title">
            商家店铺美食管理系统
          </p>
          <div class="opreate_option">
            hello  {{ loginName ||'李晶' }}  &nbsp;
            <Badge
              :count="10"
              @click.stop="showMessage"
            />

            <Button
              type="error"
              @click="showMessage"
            >
              <Icon type="md-log-out" /> 退出
            </Button>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{background: '#fff',minHeight:'887px'}"
          style="min-height: 100%;"
        >
          <Menu
            :active-name="currentMenu"
            theme="light"
            width="auto"
            :open-names="['1']"
            @on-select="goPage"
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="md-cube" />
                店铺管理
              </template>
              <MenuItem
                v-for="(item,index) in menuList"
                :name="item.name"
                :key="index"
                class="menu-list-item"
                @click="goPage(item.link)"
              >
                <Icon :type="item.icon" />{{ item.text }}
              </MenuItem>
            </Submenu>
            <!--<Submenu name="2">-->
            <!--<template slot="title">-->
            <!--<Icon type="cube"></Icon>-->
            <!--菜品管理-->
            <!--</template>-->
            <!--<MenuItem v-for="item in menuList" @cli
            ck='goPage(item.link)' :name="item.name" class="menu-list-item"><Icon :type="item.icon"></Icon>
            {{item.text}}</MenuItem>-->
            <!--</Submenu>-->
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <slot name="breadCrumb"></slot>
          <slot name="content"></slot>
        </Layout>
      </Layout>
      <Footer class="footer">
        <p>@本系统是李晶同学毕业设计后台管理系统；维护人员：李晶 王世平</p>
      </Footer>
    </Layout>
  </div>
</template>

<script>

export default {
  props: ['currentMenu'],
  data() {
    return {
      loginName: '',
      menuList: [
        {
          name: 'shopList',
          link: '/html/shopList.html',
          text: '店铺列表',
          icon: 'md-list-box',
        },
        {
          name: 'addShop',
          link: '/html/addShop.html',
          text: '增加店铺',
          icon: 'md-add-circle',
        },
      ],
    };
  },
  mounted() {
    this.getloginName();
  },
  methods: {

    showMessage() {
      console.log('xx', this.$Notice);
      this.$Notice.info({
        title: '您有新订单啦',
        desc: '订单客户：wsp971<br>联系电话：13760251866; <br>菜品:肉夹馍	; <br>数量：1份'
      });
    },
    logout() {
      this.$cookie.del('loginname', '/', '.aoshiman.com.cn');
      this.$cookie.del('username', '/', '.aoshiman.com.cn');
      this.$linkPage('/html/login.html');
    },
    goPage(name) {
      const target = this.menuList.find(item => item.name === name);
      this.$linkPage(target.link);
    },
    getloginName() {
      const username = this.$cookie.get('username');
      const loginname = this.$cookie.get('loginname');
      if (!username) {
        // this.$linkPage('/html/login.html');
      }
      this.loginName = loginname;
    },
  },
};
</script>

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
    body{
        height:100%;
        padding-bottom:69px;
    }
    .footer{
        /*position:fixed;*/
        /*bottom:0;*/
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
    .admin_title{
        color: #ffffff;
        font-size: 20px;
        position: absolute;
        float:left;
        margin-left: 100px;
    }
    .opreate_option{
        float:right;
        color: #ffffff;
    }
    .menu-list-item{
        color:#80848f;
    }
    .menu-list-item:hover{
        color:#1c2438;
    }
</style>
