<style>
  .dishPic{
    width: 100%;
  }
</style>
<template>
  <Row>
    <i-col span="24">
      <Card dis-hover>
        <p slot="title">
          订单详情
        </p>
        <Row>
          <i-col span="4">
            订单号
          </i-col>
          <i-col span="20">
            {{ dishData.orderid }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            下单时间
          </i-col>
          <i-col span="20">
            {{ dishData.ordertime }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            联系人
          </i-col>
          <i-col span="20">
            {{ dishData.contacts }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            联系电话
          </i-col>
          <i-col span="20">
            {{ dishData.phone }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            菜品名称
          </i-col>
          <i-col span="20">
            {{ dishData.dishname }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            菜品图片
          </i-col>
        </Row>
        <Row
          v-for="(item,index) in dishData.pics"
          :key="index"
        >
          <i-col
            span="20"
            offset="2"
          >
            <img
              :src="item"
              alt=""
              class="dishPic"
            />
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>
<script>

export default {

  props: {
    dishData: {
      type: Object,
      default: () => ({
        orderid: 20200801125345,
        dishid: '5ef9ace10e82f57243e9096e',
        dishname: '考卷菜',
        contacts: '王一一',
        phone: 13659593322,
        ordertime: '2020-08-01 12:53:45',
        pics: [
          'http://aoshiman.com.cn/uploads/1593420579151.png'
        ],
      }),
    }
  },

  data() {
    return {

    };
  },

  mounted() {

  },

};

</script>
