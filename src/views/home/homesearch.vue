<template>
    <div class="homesearch">
        <div class="hs-top">
            <ul>
                <li>
                    <input type="text" v-model="searchtext" ref="ss" placeholder="请输入您要搜索的影片" @change="search"/>
                    <i class="mui-icon mui-icon-search" ></i>
                </li>
                <li>
                    <p @click="goback">取消</p>
                </li>
            </ul>
        </div>
        <div class="hs-sshistory" v-show="flag">
            <span>
                搜索历史
                <a href="#">
                    <i class="mui-icon mui-icon-trash" @click="dellist"></i>
                </a>
            </span>
            <div class="hs-history">
                <ul>
                    <li v-for="item in searchsavelist" :key="item" @click="gosearch(item)">
                        {{item | ellipsis(8)}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="hs-hotss" v-show="flag">
            <span>
                热门搜索
            </span>
            <ul>
                <li v-for="(item,idx) in searchhotlist" :key="item.v_id" @click='play(item.v_id)'>
                    <p>{{idx+1}}</p>
                    {{item.v_name}}
                </li>
                
            </ul>
        </div>
         
        <div class="hs-list" v-show="sflag">
           <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
            <ul>
                <li ref="movielist" v-for="item in searchlist" :key="item.v_id" @click='play(item.v_id)'>
                    {{item.v_name}}
                </li>
            </ul>
        </div>
        </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    *{
        padding: 0;
        margin: 0;
    }

    .homesearch{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        // background-color: green;

        .hs-top{
            width: 90%;
            margin: 25px auto;
            height: 34px;
            z-index: 1;
        
        ul{
            width: 100%;
            height: 34px;
            list-style: none;
            overflow: hidden;

            li:first-child{
                width: 84%;
                height: 100%;
                position: relative;
                float: left;

                .mui-icon-search {
                    position: absolute;
                    top: 5px;
                    left: 14px;
                    color: gray;
                }

                input {
                    width: 100%;
                    height: 34px;
                    border: 0px;
                    border-radius: 17px;
                    background-color: #e7e7e7;
                    font-size: 13px;
                    padding-left: 44px;
                    overflow: hidden;
                    color: gray;
                }
            }

            li:last-child{
                width: 16%;
                height: 100%;
                float: left;

                p{
                    font-size: 16px;
                    font-weight: 600;
                    color: gray;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 34px;
                }
            }
        }
        }

        .hs-sshistory{
            width: 90%;
            margin: 0 auto;

            span{
                width: 100%;
                display: block;
                font-weight: 700;
                color: #333333;
                font-size: 20px;
                height: 30px;
                line-height: 30px;
                margin-bottom: 10px;
                overflow: hidden;

                a {
                    float: right;
                    font-size: 16px;
                    color: #333333;
                }

            }

            .hs-history{
                
                ul{
                    width: 100%;
                    overflow: hidden;

                    li{
                        display: block;
                        width: 48%;
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                        border-radius: 17px;
                        margin: 10px 0;
                        text-align: center;
                        float: left;
                        background-color: #e7e7e7;
                    }

                    li:nth-child(2n){
                        float: right;
                    }
                }
            }
        }
        .hs-hotss{
            width: 90%;
            margin: 40px auto 0;

            span{
                width: 100%;
                display: block;
                font-weight: 700;
                color: #333333;
                font-size: 20px;
                height: 30px;
                line-height: 30px;
                margin-bottom: 10px;
            }

            ul{
                list-style: none;

                li{
                    margin: 15px 0;
                    font-size: 16px;

                    p{
                        display: inline;
                        margin: 0 10px;
                    }
                }

                li:first-child p{
                    color: red;
                    font-weight: 700;
                    font-size: 18px;
                }

                li:nth-child(2) p{
                    color: lightcoral;
                    font-weight: 600;
                    font-size: 18px;
                }

                li:nth-child(3) p{
                    color: lightsalmon;
                    font-weight: 500;
                    font-size: 18px;
                }
            }
        }

        .hs-list{
            position: relative;
            width: 90%;
            height: 100%;
            margin: 0 auto;
            margin-top: -18px;

            ul{
                list-style: none;

                li{
                    margin: 18px 0;
                    font-size: 16px;
                }
            }
        }
    }
</style>

<script>
import mui from "../../../lib/mui/js/mui";
import { Toast } from 'mint-ui';
import myaxios, {
  searchlistURL,
  searchhotlistURL
} from "../../tools/myaxios";
export default {
    data: function(){
        return {
            flag: true,
            sflag: false,
            searchlist:[],
            searchtext:'',
            searchsavelist: this.$store.getters.showsearchmsg,
            searchhotlist:[]
        }
    },
    methods:{
        async play(id){
        // console.log(id)
       this.$router.push("/playmovie/"+id);
      let {data}=await myaxios("GET",'/api/updatehit/'+id)  
      this.$store.commit('gethistory',{v_id:id})     
    },
        async search(){
            this.flag = false;
            this.sflag = true;
            let {data} = await myaxios("GET",searchlistURL + this.searchtext)
            // console.log(data)
            if(data.status == 0){
            this.searchlist = data.message
            }
            if(data.status == 1){
                Toast({
                    message: data.message,
                    duration: 2000
                })
            }
            var msgs = this.searchtext
            this.$store.commit("addsearchmsg", msgs);
        },

        goback(){
            if(this.sflag == true){
                this.flag = true
                this.sflag = false
                this.searchlist=[]

            }
            else{
              this.$store.commit('changeback',{isBack:true})
              this.$router.go(-1);
            }
            
        },

        gosearch(name,id){
            this.searchtext = name
            this.search()
            // console.log(this.searchsavelist)

        },
        dellist(){
            var clearmsg = []
            this.$store.commit("delsearchmsg",clearmsg);
            this.searchsavelist = []
        }

    },
    async created(){
        let {data} = await myaxios("GET",searchhotlistURL)
        // console.log(data)
        if(data.status == 0){
            this.searchhotlist = data.message.slice(0,8)
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