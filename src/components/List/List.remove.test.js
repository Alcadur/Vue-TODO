import Vue from 'vue';
import List from './List.vue';

describe('List', function() {

  let vm;

  beforeEach(function(){
    vm = new Vue(List).$mount();
  });

  describe('remove', function() {
    const TASK_1 = { name: 'task 1', isDone: false };
    const TASK_2 = { name: 'task 2', isDone: true };
    const TASK_3 = { name: 'task 3', isDone: false };

    beforeEach(function() {
      vm.tasks = [TASK_1, TASK_2, TASK_3];
    });

    it('should remove first task from list', function() {
      sinon.stub(vm, 'findTaskPositionByName').returns(0);

      vm.remove(TASK_1);

      expect(vm.tasks[0]).to.be.equal(TASK_2);
    });

    it('should remove last task from list', function() {
      sinon.stub(vm, 'findTaskPositionByName').returns(2);

      vm.remove(TASK_3);

      expect(vm.tasks[1]).to.be.equal(TASK_2);
    });

    it('should remove item from middle of list', function() {
      sinon.stub(vm, 'findTaskPositionByName').returns(1);

      vm.remove(TASK_2);

      expect(vm.tasks[0]).to.be.equal(TASK_1, 'task 1');
      expect(vm.tasks[1]).to.be.equal(TASK_3, 'task 2');
    });
  });
});
