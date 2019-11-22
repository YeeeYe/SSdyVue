<template>
  <div class="contain">
    <!-- 1.顶部的取消按钮和完成按钮 -->
    <div class="ch-top">
      <div class="ch-top-back" @click="goback()">
        <p>取消</p>
      </div>
      <div class="ch-top-mid">
        <p>编辑资料</p>
      </div>
      <div class="ch-top-ok" @click="finish()">
        <p>完成</p>
      </div>
    </div>
    <!-- 2.头像和更改头像的按钮 -->
    <div class="ch-img-container">
      <div class="ch-img-div">
        <img class="ch-img" :src="imgurl" ref='himg' />
      </div>
      <div class="ch-img-ch">
        
          <a @click="tohead">更改头像</a>
        
      </div>
    </div>

    <!-- 3.更改昵称和密码 -->
    <div>
      <div>
        <form action>
          <div class="form-item">
            <label for="username">昵称</label>
            <div>
              <input class="form-control" type="text" ref="nickname" placeholder="请输入昵称" />
            </div>
          </div>
          <div class="form-item">
            <label for="password">密码</label>
            <div>
              <input class="form-control" type="password" ref="psd" placeholder="请输入新密码" />
            </div>
          </div>
          <div class="form-item">
            <label for="password2">确认密码</label>
            <div>
              <input class="form-control" type="password" ref="again" placeholder="请确认新密码" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.contain {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
  //  background-color: pink;
}
//1.顶部的所有的样式
.ch-top {
  width: 100%;
  height: 6%;

  // background-color: greenyellow;
  .ch-top-back {
    width: 33%;
    height: 100%;
    //  background-color: yellowgreen;
    float: left;

    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      padding-left: 8%;
      //    background-color: aquamarine;
    }
  }
  .ch-top-mid {
    width: 33%;
    height: 100%;
    // background-color: yellow;
    float: left;
    text-align: center;
    p {
      width: 100%;
      height: 30px;
      color: #000000;
      line-height: 30px;
      font-size: 20px;
    }
  }
  .ch-top-ok {
    width: 33%;
    height: 100%;
    // background-color: green;
    float: left;
    p {
      width: 100%;
      height: 30px;
      color: orangered;
      line-height: 30px;
      padding-left: 70%;
      font-size: 16px;
    }
  }
  //2.修改头像的页面样式
}
.ch-img-container {
  width: 100%;
  height: 26%;
  // background-color: aqua;
  .ch-img-div {
    width: 100%;
    //    background-color: peachpuff;
    text-align: center;
    margin-top: 20px;
    .ch-img {
      width: 90px;
      height: 90px;
      border-radius: 90px;
      border: 2px solid white;
    }
  }
  .ch-img-ch {
    margin-top: 10px;
    width: 100%;
    //   background-color: blueviolet;
    text-align: center;
    a {
      color: orangered;
    }
  }
}
.form-item {
  width: 100%;
  height: 50px;
  //  background-color: greenyellow;
  .form-control {
    width: 260px;
    height: 40px;
    float: left;
  }
  label {
    padding-left: 5px;
    padding-right: 10px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    float: left;
    // background-color:#fff;
  }
}
</style>

<script>
import axios from "../../tools/myaxios.js";
import { Toast } from "mint-ui";
import { MessageBox } from 'mint-ui';
import myaxios from '../../tools/myaxios.js';
export default {
  data: function() {
    return {
      imgurl: "",      
    };
  },
  mounted() {},
  updataed() {},
  methods: {
    tohead(){
      this.$router.push('/headimg')
    },
    goback() {
      this.$store.commit('changeback',{isBack:true})
      this.$router.push('/my');
    },
    async finish() {
       var obj = {
                username : this.$store.state.loginuser[0].username,
                password : this.$refs.psd.value,
                nickname : this.$refs.nickname.value,
                url : this.$refs.himg.src.substr(25)
            }
         
              //  console.log(obj.nickname.length)
               if(obj.nickname.length<3||obj.nickname.length>8){
                  Toast({
                        message: '昵称的长度为3-8位',
                        duration: 3000
                    });
                    return false;
               }               
 
                if(!checkPsd(obj.password)){
                    Toast({
                        message: '密码为6-18位的字母和数字',
                        duration: 3000
                    });
                    return false;
                }

                if(this.$refs.again.value !== obj.password){
                    Toast({
                        message: '两次密码不一致',
                        duration: 3000
                    });
                    return false;
                }                   

                if(obj.url == ""){
                    Toast({
                        message: '请选择头像',
                        duration: 3000
                    });
                    return false;
                }            
            function checkPsd(input){
                var pattern = /^[a-z0-9_-]{6,18}$/;
                // var pattern = /^[0-9]{4,16}$/
                return pattern.test(input);
            }
        let {data}= await myaxios("POST",'/api/changeuser',obj)
        // console.log(data)
        if(data.status==0){
          this.$store.commit('changeuser',{nickname:obj.nickname,url:this.$refs.himg.src})
           MessageBox('提示','修改信息成功！')     
          this.$router.push({name:'my'})   
        }
        
    }
  },
  created() {   
    if (this.$route.params.url == undefined) {
      this.imgurl = this.$store.state.loginuser[0].head;      
    } else {
      this.imgurl = this.$route.params.url;      
    }
  }
};
</script>