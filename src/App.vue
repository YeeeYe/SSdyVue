<template>
  <div id="app" class="container">
    
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

    <mt-tabbar v-model="selected" v-show="flag">
      <mt-tab-item id="home">
        <router-link to="/" tag="span">
          <i class="mui-icon mui-icon-home"></i>
          <br />主页
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="hotmovie">
        <router-link to='/hotmovie' tag="span">
          <i class="mui-icon-extra mui-icon-extra-rank"></i>
          <br />热点
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="find">
        <router-link to="/search" tag="span">
          <i class="mui-icon-extra mui-icon-extra-find"></i>
          <br />发现
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="mine">
        <router-link to='/my' tag="span"> 
          <i class="mui-icon mui-icon-contact"></i>
          <br />我的
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data:function(){
    return {
      selected: "home",
      flag: true,
      transitionName:''
    }
  },
  watch:{
    '$route.path':function(newVal,oldVal){
      var arrpath = ['/home','/hotmovie','/search','/my','/']
      if(arrpath.includes(newVal)){
        this.flag = true
      }
      else{
        this.flag = false
      }
    },
    $route(to, from) {
      var routerArr = ['/home','/hotmovie','/search','/my','/'];
      if(this.$store.state.isBack == true){
        this.transitionName = "slide-right";
      }
      else{
        //当路由在四个tabarItem之间切换的时候不要动画
        if(routerArr.includes(to.path)){
          this.transitionName = "";
        }
        else{
          this.transitionName = "slide-left";
        }
      }
      this.$store.commit('changeback',{isBack:false})
    }
  }
}
</script>
<style lang="less">
* {
  touch-action: none;
}
html,
body {
  height: 100%;
}
.container {
  // padding-top: 40px;
  // padding-bottom: 56px;
  overflow: hidden;
  height: 100%;
}
.mint-tab-item span {
  width: 100%;
  height: 100%;
  display: inline-block;
}

//.mint-tab-item默认的文字颜色
.mint-tab-item {
  color: gray;
}

.mui-icon {
  margin-bottom: 3px;
}

.mui-icon-extra-cart {
  position: relative;

  .mui-badge {
    position: absolute;
    right: -5px;
    top: -5px;
    left: 70% !important;
  }
}
.mint-tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 5;
}
/*左边进入*/
.slide-left-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
/*左边离开*/
.slide-left-leave-to {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
  position: absolute;
}

/*右边进入*/
.slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
/*右边离开*/
.slide-right-leave-to {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  position: absolute;
}

/*进入退出动画*/
.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}
</style>
