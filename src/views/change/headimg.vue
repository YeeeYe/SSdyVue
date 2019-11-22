<template>
  <div class="abc">
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <!--这里放置真实显示的DOM内容-->
        <div class="container">
          <div ref="com" class="img-con" v-for="item in imglist" :key="item.id">            
              <img :src="item.headimg_url" @click="goback(item.headimg_url)"/>           
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  height: 100%;
  // padding-bottom: 0px
}
.img-con {
  padding: 1px;
  width: 123px;
  height: 123px;
  border: 1px solid gray;
  float: left;
  margin: 1px;
  // box-sizing:border-box;
  img {
    width: 98%;
    height: 98%;
    border-radius: 5px;
  }
}
.abc {
  position: relative;
  height: 110%;
}
</style>

<script>
import myaxios from "../../tools/myaxios";
import mui from '../../../lib/mui/js/mui'
export default {
  data: function() {
    return {
      imglist: []     
    };
  },
  methods: {
    goback(url) {
      // console.log(url)
      this.$store.commit('changeback',{isBack:true})
      this.$router.push({name:'change',params:{url:url}})      
    },  
  },

  mounted() {  
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  async created() {
    let { data } = await myaxios("GET", "/api/getheadimg");
    this.imglist = data.message;   
  }
};
</script>