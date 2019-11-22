<template>
  <div class="home">
    <div class="hm-top">
      <div class="hm-search">
        <ul id="hm-searchul">
          <li>
            <img src="../assets/images/logos.png" />
          </li>
          <li>
            <input type="text" value="请输入您要搜索的影片" @click="gosearch" />
            <i class="mui-icon mui-icon-search"></i>
          </li>
          <!-- <li>
            <i class="mui-icon mui-icon-star"></i>
          </li> -->
        </ul>
      </div>
      <div class="hm-banner">
        <div id="slider" class="mui-slider">
          <div
            id="sliderSegmentedControl"
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
          >
            <div class="mui-scroll">
              <a
                :class="['mui-control-item',idx==0?'mui-active':'']"
                v-for="(item,idx) in searchoneList"
                :key="item.tid"
                @click="toggle(item.tid)"
              >{{item.tname}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hm-myscroll">
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="lunbo">
            <mt-swipe>
              <mt-swipe-item>
                <img src="../assets/images/lunbo.png"  />
              </mt-swipe-item>
              <mt-swipe-item>
                <img src="../assets/images/lunbo1.png"  />
              </mt-swipe-item>
              <mt-swipe-item>
                <img src="../assets/images/lunbo2.png"  />
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="hm-container">
            <div>
              <span>
                今日热播
                <a href="#">
                  更多热播
                  <i class="mui-icon mui-icon-forward"></i>
                </a>
              </span>
            </div>
            <div class="hm-moivelist">
              <ul>
                <li v-for="item in searchmovieList" :key="item.v_id" @click='play(item.v_id)'>
                  <img v-lazy="item.v_pic"  />
                  <p>{{item.v_name }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.home {
  width: 100%;
  position: relative;
  height: 100%;
  background: linear-gradient(to bottom,  #33a1fd 0%, #32aafa 50%, #ffffff 50%, #ffffff 100%,);
}

.hm-top {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: inherit;
  z-index: 1;
  position: relative;
  background: linear-gradient(to right, #32aafa, #33a1fd);
  // background-color: green;

  .hm-search {
    width: 100%;
    margin-top: 25px;
    height: 40px;
    line-height: 40px;
    // overflow: hidden;

    ul {
      width: 100%;
      height: 100%;
      list-style: none;

      li:nth-child(2) {
        float: left;
        width: 80%;
        position: relative;

        .mui-icon-search {
          position: absolute;
          top: 9px;
          left: 14px;
          color: #1abee6;
        }

        input {
          width: 100%;
          height: 34px;
          border: 0px;
          border-radius: 17px;
          font-size: 13px;
          padding-left: 44px;
          overflow: hidden;
          color: #1abee6;
        }
      }
      li:first-child {
        float: left;
        width: 12%;
        text-align: center;

        img {
          width: 34px;
          height: 34px;
        }
      }

      
    }
  }
  .hm-banner {
    color: white !important;

    .mui-control-item {
      font-size: 14px;
      padding: 0 17px !important;
    }

    .mui-control-item.mui-active {
      color: white !important;
      // border-bottom:2px solid white;
      font-size: 18px;
    }
  }
}
.hm-myscroll {
  height: 81%;
  position: relative;

  .lunbo {
    height: 202px;

    .mint-swipe {
      .mint-swipe-item {
        img {
          width: 100%;
          height: 100%;
          background-size: cover;
        }
      }
    }
  }

  .hm-container {
    width: 100%;
    height: 98%;
    background-color: white;
    overflow: hidden;

    span {
      display: block;
      margin: 30px 14px 20px;
      font-size: 20px;
      width: 92%;
      height: 30px;
      line-height: 30px;
      overflow: hidden;

      a {
        float: right;
        font-size: 16px;
        color: black;
      }
    }

    ul {
      margin: 0 auto;
      width: 98%;
      overflow: hidden;
      list-style: none;

      li {
        display: block;
        width: 106px;
        height: 192px;
        margin: 0 8px 20px;
        float: left;
       
        img {
          width: 106px;
          height: 159px;
          border-radius: 8px;
          background-size: cover;
        }

        img[lazy="loading"] {
          width: 106px;
          height:159px;
          color: grey;
          background-color: grey;
          margin: auto;
        }

        p {
          display: block;
          width: 96%;
          height: 30px;
          color: #3d3d3d;
          line-height: 30px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
<script>
import mui from "../../lib/mui/js/mui";
import myaxios, {
  searchonelistURL,
  searchmovielistURL,
  searchtuijianURL
} from "../tools/myaxios";
export default {
  data: function() {
    return {
      searchoneList: [],
      searchmovieList: []
    };
  },
  methods: {
    async play(id){
        // console.log(id)
       this.$router.push("/playmovie/"+id);
      let {data}=await myaxios("GET",'/api/updatehit/'+id)    
      this.$store.commit('gethistory',{v_id:id})   
    },
    async toggle(id) {
      if (id == 4) {
        let { data } = await myaxios("GET", searchtuijianURL);
        // console.log(data);
        if (data.status == 0) {
          this.searchmovieList = data.message;
        }
      } else {
        let { data: mdata } = await myaxios("GET", searchmovielistURL + id);
        // console.log(mdata);
        if (mdata.status == 0) {
          this.searchmovieList = mdata.message;
        }
      }
    },
    gosearch(){
      this.$router.push("/home/homeSearch")
    }
  },
  async created() {
    let { data } = await myaxios("GET", searchonelistURL);
    // console.log(data);
    if (data.status == 0) {
      this.searchoneList = data.message;
      this.searchoneList.unshift({ tname: "推荐", tid: 4 });
      // console.log(this.searchoneList);
    }

    let { data: tdata } = await myaxios("GET", searchtuijianURL);
    // console.log(tdata);
    if (tdata.status == 0) {
      this.searchmovieList = tdata.message;
    }
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>
