<template>
  <div class="contain">
    <div class="head">
      <div class="title1">热点</div>
    </div>
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <div class="hotmovies">
          <div class="ranking" v-for="(item,idx) in hotlist" :key="idx">
            <div class="number">{{idx+1}}</div>
            <div class="img" @click='play(item.v_id)'>
              <img v-lazy="item.v_pic" />
            </div>
            <div class="detail">
              <div class="name" @click='play(item.v_id)'>{{item.v_name}}</div>
              <div class="details">
                <div class="area">地区：{{item.v_publisharea}}</div>
                <div class="director">导演：{{item.v_director}}</div>
                <div class="actor">演员：{{item.v_actor}}</div>
              </div>
              <div class="hot">
                <img class="hotpng" src="../assets/images/hot.png" alt />
                <span>{{item.v_hit}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myaxios from "../tools/myaxios";
import mui from "../../lib/mui/js/mui";
export default {
  data: function() {
    return {
      hotlist: []
    };
  },
  methods: {
    async play(id) {
      // console.log(id)
      this.$router.push("/playmovie/" + id);
      let { data } = await myaxios("GET", "/api/updatehit/" + id);
      this.$store.commit('gethistory',{v_id:id})
    }
  },
  async created() {
    let { data } = await myaxios("GET", "/api/gethotmovie");    
    if (data.status == 0) {
      this.hotlist = data.message;
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>
<style lang="less" scoped>
.ranking {
  width: 100%;
  height: 220px;
  // background-color: grey;
  overflow: hidden;
  font-family: "微软雅黑";
}
.hotmovies .ranking:nth-child(1) {
  color: red;
  background: linear-gradient(
    to bottom,
    #0990f8 0%,
    #4faaf0 30%,
    #71bdca 50%,
    rgb(131, 190, 196) 100%
  );
}

.number,
.img,
.detail {
  float: left;
}
img[lazy="loading"] {  
  width: 100%;
  height: 80%;
  margin: auto;
  color: grey;
  background-color: grey
}
.detail {
  width: 52%;
  height: 100%;
  padding-top: 26px;
  padding-left: 16px;
  padding-right: 8px;
  color: black;
  font-size: 14px;

  .name {
    font-size: 18px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hot {
    width: 100%;
    margin-top: 10px;
    .hotpng {
      width: 24px;
      height: 24px;
      //    padding-top: 8px
    }
  }
}
.hotmovies .ranking:nth-child(1) .number {
  color: red;
  font-weight: bold;
}
.hotmovies .ranking:nth-child(1) .detail {
  color: white;
  // font-weight: bold
}
.hotmovies .ranking:nth-child(2) .number {
  color: rgb(180, 53, 53);
  font-weight: bold;
}
.hotmovies .ranking:nth-child(3) .number {
  color: orange;
  font-weight: bold;
}
.director {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.actor {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 40px;
}
.number {
  width: 18%;
  height: 100%;
  font-size: 40px;
  padding-top: 80px;
  text-align: center;
}
.img {
  width: 30%;
  height: 220px;
  padding-top: 26px;
}
.img img {
  width: 100%;
  height: 80%;
  border-radius: 10%
}
.mui-scroll-wrapper {
  margin-top: 92px;
  //    background-color: white
}
.hotmovies {
  height: 100%;
  background-color: white;
}
.head {
  width: 100%;
  height: 92px;
  background-color: #0990f8;
}
.title1 {
  color: white;
  font-size: 30px;
  font-family: "微软雅黑";
  padding-top: 30px;
  padding-left: 10px;
}
.contain {
  height: 100%;
  position: relative;
  //   background-color:white
  // background-color: #0990f8;
  //   margin-top:40px;
  background: linear-gradient(
    to bottom,
    #0990f8 0%,
    #0990f8 40%,
    #ffffff 50%,
    #ffffff 100%
  );
}
</style>