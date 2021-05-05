import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ab: true,
    malenewbook: true,
    vip: true,
    renewbook: true,
    femalhot: true,
    feqianli: true,
    fewanjie: true,
    mypaused: false,
    vipAll: true,
    malesort: true,
    num: 0,
    fontnum: [16, 18, 20, 24, 26],
    font: 16,
    bookrack: JSON.parse(window.localStorage.getItem('bookrack')) || [],


  },
  mutations: {
    // joinShou: function ( preload) {
    //   this.state.bookrack.push(preload)
    // },
    // removeShou:function(preload){
    //   this.state.bookrack.fliters((item)=>item!==preload)
    // },
    add() {
      this.state.num++;
      if (this.state.num > 4) {
        this.state.num = 4;
      }
      this.state.font = this.state.fontnum[this.state.num]
    },
    reduce() {

      this.state.num--;
      if (this.state.num <= 0) {
        this.state.num = 0;
      }
      this.state.font = this.state.fontnum[this.state.num]
    }
  },
  actions: {},
  modules: {}
})