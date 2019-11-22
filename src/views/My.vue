<template>
  <div class="abc">
    
        <!-- 1.置顶"我的",退出按钮 -->
        <div class="my-top">
          <div class="my-top-1">
            <h3>我的</h3>
            <p v-show="flag" class="my-top-back" @click="quit">注销</p>
          </div>
          <!-- 2.头像,信息页面 -->
          <div class="my-top-user">
            <img :src="headimg" />
            <div v-show="flag" class="my-top-user-mid">
              <p class="name">{{nickname1}}</p>
              <p class="id">UID:{{username1}}</p>
              <router-link to="/change" class="my-top-change mui-icon mui-icon-compose" id="color"></router-link>
            </div>
            <div v-show="!flag" class="my-top-login">
              <a @click="login">登录/注册</a>
            </div>
          </div>
        </div>
        <div class="mui-scroll-wrapper" id='margin'>
      <div class="mui-scroll">
        <!-- 3. 观看历史页面 -->
        <div class="my-see">
          <p class="my-see-history">
            <i class="mui-icon-extra mui-icon-extra-outline"></i>
            <span>&nbsp;观看历史</span>
          </p>
          <a href="#" class="my-see-logo mui-icon mui-icon-forward"></a>
          <div
            class="my-see-1 mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
          >
            <div class="mui-scroll my-see-2">
              <!--  -->
              <a 
                class="mui-control-item my-see-container "
                v-for="(item,idx) in historylist"
                :key="idx"  @click='play(item.v_id)'
              >
                <img v-lazy="item.v_pic" class="my-see-img" />
                <p class="historyname">{{item.v_name}}</p>
              </a>
            </div>
          </div>
        </div>

        <!-- 4. 收藏页面 -->
        <div class="my-see">
          <p class="my-see-history">
            <i class="mui-icon-extra mui-icon-extra-heart"></i>
            <span>&nbsp;我的收藏</span>
          </p>
          <a href="#" class="my-see-logo mui-icon mui-icon-forward"></a>
          <div
            class="my-see-1 mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
          >
            <div class="mui-scroll my-see-2">
              <!--  -->
              <a 
                class="mui-control-item my-see-container "
                v-for="(item,idx) in collectlist"
                :key="idx" @click='play(item.v_id)'
              >
                <img v-lazy="item.v_pic" class="my-see-img" />
                <p class="colname">{{item.v_name}}</p>
              </a>
            </div>
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
img[lazy="loading"] {  
  width: 100px;
  height: 150px;
  margin: auto;
  color: grey;
  background-color: grey
}
#color {
  color:white
}
#margin {
  margin-top: 180px;
  // height: 96%;
}
.abc {
  position: relative;
  height: 100%;
  font-family: "微软雅黑";
}

.my-top {
  height: 180px;
  background-color: #26a2ff;

  h3 {
    margin: 5px;
    margin-top: 10px;
    height: 100%;
    width: 20%;
    color: #ffffff;
    font-size: 30px;
    float: left;
    // background-color: red;
    font-weight: normal;
    text-align: center;
    // display: inline-block;
  }
  .my-top-back {
    margin: 5px;
    margin-top: 10px;
    height: 100%;
    width: 20%;
    // background-color: red;
    color: #ffffff;
    float: right;
    font-size: 22px;
    text-align: center;
    line-height: 30px;
  }
  .my-top-1 {
    height: 30px;
    width: 100%;
    // background-color: palegreen
  }
  .my-top-user {
    height: 120px;
    width: 100%;
    // background-color: green;
    position: relative;

    img {
      width: 80px;
      height: 80px;
      border-radius: 80px;
      border: 2px #ffffff solid;
      position: absolute;
      top: 20%;
      left: 4%;
    }
    .my-top-user-mid {
      width: 36%;
      height: 80%;
      // background-color: hotpink;
      position: absolute;
      left: 28%;
      top: 10%;
      a {
        display: block;
        float: right;
        margin-top: 25%;
      }

      .name {
        font-weight: 600;
        color: #ffffff;
        font-size: 16px;
        position: absolute;
        top: 25%;
        left: 5%;
      }
      .id {
        color: #ffffff;
        position: absolute;
        top: 55%;
        left: 5%;
        font-size: 12px;
      }
    }
    .my-top-login {
      width:30%;
      height: 30%;
      background-color: lightskyblue;
      border: 1px solid lightskyblue;
      border-radius: 30%;
      display: block;
      float: left;
      position: absolute;
      left: 30%;
      top: 36%;
      line-height: 36px;
      font-size: 20px;
      text-align: center;
      a {
        color: #ffffff;
      }
      .my-top-change {
        padding-left: 10px;
      }
    }
  }
}
.my-see {
  width: 100%;
  height: 260px;  
  vertical-align: middle;
  position: relative;
  vertical-align: middle;
  .my-see-1 {
    width: 100%;
    height: 80%;    
    .my-see-img {
      width: 100px;
      height: 150px;
      border-radius: 5px;
    }
    p {
      margin-top: -10px;
    }
  }
  .my-see-container {
    margin-top: 20px;
    padding: 0px;
    margin-left: 20px;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
p {
  display: block;
  width: 96%;
  color: #000000;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my-see-history {
  margin: 5px;
  display: inline-block;
  width: 50%;
  height: 10%;
  // background-color: green;
  span {
    position: relative;
    top: -2px;
  }
}
.my-see-logo {
  margin: 5px;
  display: block;
  //position: relative;
  float: right;
  width: 20px;
  color: #000000;
  // background-color: red;
}
</style>

<script>
import mui from "../../lib/mui/js/mui.js";
import myaxios from "../tools/myaxios.js";

// import QS from "qs";
export default {
  data: function() {
    return {
      historylist:[],
      collectlist:[],
      flag:false,
      // flag: this.$store.state.loginornot.sign,
      headimg: "",
      username1:'',
      nickname1:'',      
      userlist: [],
      // obj: {
      //   username: "test123456",
      //   password: "123"
      // }
    };
  },
  methods: {  
    async play(id){
      this.$router.push("/playmovie/"+id);
      let {data}=await myaxios("GET",'/api/updatehit/'+id)       
      this.$store.commit('gethistory',{v_id:id})
    },
    login(){
      this.$router.push('/register')
    } ,
    quit() {      
      this.$store.commit('outlogin')
      this.$router.push('/quit')     
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  async created() {
   
    // this.$store.state.historyplay.forEach(async item=>{
    //        let {data} = await myaxios('GET','/api/getintroduce/'+item.v_id).then(items)
    //       //  console.log(data.message)
    //        this.historylist.push(data.message[0])           
    //    }) 
       let historyplay=this.$store.state.historyplay;
       var historyplay1=[]
       historyplay.forEach(async item => {
           let {data}=await myaxios("GET",'/api/getintroduce/'+item.v_id)
            historyplay1.push(data.message[0])
       })
       this.historylist=historyplay1
    //1.每次打开页面判断是否有用户登录，获取用户的数据
      // console.log(this.$store.state.loginuser)  
    var shoucang =[]
      if(this.$store.state.loginornot.length==0){
           this.flag = false;
      this.headimg = "http://111.231.113.247:8899/headimg/null.jpg";
      }else{
       if(this.$store.state.loginornot[0].sign==false){
      this.flag = false;
      this.headimg = "http://111.231.113.247:8899/headimg/null.jpg";
    }else{
      this.flag = true;
      this.username1 =this.$store.state.loginuser[0].username ;
      this.nickname1 = this.$store.state.loginuser[0].nickname;
      this.headimg = this.$store.state.loginuser[0].head;
      
      shoucang=this.$store.state.collection.filter(item=>{
        // console.log(item.username,this.$store.state.loginuser[0].username)
            return item.username==this.$store.state.loginuser[0].username
      })
      shoucang.forEach(async item=>{
         let {data}= await myaxios("GET",'/api/getintroduce/'+item.v_id)          
          this.collectlist.push(data.message[0])          
      })
      // console.log(this.collectlist)
    }
    }            
 
   },
  updated(){

  }
};
</script>