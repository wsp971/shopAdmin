<style>
  .dishPic{
    width: 100%;
  }
</style>
<template>
  <Row v-show="dishData.name">
    <i-col span="24">
      <Card dis-hover>
        <p slot="title">
          菜品信息
        </p>
        <Row>
          <i-col span="4">
            菜品名称
          </i-col>
          <i-col span="20">
            {{ dishData.name }}
          </i-col>
        </Row>

        <Row>
          <i-col span="4">
            菜品价格
          </i-col>
          <i-col span="20">
            {{ dishData.price }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            菜品原价
          </i-col>
          <i-col span="20">
            {{ dishData.prePrice }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            菜品热量
          </i-col>
          <i-col span="20">
            {{ dishData.heatQuatity }} 千卡
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            菜品评分
          </i-col>
          <i-col span="20">
            {{ dishData.comments | averages }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            收藏人数
          </i-col>
          <i-col span="20">
            {{ dishData.favourites }}
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            菜品标签
          </i-col>
          <i-col span="20">
            <Tag
              v-for="(tag,index) in hasTag "
              :key="index"
              :color="tag.color"
            >
              {{ tag.name }}
            </Tag>
          </i-col>
        </Row>
        <Row>
          <i-col span="4">
            菜品描述
          </i-col>
          <i-col span="20">
            {{ dishData.description }}
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

const tagMap = {
  new: {
    name: '新品', color: 'primary', isCheck: true, key: 'new',
  },
  hot: {
    name: '热门', color: 'error', isCheck: false, key: 'hot',
  },
  saleGood: {
    name: '热卖', color: 'orange', isCheck: false, key: 'saleGood',
  },
  hotter: {
    name: '超火爆', color: 'gold', isCheck: false, key: 'hotter',
  },
  minus: {
    name: '满减', color: 'cyan', isCheck: false, key: 'minus',
  },
  discount: {
    name: '狠优惠', color: 'volcano', isCheck: true, key: 'discount',
  },
  style: {
    name: '有格调', color: 'green', isCheck: false, key: 'style',
  },
  sign: {
    name: '招牌', color: 'red', isCheck: false, key: 'sign',
  },
  newDiscount: {
    name: '新客立减', color: 'pink', isCheck: false, key: 'newDiscount',
  },
  packet: {
    name: '有红包', color: 'geekblue', isCheck: false, key: 'packet',
  }
};

export default {
  filters: {
    averages: arr => {
      if (!arr) {
        return 0;
      }
      return arr.average();
    },
  },
  props: ['dishData'],

  data() {
    return {
      tagMap,
    };
  },

  computed: {
    hasTag() {
      const tags = {};
      if (!this.dishData.name) return tags;
      for (const key in tagMap) {
        if (this.dishData.tags.indexOf(key) > -1) {
          tags[key] = tagMap[key];
        }
      }
      return tags;
    },
  },

  mounted() {

  },

};

</script>
