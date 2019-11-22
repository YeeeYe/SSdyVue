<template>
  <div class="playmovie">
    <a href="#" @click.prevent="goback" class="mui-icon mui-icon-undo" slot="left">
        
      </a>
    <iframe
      class="iframe"
      v-show="flag"
      :src="url"
      width="100%"
      height="250px"
      frameborder="0"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
    ></iframe>
    <div class="erro" v-if="!flag">抱歉，地址丢失,已无法播放！</div>
    <div class="selectmd">
      <div id="introduce" class="active" @click="change1($event)">简介</div>
      <div id="comment" @click="change2($event)">评论</div>
    </div>

    <div class="bottom">
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="introducemovie" v-show="flag1">
            <div class="moviename">
              <span>{{intro.v_name}}</span>
              <span
                class="mui-icon-extra mui-icon-extra-heart"
                id="star"
                @click="collection(intro.v_id)"
              ></span>
            </div>
            <div class="moviedetail">
              <div class="director">导演：{{intro.v_director}}</div>
              <div class="actor">演员：{{intro.v_actor}}</div>
              <div class="area">地区：{{intro.v_publisharea}}</div>
              <div class="year">年代：{{intro.v_publishyear}}</div>
            </div>
            <div class="content">
              <div class="content1">概要</div>
              <div class="moviecontent">{{content}}</div>
            </div>
          </div>
          <div class="commentlist" v-if="!flag1">
            <textarea ref="msg" class="writecomment" placeholder="请输入评论（最多120字）" maxlength="130"></textarea>
            <input type="button" class="input" value="提交评论" @click="postcom()" />
            <div class="commentlist1">
              <div class="comments" v-show="ff">
                <div class="showcomment1">{{nocomment[0].msg}}</div>
              </div>
              <!-- <transition :name='transitionName' > -->
                <div class="comments" v-for="(item,idx) in commentlist" :key="idx">
                <div class="head">
                  <img :src="item.headurl" alt />
                </div>
                <div class="information">
                  <p class="name">{{item.nickname}}</p>
                  <p class="time">{{item.dtime}}</p>
                </div>
                <div class="showcomment">{{item.msg}}</div>
              </div>
              <!-- </transition> -->            
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
import { Toast } from "mint-ui";
import { MessageBox } from 'mint-ui';
export default {
  data: function() {
    return {
      id: this.$route.params.id,
      flag: false,
      flag1: true,
      ff: false,
      url: "",
      intro: [],
      content: "",
      commentlist: [],
      nocomment: [{ msg: "暂时还没有人评论，快来抢个沙发吧！" }],
      // transitionName:'slide-left'
    };
  },
  methods: {
    goback() {
      // debugger
      //回退到前一个页面
      this.$store.commit('changeback',{isBack:true})
      this.$router.go(-1);
    },
    async postcom() {
      var obj = { msg: "", nickname: "", headimg: "", dtime: "" };
      var pushobj = {
        msg: "",
        nickname: "",
        headurl: "",
        dtime: ""
      };
      var time = new Date();
      var a = time.toLocaleString();
      let res = [];
      // console.log(a)
     if(this.$store.state.loginornot.length==0){
Toast("请先登录！");
     }else {
        if (this.$store.state.loginornot[0].sign == true) {
        if (this.$refs.msg.value == "") {
          Toast("请输入内容！");
        } else {
          obj.nickname = this.$store.state.loginuser[0].nickname;
          obj.dtime = a;
          // obj.id=this.id;
          obj.headimg = this.$store.state.loginuser[0].head.substring(25);
          obj.msg = this.$refs.msg.value;
          let { data } = await myaxios(
            "POST",
            "/api/postcomment/" + this.id,
            obj
          );
          if (data.status == 0) {
            pushobj.msg = obj.msg;
            pushobj.nickname = obj.nickname;
            pushobj.headurl = this.$store.state.loginuser[0].head;
            pushobj.dtime = a;
            this.commentlist.unshift(pushobj);
            this.ff = false;
            this.$refs.msg.value=''
            MessageBox('提示', '评论成功!');
          }
        }
      } else {
        Toast("请先登录！");
      } 
     }

          
    },
    collection(id) {
      //   console.log(this.$store.state.loginornot[0].sign)
      var doc = document.querySelector("#star");
      if(this.$store.state.loginornot.length==0){
         Toast("请先登录！");
      }else{
         if (this.$store.state.loginornot[0].sign == true) {
        //   console.log(doc.className)
        if (doc.className == "mui-icon-extra mui-icon-extra-heart") {
          doc.className = "mui-icon-extra mui-icon-extra-heart-filled";
          MessageBox('提示', '收藏成功!');
          this.$store.commit("collect", {
            username: this.$store.state.loginuser[0].username,
            v_id: this.id
          });
        } else {
          this.$store.commit("deletecollect", {
            username: this.$store.state.loginuser[0].username,
            v_id: this.id
          });
          doc.className = "mui-icon-extra mui-icon-extra-heart";
          MessageBox('提示', '已取消收藏!');
        }
      } else {
        Toast("请先登录！");
      }
      }

      
    },
    change1() {
      this.flag1 = true;
      document.querySelector("#introduce").className = "active";
      document.querySelector("#comment").className = "";
    },
    change2() {
      this.flag1 = false;
      document.querySelector("#introduce").className = "";
      document.querySelector("#comment").className = "active";
    }
  },
  async created() {
    let { data } = await myaxios("GET", "/api/playIdMovie/" + this.id);
    if (data.status == 0) {
      this.flag = true;
      // var uull=data.message.match(/http(\S*)/)[1]
      // console.log(uull.indexOf('index.m3u8..'),1111111111)      
      var cuturl = data.message.match(/http(\S*)/)[1];
      //    console.log(cuturl,'aa')
      this.url = "http://www.dplayer.tv/?url=http" + cuturl + "/index.m3u8";
    } else {
      this.flag = false;
    }
    let { data: idata } = await myaxios("GET", "/api/getcontent/" + this.id);
    if (idata.status == 0) {
      this.content = idata.message;
    }
    let { data: adata } = await myaxios("GET", "/api/getintroduce/" + this.id);
    if (adata.status == 0) {
      this.intro = adata.message[0];
      //    console.log(this.intro)
    }
    // console.log(this.url,2222222)
    
    
    
    

    if(this.$store.state.loginornot.length==0){
       document.querySelector("#star").className =
          "mui-icon-extra mui-icon-extra-heart";
    }else {
      if (this.$store.state.loginornot[0].sign == true) {
        var coll = this.$store.getters.getcollect;
    // console.log(this.$store.state.loginuser[0].username)
    var coll1 = coll.filter(item => {
      return (
        item.v_id == this.id &&
        item.username == this.$store.state.loginuser[0].username
      );
    });
      if (coll1.length == 0) {
        document.querySelector("#star").className =
          "mui-icon-extra mui-icon-extra-heart";
      } else {
        document.querySelector("#star").className =
          "mui-icon-extra mui-icon-extra-heart-filled";
      }
    }
    }
    
    
    
    let { data: com } = await myaxios("GET", "/api/getcomments/" + this.id);
    // console.log(com)
    if (com.status == 0) {
      this.commentlist = com.message;
      this.ff = false;
    } else {
      this.ff = true;
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
// /*左边进入*/
// .slide-left-enter {
//   -webkit-transform: translate(100%, 0);
//   transform: translate(100%, 0);
// }
// /*左边离开*/
// .slide-left-leave-to {
//   -webkit-transform: translate(-100%, 0);
//   transform: translate(-100% 0);
//   position: absolute;
// }

// /*右边进入*/
// .slide-right-enter {
//   -webkit-transform: translate(-100%, 0);
//   transform: translate(-100% 0);
// }
// /*右边离开*/
// .slide-right-leave-to {
//   -webkit-transform: translate(100%, 0);
//   transform: translate(100%, 0);
//   position: absolute;
// }

// /*进入退出动画*/
// .slide-right-enter-active,
// .slide-left-enter-active,
// .slide-right-leave-active,
// .slide-left-leave-active {
//   transition: all 0.5s ease;
// }
.playmovie>a {
  position: fixed;
  top: 0;
  left:0;
  color: white;
  font-size: 28px;
  background-color: rgba(white, white, white, 0);
  z-index: 50;
  display: inline-block;
  width: 30px;
  height: 30px;
}

.showcomment1 {
  font-size: 16px;
  text-align: center;
}
.showcomment {
  width: 100%;
  height: 110px;
  position: absolute;
  top: 91px;
}
.head {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 14px;
  overflow: hidden;
  display: inline-block;
  float: left;
}
.name {
  color: black;
}
.head img {
  width: 70px;
  height: 70px;
  // border-radius: 50%;
  // display: block
}
.comments {
  width: 94%;
  height: 200px;
  background-color: white;
  font-size: 14px;
  font-family: "微软雅黑";
  margin: 8px 8px 8px 8px;
  padding-left: 10px;
  background-color: lightgrey;
  box-shadow: 6px 6px 6px grey;
  position: relative;
  transition: width 0.5s;
}

.information {
  display: inline-block;
  height: 70px;
  width: 50%;
  margin-left: 10px;
  margin-top: 14px;
  padding-top: 6px;
  float: left;
}
.commentlist {
  width: 100%;
  height: 100%;
  // background-color: red;
  position: relative;
}
.writecomment {
  width: 100%;
  height: 100px;
  border: 2px solid lightskyblue;
  margin-bottom: 2px;
  font-size: 14px;
}
.bottom {
  width: 100%;
  height: 100%;
  // height: 600px;
  // padding-top: 100px;
  //   overflow: hidden;
}
.moviecontent {
  padding-top: 10px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  //   white-space: nowrap;
  // height: 100px;
  font-family: "微软雅黑";
  color: rgb(153, 149, 149);
}
.content1 {
  font-size: 20px;
  font-family: "微软雅黑";
  padding-top: 10px;
}
.content {
  padding-left: 20px;
  width: 100%;
  height: 300px;
  // background-color: yellow
}
.moviedetail {
  width: 100%;
  height: 100px;
  font-family: "微软雅黑";
  color: rgb(153, 149, 149);
  white-space: nowrap;
}
.moviedetail div {
  margin-left: 20px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.area,
.year {
  display: inline-block;
  width: 50%;
}
// .year{
//     padding-left: 70px;
// }
.moviename {
  width: 100%;
  height: 100px;
  padding-top: 50px;
  padding-left: 20px;
  font-family: "微软雅黑";
  font-size: 20px;
}
.iframe {
  position: fixed;
  top: 0px;
  left: 0;
}
.erro {
  position: fixed;
  top: 0px;
  left: 0;
}
#star {
  margin-left: 25px;
}
.selectmd div {
  display: inline-block;
  width: 50%;
  height: 40px;
  text-align: center;
  font-size: 18px;
  padding-top: 10px;
  font-family: "微软雅黑";
  transition: border-bottom 0.5s;
}
.active {
  border-bottom: 4px solid rgb(131, 131, 252);
}
.selectmd {
  width: 100%;
  height: 42px;
  border-bottom: 1px solid lightgrey;
  position: fixed;
  top: 250px;
  left: 0;
}
.erro {
  width: 100%;
  height: 250px;
  background-color: grey;
  font-size: 20px;
  text-align: center;
}
.playmovie {
  height: 98%;
  padding-top: 293px;
}
.mui-scroll-wrapper {
  margin-top: 293px;
}
.input {
  //  margin-left:75%
  position: relative;

  left: 40%;
}
.introducemovie {
  width: 100%;
  height: 650px;
}
.mui-icon-extra.mui-icon-extra-heart-filled {
  color: red;
}
</style>