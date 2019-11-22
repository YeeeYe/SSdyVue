<template>
    <div class="registercontainer">
        <!-- <div class="mui-scroll-wrapper" id='margin'>
      <div class="mui-scroll"> -->
        <a href="#" class="mui-icon mui-icon-back regback" @click="reggoback"></a>
        <div class="logob">
            <img src="../assets/images/logob.png" alt="">
        </div>
        <div class="regmain" v-show="cflag">            
                <ul>
                    <li @click.stop="golog">
                        <p ref="golog" class="current">登录</p>
                    </li>
                    <li @click.stop="goreg">
                        <p ref="goreg" >注册</p>
                    </li>
                </ul>
            <div class="logininput" v-show='lflag' >
                 <input type="text" ref="username" placeholder="请输入账号">
                <i class="mui-icon-extra-phone i1 "></i>  
                  <input type="password" ref="password" placeholder="请输入密码">
                <i class="mui-icon mui-icon-locked i2"></i>
                <button @click='login'>登录</button>
            </div>
            <div class="reginput" v-show='!lflag' >
                <img class="headimg" ref="himg" @click="chooseimg" src="http://111.231.113.247:8899/headimg/null.jpg">
                <span v-show="flag" @click="chooseimg">点击更换</span>
                <input type="text" ref="name" placeholder="请输入账号">
                <i class="mui-icon-extra-phone i1 "></i>
                <input type="password" ref="psd" placeholder="请输入密码">
                <i class="mui-icon mui-icon-locked i2"></i>
                <input type="password"  ref='again' placeholder="重复密码">
                <i class="mui-icon mui-icon-locked i3"></i>
                <input type="text" ref="nickname" placeholder="请输入昵称">
                <i class="mui-icon-extra mui-icon-extra-peoples i4"></i>
                <button @click="postmsg">立即注册</button>
                
            </div>
         </div>
         <div class="regmainimg" v-show="iflag">
             <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
             <ul>
                 <li v-for="item in imgurllist" :key="item.img_id" @click="getimg(item.headimg_url)">
                     <img :src="item.headimg_url">
                </li>
             </ul>
         </div>
         </div>
         </div>
         <!-- </div>
         </div> -->
    </div>
</template>

<style lang="less" scoped>
    *{
        padding: 0;
        margin: 0;
    }
.logininput{
                width: 94%;
                height: 67%;
                margin: 0 auto;
                position: relative;

                input{
                    border: 1px solid #CCCCCC;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    margin: 8px 0;
                    border-radius: 20px;
                    padding-left: 40px;
                }

                i{
                    color: #339BFE;
                    font-size: 22px;
                    position: absolute;
                    z-index: 1;
                    
                }

                .i1{
                    top: 15px;
                    left: 15px;
                }

                .i2{
                    top: 72px;
                    left: 12px;
                }
                .headimg{
                    display: block;
                    margin: 10px auto 0;
                    width: 76px;
                    height: 76px;
                    border: 2px solid gray;
                    border-radius: 38px;
                }
                span{
                    // color: orange;
                    font-size: 16px;
                    position: absolute;
                    top: 28px;
                    left: 130px;
                }
                button{
                    color: white;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    border: 0;
                    border-radius: 20px;
                    margin-top: 15px;
                    background: linear-gradient(to right, #2FCFF1, #349CFF);

                }
            }
    .registercontainer{
        width: 100%;
        height: 100%;
        position: relative;
        background: linear-gradient(to right, #30D0F0, #339BFE);

        .regback{
            display: block;
            font-size: 30px;
            color: white;
            position: relative;
            padding-left: 10px;
            top: 15px;
        }

        .logob{
            margin: 28px auto 20px;
            width: 118px;
            height: 118px;

            img{
                width: 100%;
                height: 100%;
                background-size: cover;
            }
        }

        .regmain{
            width: 92%;
            height: 67%;
            margin: 0 auto;
            background-color: white;
            border-radius: 6px;

            ul{
                list-style: none;
                width: 80%;
                overflow: hidden;
                margin:0 auto 20px;

                li{
                    float: left;
                    width: 50%;
                    text-align: center;
                    line-height: 60px;
                    font-size: 20px;
                    font-weight: 500;

                    p{
                        color: inherit;
                        font-size: inherit;
                        width: 30%;
                        margin: 0 auto;
                    }
                }
            }

            .current{
                border-bottom-width: 4px;
                border-bottom-style: solid;
                border-bottom-color: #339BFE;
            }

            .reginput{
                width: 94%;
                height: 67%;
                margin: 0 auto;
                position: relative;

                input{
                    border: 1px solid #CCCCCC;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    margin: 8px 0;
                    border-radius: 20px;
                    padding-left: 40px;
                }

                i{
                    color: #339BFE;
                    font-size: 22px;
                    position: absolute;
                    z-index: 1;
                    
                }

                .i1{
                    top: 94px;
                    left: 15px;
                }

                .i2{
                    top: 150px;
                    left: 12px;
                }

                .i3{
                    top: 205px;
                    left: 12px;
                }

                .i4{
                    top: 262px;
                    left: 12px;
                }

                .headimg{
                    display: block;
                    margin: 10px auto 0;
                    width: 76px;
                    height: 76px;
                    border: 2px solid gray;
                    border-radius: 38px;
                }

                span{
                    color: gray;
                    font-size: 16px;
                    position: absolute;
                    top: 28px;
                    left: 130px;
                }

                button{
                    color: white;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    border: 0;
                    border-radius: 20px;
                    margin-top: 15px;
                    background: linear-gradient(to right, #2FCFF1, #349CFF);

                }
            }

            
        }

        .regmainimg{
            width: 92%;
            height: 64%;
            margin: 0 auto;
            background-color: white;
            border-radius: 6px;
            overflow: hidden;
            position: relative;

            ul{
                width: 98%;
                height: 100%;
                margin: 0 auto;
                list-style: none;
                overflow: hidden;

                li{
                    float: left;
                    width: 76px;
                    height: 76px;
                    margin: 4px 4px;
                    border: 1px solid gray;

                    img{
                        width: 100%;
                        height: 100%;
                        background-size: cover;
                    }

                }
            }
        }

    }
</style>
<script>
import mui from "@/../lib/mui/js/mui.js";
import myaxios from "@/tools/myaxios.js";
import { Toast } from "mint-ui";
import { MessageBox } from 'mint-ui';
export default {
    data: function(){
        return {
            flag: true,
            cflag: true,
            iflag: false,
            imgurllist: [],
            lflag:true,
            aaurl:''
        }
    },
    methods: {
        async login(){
             let obj={ username:this.$refs.username.value,password:this.$refs.password.value}
             let {data}= await myaxios('POST','/api/login',obj)
        //   console.log(this.$refs.username.value,this.$refs.password.value)
            // console.log(data.message.username)
            // console.log(data.message)
            if(data.status==0){
            let obj1={username:data.message.username,nickname:data.message.nickname,head:data.message.headimg_url}
            // console.log(obj1)
            this.$store.commit("login",obj1)
            this.$router.push('/my')
            MessageBox('提示','登录成功!')
            }else{
                Toast('用户名或密码错误！请检查！')
            }
            
        },
        reggoback(){
             this.$store.commit('changeback',{isBack:true})
      this.$router.go(-1);
        },
        goreg(){
            this.lflag=false
            this.$refs.golog.removeAttribute("class","current")
            this.$refs.goreg.setAttribute("class","current")
        },
        golog(){
            this.lflag=true
            this.$refs.goreg.removeAttribute("class","current")
            this.$refs.golog.setAttribute("class","current")
        },
        async chooseimg(){
            this.flag = false;
            this.cflag = false;
            this.iflag = true;
            let {data} = await myaxios("GET",'/api/getheadimg')            
            if(data.status == 0){
                this.imgurllist = data.message
            }
        },
        getimg(url){
            this.cflag = true;
            this.iflag = false;
            this.$refs.himg.setAttribute("src",url)
            this.aaurl=url
        },
        async postmsg(){
            var obj = {
                name : this.$refs.name.value,
                password : this.$refs.psd.value,
                nickname : this.$refs.nickname.value,
                url : this.$refs.himg.src.substr(25)
            }       
          //  console.log(obj);    
            if(!checkName(obj.name)){
                    Toast({
                        message: '账号的长度必须为4-20位字母和数字的组合，首字符为字母',
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

                if(!checkNickname(obj.nickname)){
                    Toast({
                        message: '用户名为3-16位字母和数字的组合',
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
            

            //验证账号
            function checkName(input){
                var pattern = /^[A-Za-z][0-9A-Za-z]{3,19}$/;
                return pattern.test(input);
            }

            //验证密码
            function checkPsd(input){
                var pattern = /^[a-z0-9_-]{6,18}$/;
                // var pattern = /^[0-9]{4,16}$/
                return pattern.test(input);
            }

            //验证用户名
            function checkNickname(input){
                var pattern = /^[0-9A-Za-z]{3,16}$/;
                // var pattern = /^[0-9]{4,16}$/
                return pattern.test(input);
            }

            
            let {data} = await myaxios("POST",'/api/register',obj)
            if(data.status==0){
                MessageBox('提示', '注册成功!请登录');
                this.lflag=true
                this.$refs.goreg.removeAttribute("class","current")
                this.$refs.golog.setAttribute("class","current")
                this.$refs.name.value=''
                this.$refs.psd.value=''
                this.$refs.nickname.value=''
                this.$refs.again.value=''
                this.$refs.himg.removeAttribute("src",this.aaurl)
                this.flag=true
            }else {
                MessageBox('提示', '注册失败，已存在相同账号');
            }
            // axios.post(postregisterURL,obj).then(data=>{
            //     console.log(data)
            // }).catch(err=>{
            //     console.log(err)
            // })
            // console.log(data,url)
        }
    },
    mounted() {
        // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
        // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
        mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
}
</script>