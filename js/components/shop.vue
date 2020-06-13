<template>
  <Row>
    <i-col span="24">
      <Card dis-hover>
        <p slot="title">
          店铺信息
        </p>
        <Row>
          <i-col span="2">
            店铺名称
          </i-col>
          <i-col span="22">
            {{ shopData.name }}
          </i-col>
        </Row>
        <Row>
          <i-col span="2">
            logo
          </i-col>
          <i-col span="22">
            <img
              :src="shopData.logo"
              alt=""
              class="logo"
            />
          </i-col>
        </Row>
        <Row>
          <i-col span="2">
            店铺联系人
          </i-col>
          <i-col span="22">
            {{ shopData.contacts }}
          </i-col>
        </Row>
        <Row>
          <i-col span="2">
            店铺联系电话
          </i-col>
          <i-col span="22">
            {{ shopData.phone }}
          </i-col>
        </Row>
        <Row>
          <i-col span="2">
            店铺地址
          </i-col>
          <i-col span="22">
            {{ shopData.address }}
          </i-col>
        </Row>
        <Row>
          <i-col span="2">
            店铺星级
          </i-col>
          <i-col span="22">
            {{ shopData.star }}
          </i-col>
        </Row>
        <Row>
          <i-col span="2">
            收藏人数
          </i-col>
          <i-col span="22">
            {{ shopData.favourite }}
          </i-col>
        </Row>
      </Card>
    </i-col>
  </Row>
</template>
<script>

export default {
  props: ['shopId'],
  data() {
    return {
      shopData: {},
    };
  },
  created() {
    this.$ajax.get({
      url: '/shop/queryByid',
      data: {
        shopid: this.shopId,
      },
    }).then(res => {
      if (res.data.code === 0) {
        this.shopData = res.data.data[0];
      } else {
        this.$Message.error('查询店铺失败！');
      }
    }).catch(e => {
      console.log(e);
      this.$Message.error('查询店铺失败！');
    });
  },
};

</script>

<style>
    .logo{
        width:70px;
        height:70px;
    }
</style>
