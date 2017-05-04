import Vue from 'vue';
import List from './List.vue';

describe('List', function() {

  const TASK = { name: 'my name' };

  let vm;

  beforeEach(function() {
    vm = new Vue(List).$mount();
  });

  describe('findTaskPositionByName', function() {
    it('should return 0 for first element', function() {
      vm.tasks = [TASK, { name: 't1' }, { name: 't2' }];

      const result = vm.findTaskPositionByName(TASK.name);

      expect(result).to.be.equal(0);
    });

    it('should return \'tasks.length\' - 1 for last element', function() {
      vm.tasks = [{ name: 't0'}, { name: 't1' }, TASK];

      const result = vm.findTaskPositionByName(TASK.name);

      expect(result).to.be.equal(vm.tasks.length - 1);
    });

    it('should return 1 for second task', function() {
      vm.tasks = [{ name: 't0' }, TASK, { name: 't2' }];

      const result = vm.findTaskPositionByName(TASK.name);

      expect(result).to.be.equal(result);
    });

    it('should return -1 when task will not be found', function() {
      vm.tasks = [{ name: 't0' }, { name: 't1' }, { name: 't2' }];

      const result = vm.findTaskPositionByName(TASK.name);

      expect(result).to.be.equal(-1);
    });
  });
});
