<template>
  <div class="contain">
    <div class="head">
      <div class="title1">电影</div>
    </div>
    <div class="backwhite">
      <div class="typelist">
        <div id="slider" class="mui-slider">
          <div
            id="sliderSegmentedControl"
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
          >
            <div class="mui-scroll">
              <a class="mui-control-item mui-active" @click="selectlist($event)">全部类型</a>
              <a
                class="mui-control-item"
                v-for="item1 in typelist"
                :key="item1.tid"
                @click="selectlist($event)"
              >{{item1.tname}}</a>
            </div>
          </div>
        </div>
        <div id="slider" class="mui-slider">
          <div
            id="sliderSegmentedControl"
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
          >
            <div class="mui-scroll">
              <a class="mui-control-item mui-active" @click="selectlist($event)">全部地区</a>

              <a class="mui-control-item" @click="selectlist($event)">大陆</a>
              <a class="mui-control-item" @click="selectlist($event)">英国</a>
              <a class="mui-control-item" @click="selectlist($event)">美国</a>
              <a class="mui-control-item" @click="selectlist($event)">韩国</a>
              <a class="mui-control-item" @click="selectlist($event)">印度</a>
              <a class="mui-control-item" @click="selectlist($event)">法国</a>
              <a class="mui-control-item" @click="selectlist($event)">日本</a>
              <a class="mui-control-item" @click="selectlist($event)">其他</a>
            </div>
          </div>
        </div>
        <div id="slider" class="mui-slider">
          <div
            id="sliderSegmentedControl"
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
          >
            <div class="mui-scroll">
              <a class="mui-control-item mui-active" @click="selectlist($event)">全部年份</a>
              <a class="mui-control-item" @click="selectlist($event)">2019</a>
              <a class="mui-control-item" @click="selectlist($event)">2018</a>
              <a class="mui-control-item" @click="selectlist($event)">2017</a>
              <a class="mui-control-item" @click="selectlist($event)">2016</a>
              <a class="mui-control-item" @click="selectlist($event)">2015</a>
              <a class="mui-control-item" @click="selectlist($event)">2014</a>
              <a class="mui-control-item" @click="selectlist($event)">more</a>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-scroll-wrapper" id="margin">
        <div class="mui-scroll" id="guiling">
          <div class="movielist" ref="wrapper">
            <mt-loadmore
              :bottom-method="loadBottom"
              :bottom-all-loaded="allLoaded"
              :auto-fill="false"
              ref="loadmore"
            >
              <div
                class="movieactive"
                @touchstart="touchstart($event)"
                @touchmove="touchmove($event)"
                @touchend="touchend($event)"
                v-for="item in showlist1"
                :key="item.v_id"
                @click="play(item.v_id)"
              >
                <img v-lazy="item.v_pic" />
                <div class="movie11">{{item.v_name}}</div>
                <div class="movie22">{{item.v_publishyear}}/{{item.v_publisharea}}/{{item.type}}</div>
              </div>
            </mt-loadmore>
            <div class="footer" v-show="flag">已经到底啦ヽ(≧□≦)ノ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myaxios from "../tools/myaxios";
import mui from "../../lib/mui/js/mui";
import { Popup } from "mint-ui";
import { Loadmore } from "mint-ui";
import Vue from "vue";

// Vue.use()
// import { Lazyload } from 'mint-ui';
export default {
  data: function() {
    return {
      typelist: [],
      movielist: [],
      showlist: [],
      showlist1: [],
      obj: [{ type: "", area: "", year: "" }],
      allLoaded: false,
      a: 0,
      flag: false
    };
  },
  methods: {
    loadBottom() {
      this.a = this.a + 1;
      var arrr = this.showlist.slice(9 * this.a, 9 * (this.a + 1));
      //  document.querySelector('.movielist').style.height=(552*this.a)+'px'
      if (arrr.length == 9) {
        arrr.forEach(item => {
          this.showlist1.push(item);
        });
      } else {
        this.allLoaded = true;
        this.flag = true;
        document.querySelector(".mint-loadmore-text").style.display = "none";
      }
    },
    touchstart(e) {
      if (
        e.target.parentNode.className == "movieactive" ||
        e.target.parentNode.className == "movieintroduce"
      ) {
        e.target.parentNode.className = "movieintroduce";
      }
    },
    touchmove(e) {
      //  console.log(e.target)
      if (e.target.parentNode.className == "movieintroduce") {
        e.target.parentNode.className = "movieintroduce";
      }
    },
    touchend(e) {
      //  console.log(e.target,111111111)
      if (e.target.parentNode.className == "movieintroduce") {
        e.target.parentNode.className = "movieactive";
      }
    },
    async play(id) {
      this.$router.push("/playmovie/" + id);
      let { data } = await myaxios("GET", "/api/updatehit/" + id);
      this.$store.commit("gethistory", { v_id: id });
    },
    selectlist(e) {
      this.showlist = [];
      this.a = 0;
      // document.querySelector('#margin').style.height=552+'px!important'
      // document.querySelector('#margin').style.height=552+'px'
      // document.querySelector('#margin').style.height=0
      // document.querySelector('#margin').style.height='72%'
      //  document.querySelector('#guiling').style.transform='translate3d(0px, 0px, 0px)!important'
      // document.querySelector('.mui-scroll').style.height='100%'
      //  console.log(e.target.style)
      //    this.aylist=this.movielist.filter(item=>{
      //        return this.movielist.type=='科幻片'&&this.movielist.v-publisharea=='香港'&&this.movielist.v-publishyear==2017
      //    })
      //    console.log(this.aylist)
      var typearr = [
        "全部类型",
        "动作片",
        "爱情片",
        "科幻片",
        "恐怖片",
        "战争片",
        "喜剧片",
        "纪录片",
        "剧情片"
      ];
      var areaarr = [
        "全部地区",
        "大陆",
        "英国",
        "美国",
        "韩国",
        "印度",
        "法国",
        "日本",
        "其他"
      ];
      // var areaarr1=['全部地区','中国','大陆','香港','美国','韩国','印度','日本','其他']
      var yeararr = [
        "全部年份",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "more"
      ];

      if (typearr.includes(e.target.innerHTML)) {
        this.obj[0].type = e.target.innerHTML;
      } else if (areaarr.includes(e.target.innerHTML)) {
        this.obj[0].area = e.target.innerHTML;
      } else if (yeararr.includes(e.target.innerHTML)) {
        this.obj[0].year = e.target.innerHTML;
      }
      if (this.obj[0].type == "全部类型" || this.obj[0].type == "") {
        if (this.obj[0].area == "全部地区" || this.obj[0].area == "") {
          if (this.obj[0].year == "全部年份" || this.obj[0].year == "") {
            this.showlist = this.movielist;
            this.showlist1 = this.showlist.slice(0, 9);
          } else if (this.obj[0].year == "more") {
            this.showlist = this.movielist.filter(item => {
              return item.v_publishyear < 2014;
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else {
            this.showlist = this.movielist.filter(item => {
              return item.v_publishyear == this.obj[0].year;
            });
            this.showlist1 = this.showlist.slice(0, 9);
          }
        } else if (this.obj[0].area == "其他") {
          if (this.obj[0].year == "全部年份" || this.obj[0].year == "") {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publisharea != "中国" &&
                item.v_publisharea != "大陆" &&
                item.v_publisharea != "香港" &&
                item.v_publisharea != "美国" &&
                item.v_publisharea != "韩国" &&
                item.v_publisharea != "印度" &&
                item.v_publisharea != "日本"
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else if (this.obj[0].year == "more") {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear < 2014 &&
                item.v_publisharea != "中国" &&
                item.v_publisharea != "大陆" &&
                item.v_publisharea != "香港" &&
                item.v_publisharea != "美国" &&
                item.v_publisharea != "韩国" &&
                item.v_publisharea != "印度" &&
                item.v_publisharea != "日本"
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear == this.obj[0].year &&
                item.v_publisharea != "中国" &&
                item.v_publisharea != "大陆" &&
                item.v_publisharea != "香港" &&
                item.v_publisharea != "美国" &&
                item.v_publisharea != "韩国" &&
                item.v_publisharea != "印度" &&
                item.v_publisharea != "日本"
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          }
        } else {
          if (this.obj[0].year == "全部年份" || this.obj[0].year == "") {
            this.showlist = this.movielist.filter(item => {
              return item.v_publisharea == this.obj[0].area;
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else if (this.obj[0].year == "more") {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear < 2014 &&
                item.v_publisharea == this.obj[0].area
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear == this.obj[0].year &&
                item.v_publisharea == this.obj[0].area
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          }
        }
      } else {
        if (this.obj[0].area == "全部地区" || this.obj[0].area == "") {
          if (this.obj[0].year == "全部年份" || this.obj[0].year == "") {
            this.showlist = this.movielist.filter(item => {
              return item.type == this.obj[0].type;
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else if (this.obj[0].year == "more") {
            this.showlist = this.movielist.filter(item => {
              return item.v_publishyear < 2014 && item.type == this.obj[0].type;
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear == this.obj[0].year &&
                item.type == this.obj[0].type
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          }
        } else if (this.obj[0].area == "其他") {
          if (this.obj[0].year == "全部年份" || this.obj[0].year == "") {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publisharea != "中国" &&
                item.v_publisharea != "大陆" &&
                item.v_publisharea != "香港" &&
                item.v_publisharea != "美国" &&
                item.v_publisharea != "韩国" &&
                item.v_publisharea != "印度" &&
                item.v_publisharea != "日本" &&
                item.type == this.obj[0].type
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else if (this.obj[0].year == "more") {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear < 2014 &&
                item.v_publisharea != "中国" &&
                item.v_publisharea != "大陆" &&
                item.v_publisharea != "香港" &&
                item.v_publisharea != "美国" &&
                item.v_publisharea != "韩国" &&
                item.v_publisharea != "印度" &&
                item.v_publisharea != "日本" &&
                item.type == this.obj[0].type
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear == this.obj[0].year &&
                item.v_publisharea != "中国" &&
                item.v_publisharea != "大陆" &&
                item.v_publisharea != "香港" &&
                item.v_publisharea != "美国" &&
                item.v_publisharea != "韩国" &&
                item.v_publisharea != "印度" &&
                item.v_publisharea != "日本" &&
                item.type == this.obj[0].type
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          }
        } else {
          if (this.obj[0].year == "全部年份" || this.obj[0].year == "") {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publisharea == this.obj[0].area &&
                item.type == this.obj[0].type
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else if (this.obj[0].year == "more") {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear < 2014 &&
                item.v_publisharea == this.obj[0].area &&
                item.type == this.obj[0].type
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          } else {
            this.showlist = this.movielist.filter(item => {
              return (
                item.v_publishyear == this.obj[0].year &&
                item.v_publisharea == this.obj[0].area &&
                item.type == this.obj[0].type
              );
            });
            this.showlist1 = this.showlist.slice(0, 9);
          }
        }
      }
      if (this.showlist1.length != 9) {
        this.flag = true;
        this.allLoaded = true;
        document.querySelector(".mint-loadmore-text").style.display = "none";
      } else {
        this.flag = false;
        this.allLoaded = false;
        document.querySelector(".mint-loadmore-text").style.display = "block";
      }
      // console.log(this.showlist1)
      mui("#margin")
        .scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
        .scrollTo(0, 0, 100);
    }
  },
  async created() {
    let { data } = await myaxios("GET", "/api/getallmovie");
    if (data.status == 0) {
      this.movielist = data.message;
      this.showlist = data.message;
      this.showlist1 = data.message.slice(0, 9);
    }
    this.movielist.forEach(item => {
      if (item.tid == 5) {
        item.type = "动作片";
      }
      if (item.tid == 6) {
        item.type = "爱情片";
      }
      if (item.tid == 7) {
        item.type = "科幻片";
      }
      if (item.tid == 8) {
        item.type = "恐怖片";
      }
      if (item.tid == 9) {
        item.type = "战争片";
      }
      if (item.tid == 10) {
        item.type = "喜剧片";
      }
      if (item.tid == 11) {
        item.type = "纪录片";
      }
      if (item.tid == 12) {
        item.type = "剧情片";
      }
    });
    let { data: idata } = await myaxios("GET", "/api/getonelist");
    if (idata.status == 0) {
      this.typelist = idata.message;
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  updated() {},
  watch: {
    // touchstart:function(e){
    //   console.log(e)
    // }
  }
};
</script>

<style lang='less' scoped>
#margin {
  margin-top: 176px;
  height: 72%;
  // background-color: transparent
}
.footer {
  width: 100%;
  color: #0990f8;
  font-size: 20px;
  font-family: "微软雅黑";
  text-align: center;
  padding-top: 10px;
}
.mui-control-item.mui-active {
  //    cursor: pointer;
  // color: #0990f8;
  // border: 1px solid white;
  // background-color: rgb(201, 199, 199);
  // border-radius: 35%;
}
.mint-header {
  height: 0px;
}
.head {
  width: 100%;
  height: 20%;
}
.movieintroduce .moviename {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.backwhite {
  width: 100%;
  height: 80%;
  // background-color: white;
}
img {
  width: 90%;
  height: 130px;
  border-radius: 10%;
}
img[lazy="loading"] {
  width:100%;
  height: 130px;
  margin: auto;
  color: grey;
  background-color: grey;
}
.movielist {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
}
.movieintroduce {
  width: 30%;
  height: 180px;
  float: left;
  margin-left: 10px;
  text-align: center;
  background-color: rgb(228, 226, 226);
  border: 1px solid rgb(196, 195, 195);
  border-radius: 10%;  
  font-size: 14px;
  margin-top: 4px;
  .movie11 {
    width: 96%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }  
}
.movieactive { 
  box-shadow: 4px 2px 4px rgb(168, 166, 166);
  width: 30%;
  height: 180px;
  float: left;
  margin-left: 10px;
  text-align: center;
  background-color: rgb(228, 226, 226);
  border: 1px solid rgb(196, 195, 195);
  border-radius: 10%;  
  font-size: 14px;
  margin-top: 4px;
  .movie11 {
    width: 96%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }  
}
.mui-segmented-control .mui-scroll {
  font-size: 16px;
}

.type {
  font-family: "微软雅黑";
  display: inline-block;
  margin-left: 5px;
  height: 80%;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 1px 0;
  //   margin-top:2px;
  color: black;
}
.mui-slider .type {
  margin-left: 30px;
}
.mui-slider .type:nth-child(1) {
  margin-left: 20px;
}
.title1 {
  color: white;
  font-size: 30px;
  font-family: "微软雅黑";
  padding-top: 20px;
  padding-left: 10px;
}
.contain {
  height: 100%;
  position: relative; 
}
.mint-tabbar {
  display: none;
}
.head {
  width: 100%;
  height: 60px;
  background-color: #0990f8;
}
</style>
