import Vue from 'vue';
import List from './List.vue';

describe('List',function() {

  let vm;

  beforeEach(function() {
    vm = new Vue(List).$mount();
  });

  describe('findTaskByName', function() {
    it('should return task object with name be given argument', function() {
      const TASK = { name: 'my super name' };
      vm.tasks = [{ name: 'my' }, TASK, { name: 'super' }, { name: 'name'}];

      expect(vm.findTaskByName(TASK.name)).to.be.equal(TASK);
    })
  })
});
