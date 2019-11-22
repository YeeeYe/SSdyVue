import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginornot:[],//loginornot:[{sign:true}],
    loginuser:[],//loginuser:[{username:'aa',nickname:'aa',head:'http://songshu.xiaomy.net/headimg/2.jpg'}],
    collection:[],
    historyplay:[],//historyplay:[{v_id:200}]
    searchmsg:[], 
    isBack:false   
  },
  mutations: {
    changeback(state,data){
      // console.log(data)
        state.isBack=data.isBack
    },
    changeuser(state,data){
         state.loginuser[0].nickname=data.nickname
         state.loginuser[0].head=data.url
    },
    gethistory(state,data){      
        var arr2=state.historyplay.filter(item=>{
          return item.v_id!=data.v_id
        })
        if(arr2.length==state.historyplay.length){
          state.historyplay.unshift(data)
        }else{
            arr2.unshift(data)
          state.historyplay=arr2
        }
        
    },
    outlogin(state,data){
      // console.log('aaa')
        state.loginornot[0].sign=false;
        state.loginuser=[]
    },
    login(state,data){
      console.log(data)
      if(state.loginornot==0){      
      state.loginuser.push(data)
      let obj1={sign:true}
      state.loginornot.push(obj1)
      }else {
        state.loginuser.push(data)
        state.loginornot[0].sign=true;
      }          
    },    
    collect(state,data){
        state.collection.push(data)
    },
    deletecollect(state,data){
        var arr=state.collection.filter(item=>{
            return item.username!=data.username&&item.v_id!=data.v_id
        })
        state.collection=arr
    },
    addsearchmsg(state,msgs){
      var arr = state.searchmsg
      if(arr.includes(msgs)){
        var idx = arr.indexOf(msgs)
        arr.splice(idx,1)
      }
      arr.unshift(msgs)
    },
    delsearchmsg(state,clearmsg){
      state.searchmsg = clearmsg
    }
  },
  actions: {
  },
  getters:{
     getcollect(state){
       return state.collection
     },
     showsearchmsg(state){
      if(state.searchmsg.length <= 6){
        return state.searchmsg
      }
      else{
        return state.searchmsg.slice(0,6)
      }
    }
     
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
