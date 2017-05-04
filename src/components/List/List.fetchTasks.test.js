import Vue from 'vue';
import VueResource from 'vue-resource';
import List from './List.vue';

Vue.use(VueResource);

describe('List', function() {

  let vm;
  let xhr;
  let requests;

  beforeEach(function() {
    vm = new Vue(List).$mount();
    requests = [];
    this.xhr = sinon.useFakeXMLHttpRequest();
    this.xhr.onCreate = function(request) {
      requests.push(request);
    };
  });

  afterEach(function() {
    this.xhr.restore();
  });

  describe('fetchTasks', function() {
    it('should make xhr request for fetch tasks', function() {
      sinon.stub(Vue.http, 'get').returnsPromise();

      vm.fetchTasks();

      expect(Vue.http.get.calledWith('https://jsonplaceholder.typicode.com/posts')).to.be.true;

      Vue.http.get.restore();
    });

    it('should add all response tasks to \'tasks\' list ', function() {
      vm.tasks = [{ name: 'old task' }];
      const DATA = [ {title: 't1' }, { title: 't2'}, { title: 't3'}, { title: 't4'} ];
      const OLD_TASKS_NUMBER = vm.tasks.length;
      const response = { body:  DATA };
      sinon.stub(Vue.http, 'get')
             .returnsPromise()
             .resolves(response);

      vm.fetchTasks();

      expect(vm.tasks.length).to.be.equal(DATA.length + OLD_TASKS_NUMBER);

      Vue.http.get.restore();
    });
  });
});
