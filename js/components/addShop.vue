<template>
  <my-layout current-menu="addShop">
    <template slot="breadCrumb">
      <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>增加店铺</BreadcrumbItem>
      </Breadcrumb>
    </template>
    <template slot="content">
      <Content
        slot="content"
        :style="{padding: '24px', minHeight: '200px', background: '#fff'}"
      >
        <form
          class="form"
          name="shopForm"
        >
          <div class="formGroup">
            <Row>
              <i-col
                span="16"
                offset="4"
              >
                <Alert
                  v-show="errTip"
                  type="error"
                  show-icon
                >
                  {{ errTip }}
                </Alert>
              </i-col>
            </Row>
          </div>
          <div class="formGroup">
            <Row>
              <i-col
                span="3"
                offset="4"
              >
                <label for="">
                  店铺名称：
                </label>
              </i-col>
              <i-col span="13">
                <Input
                  v-model="shopName"
                  placeholder="请输入店铺名称"
                  name="name"
                  size="large"
                />
              </i-col>
            </Row>
          </div>
          <div class="formGroup">
            <Row>
              <i-col
                span="3"
                offset="4"
              >
                <label for="">联系人/法人：</label>
              </i-col>
              <i-col span="13">
                <Input
                  v-model="contacts"
                  placeholder="请输入联系人"
                  name="contacts"
                  size="large"
                />
              </i-col>
            </Row>
          </div>
          <div class="formGroup">
            <Row>
              <i-col
                span="3"
                offset="4"
              >
                <label for="">联系电话：</label>
              </i-col>
              <i-col span="13">
                <Input
                  v-model="phone"
                  placeholder="请输入联系电话"
                  name="phone"
                  size="large"
                />
              </i-col>
            </Row>
          </div>

          <div class="formGroup">
            <Row>
              <i-col
                span="3"
                offset="4"
              >
                <label for="">logo：</label>
              </i-col>
              <i-col span="13">
                <div
                  v-for="(item,index) in uploadList"
                  :key="index"
                  class="demo-upload-list"
                >
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-eye-outline"
                        @click.native="handleView(item.url)"
                      />
                      <Icon
                        type="ios-trash-outline"
                        @click.native="handleRemove(item)"
                      />
                    </div>
                  </template>

                  <template v-else>
                    <Progress
                      v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info
                    />
                  </template>
                </div>

                <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :action="uploadAction"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-success="handleSuccess"
                  multiple
                  type="drag"
                  name="fileInput"
                  style="display:inline-block;width:58px;"
                  :style="{visibility: isHidden}"
                >
                  <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon
                      type="ios-camera"
                      size="20"
                    />
                  </div>
                </Upload>
              </i-col>
            </Row>
          </div>

          <input
            type="hidden"
            name="favourite"
            value="0"
          />

          <div class="formGroup">
            <Row>
              <i-col
                span="3"
                offset="4"
              >
                <label for="">地址：</label>
              </i-col>
              <i-col span="13">
                <Input
                  v-model="address"
                  placeholder="请输入地址"
                  name="address"
                  size="large"
                />
              </i-col>
              <i-col
                span="2"
                style="margin-left:5px;"
              >
                <Button
                  type="info"
                  icon="ios-search"
                  @click.stop="searchKeyword"
                >
                  查询
                </Button>
              </i-col>
            </Row>
          </div>

          <div class="formGroup">
            <Row>
              <i-col
                span="3"
                offset="4"
              >
                <label for="">地理位置：</label>
              </i-col>
              <i-col span="13">
                <div id="mapContainer">
                  <span class="city">{{ this.city }}</span>
                </div>
              </i-col>
            </Row>
          </div>

          <div class="formGroup">
            <Row>
              <i-col
                span="4"
                offset="8"
              >
                <Button
                  type="info"
                  icon="md-checkmark"
                  @click.stop="createShop"
                >
                  {{ this.isModify? '修改店铺': '创建店铺' }}
                </Button>
              </i-col>
              <i-col span="4">
                <Button
                  type="error"
                  icon="md-close"
                  @click.stop="cancel"
                >
                  取消
                </Button>
              </i-col>
            </Row>
          </div>
        </form>
        <Modal
          v-model="visible"
          title="View Image"
        >
          <img
            v-if="visible"
            :src="viewPic"
            style="width: 100%"
          />
        </Modal>
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
    const uploadAction = '//aoshiman.com.cn/shopServer/shop/upload';
    const StorageShop = JSON.parse(sessionStorage.getItem('modifyShopData'));
    sessionStorage.removeItem('modifyShopData');
    if (StorageShop) {
      return {
        viewPic: '',
        visible: false,
        errTip: '',
        city: '',
        shopName: StorageShop.name,
        contacts: StorageShop.contacts,
        logo: StorageShop.logo,
        phone: StorageShop.phone,
        address: StorageShop.address,
        modifyShop: StorageShop,
        uploadAction,
        latLng: StorageShop.latLng,
        uploadList: [],
        defaultList: [{
          url: StorageShop.logo,
        }],
        markers: [],
      };
    }
    return {
      viewPic: '',
      visible: false,
      errTip: '',
      shopName: '',
      contacts: '',
      phone: '',
      address: '',
      uploadAction,
      uploadList: [],
      defaultList: [],
      clientIp: '',
      city: '',
      marker: {},
      markers: [],
      searchService: '',
      latLng: {},
    };
  },
  computed: {
    isModify() {
      return !!this.modifyShop;
    },
    isHidden() {
      return this.uploadList.length > 0 ? 'hidden' : 'visible';
    },
  },
  mounted() {
    console.log(this.$refs.upload.fileList);
    this.uploadList = this.$refs.upload.fileList;
    this.getClientIp()
      .then(this.initMap)
      .then(this.getCityByIp)
      .then(this.serchService);
  },
  methods: {
    createShop() {
      this.errTip = '';
      if (!this.shopName) {
        this.errTip = '请输入店铺名称！';
        return;
      }
      if (!this.contacts) {
        this.errTip = '请输入联系人';
        return;
      }
      if (!this.phone || !/[\d-]{7,11}/.test(this.phone)) {
        this.errTip = '请输入正确的电话号码';
        return;
      }
      if (!this.address) {
        this.errTip = '请输入地址';
        return;
      }
      if (!this.uploadList[0]) {
        this.errTip = '请上传店铺logo';
        return;
      }

      let shopData = {
        city: this.city,
        name: this.shopName,
        phone: this.phone,
        address: this.address,
        favourite: 0,
        logo: this.uploadList[0].url,
        contacts: this.contacts,
        lat: this.latLng.lat,
        lng: this.latLng.lng,
        latLng: this.latLng,
      };

      if (this.modifyShop) {
        shopData = { ...this.modifyShop, ...shopData };
        this.$ajax.post({
          url: '/shop/update',
          data: shopData,
        }).then(res => {
          if (res.data.code === 0) {
            this.$Message.success('修改成功！');
            setTimeout(() => {
              this.$linkPage('/html/shopList.html');
            }, 1000);
          } else {
            this.$Message.error('修改失败');
          }
        });
        return;
      }
      this.$ajax.post({
        url: '/shop/insert',
        data: shopData,
      }).then(res => {
        if (res.data.code === 0) {
          this.$Message.success('创建成功！');
          setTimeout(() => {
            this.$linkPage('/html/shopList.html');
          }, 1000);
        } else {
          this.$Message.error('创建失败');
        }
      }).catch(e => {
        console.log(e);
        this.$Message.error('创建失败');
      });
    },
    cancel() {
      this.$linkPage('/html/shopList.html');
    },
    handleView(pic) {
      this.viewPic = pic;
      this.visible = true;
    },
    handleRemove(file) {
      const { fileList } = this.$refs.upload;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },

    getClientIp() {
      return this.$ajax.get({
        url: '/shop/getClientIp',
      }).then(res => {
        this.clientIp = res.data.ip;
        if (this.clientIp === '127.0.0.1') {
          // 测试 todo 删除
          this.clientIp = '119.123.68.151';
        }
      });
    },

    handleSuccess(res, file) {
      file.url = file.response.filename;
    },
    /* global qq  */
    // 根据ip 查询城市信息，渲染城市所在地图
    getCityByIp() {
      const self = this;
      // 获取  城市位置信息查询 接口
      return new Promise(resolve => {
        const citylocation = new qq.maps.CityService({
          // 设置地图
          map: this.map,
          complete(results) {
            // city.style.display = 'inline';
            // city.innerHTML = '所在位置: ' + results.detail.name;
            self.city = results.detail.name;
            // 设置 店铺位置为当前地图中央
            const position = results.detail.latLng;
            if (self.latLng.lat) {
              position.lat = parseFloat(self.latLng.lat);
              position.lng = parseFloat(self.latLng.lng);
            }
            self.map.setCenter(position);
            self.marker = new qq.maps.Marker({// 设置marker标记
              // icon: new qq.maps.MarkerImage(
              //   'http://aoshiman.com.cn/uploads/1593341238469.png',
              //   new qq.maps.Size(42, 68),
              // ),
              map: self.map,
              position,
              draggable: true,
            });
            // self.markers.push(self.marker);
            qq.maps.event.addListener(self.marker, 'click', event => {
              // 转换 经纬度 为 地理位置
              const geocoder = new qq.maps.Geocoder();
              geocoder.setError(err => {
                console.log('err', err);
              });
              geocoder.setComplete(result => {
                console.log('address', result);
                self.address = result.detail.address;
              });
              // 根据经纬度获取地理位置
              geocoder.getAddress(event.latLng);
              self.latLng = event.latLng;
            });
            resolve();
          },
        });
        citylocation.searchCityByIP(this.clientIp);
      });
    },
    // 查询对应的店铺
    serchService() {
      const latlngBounds = new qq.maps.LatLngBounds();
      // 设置Poi检索服务，用于本地检索、周边检索
      const self = this;
      this.searchService = new qq.maps.SearchService({
        // 设置搜索范围为北京
        location: this.city,
        // 设置搜索页码为1
        pageIndex: 1,
        // 设置每页的结果数为5
        pageCapacity: 5,
        // 设置展现查询结构到infoDIV上
        // panel: document.getElementById('infoDiv'),
        // 设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
        autoExtend: true,
        // 检索成功的回调函数
        complete(results) {
          // 设置回调函数参数
          const { pois } = results.detail;
          for (let i = 0, l = pois.length; i < l; i++) {
            const poi = pois[i];
            // 扩展边界范围，用来包含搜索到的Poi点
            latlngBounds.extend(poi.latLng);
            (function gene(n) {
              const marker = new qq.maps.Marker({
                map: self.map,
                position: poi.latLng,
                animation: qq.maps.MarkerAnimation.BOUNCE
              });
              marker.setTitle(i + 1);
              self.markers.push(marker);
              qq.maps.event.addListener(marker, 'click', () => {
                console.log(pois[n]);
                self.address = pois[n].address;
                self.latLng = pois[n].latLng;
              });
            }(i));
          }
          // 设置可拖拽 market 到 搜索区域中央，仍然可以调整位置
          const center = latlngBounds.getCenter();
          self.marker.setPosition(center);
          // 调整地图视野
          self.map.fitBounds(latlngBounds);
        },
        // 若服务请求失败，则运行以下函数
        error() {
          console.log('出错了。');
        },
      });
    },

    // 设置搜索的范围和关键字等属性
    searchKeyword() {
      // var keyword = document.getElementById("keyword").value;
      this.clearOverlays(this.markers);
      // 根据输入的城市设置搜索范围
      // searchService.setLocation("北京");
      // 根据输入的关键字在搜索范围内检索
      const keyword = this.address;
      this.searchService.search(keyword);
    },
    // 清除地图上的marker
    clearOverlays(overlays) {
      let overlay = overlays.pop();
      while (overlay) {
        overlay.setMap(null);
        overlay = overlays.pop();
      }
    },

    // 初始化地图
    initMap() {
      this.map = new qq.maps.Map(document.getElementById('mapContainer'), {
        zoom: 13,
      });

      // 根据ip 来定位城市。

      // this.serchService();
      //   标注覆盖物
      // eslint-disable-next-line no-new
      // new qq.maps.LatLng(39.914850, 116.403765);
    },
    // geolocation_ip();
    //
    // function geolocation_ip() {
    //    // var clientip = document.getElementById("client_ip").value;
    //    // var city = document.getElementById("city");
    //    //调用查询ip接口查询信息
    //
    //
    // }

    // 向地图添加监听事件
    // let clickListener = qq.maps.event.addListener(map,'click',(event)=>{
    //
    // console.log('您点击了地图');
    // console.log('您点击的位置是：',event.latLng.getLng(),event.latLng.getLat());
    //
    // });

    // 添加比例尺控件

    // var scaleControl = new qq.maps.ScaleControl({
    //    align: qq.maps.ALIGN.BOTTOM_LEFT,
    //    margin: qq.maps.Size(85, 15),
    //    map: map
    // });

    // 获取缩放级别
    // var zoomLevelControl = new qq.maps.Control(
    //    {
    //        content: '缩放级别:' + map.getZoom(),
    //        align: qq.maps.ALIGN.TOP,
    //        map: map
    //    }
    // );

    // 创建marker
    // var marker = new qq.maps.Marker({
    //    position: center,
    //    map: map,
    //    draggable: true
    // });

    // marker.setDraggable(true);

    // 添加到提示窗
    // var info = new qq.maps.InfoWindow({
    //    map: map
    // });

    // qq.maps.event.addListener(marker, 'click', function(event) {
    //    info.open();
    //    info.setContent('<div style="text-align:center;white-space:nowrap;'+
    //        'margin:10px;">单击标记</div>');
    //    info.setPosition(center);
    //
    //    console.log('您点击的标记是：',event.latLng.getLng(),event.latLng.getLat());
    //
    // });

    // }
  },
};

</script>

<style scoped>
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
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .hidden{
        visibility: hidden;
    }

    #mapContainer{
        width: 420px;
        height: 400px;
        position:relative;
    }
    .city{
        position:absolute;
        top:0;
        left:50%;
        font-size:20px;
        color:red;
        transform: translateX(-50%);
        z-index:100;
    }

</style>
