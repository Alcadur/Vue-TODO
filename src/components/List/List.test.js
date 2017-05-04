import Vue from 'vue';
import List from './List.vue';

describe('List', function() {

  let vm;
  let event;

  beforeEach(function(){
    //const Constructor = Vue.extend(List);
    vm = new Vue(List).$mount();
    event = {
      target: {
        value: ''
      }
    };
  });

  describe('constructor', function() {

  });



});
