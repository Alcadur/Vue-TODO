import Vue from 'vue';
import List from './List.vue';

describe('List', function() {

  let vm;

  beforeEach(function() {
    vm = new Vue(List).$mount();
  });

  describe('doneTasksNumber', function() {
    it('should return number of tasks marked as done (begin)', function() {
      const DONE_TASKS = [{ isDone: true }, { isDone: true }, { isDone: true }];
      const NOT_DONE_TASKS = [{ isDone: false }, { isDone: false }];
      vm.tasks = DONE_TASKS.concat(NOT_DONE_TASKS);

      expect(vm.doneTasksNumber).to.be.equal(DONE_TASKS.length);
    });

    it('should return number of tasks marked as done (mixed)', function() {
      const NUMBER_OF_DONE_TASKS = 2;
      vm.tasks = [
        { isDone: false },
        { isDone: true },
        { isDone: false },
        { isDone: false },
        { isDone: true },
        { isDone: false }
      ];

      expect(vm.doneTasksNumber).to.be.equal(NUMBER_OF_DONE_TASKS);
    });
  });
});
