import Vue from 'vue';
import List from './List.vue';

describe('List', function() {

  let vm;

  beforeEach(function(){
    vm = new Vue(List).$mount();
  });

  describe('markAllAsDone', function() {
    let tasks;

    beforeEach(function() {
      tasks = [
        {name: 'task1', isDone: false},
        {name: 'task2', isDone: false},
        {name: 'task3', isDone: false}
      ]
    });

    it('should mark all task as done', function() {
      vm.tasks = tasks;

      vm.markAllAsDone();

      expect(tasks[0].isDone).to.be.true;
      expect(tasks[1].isDone).to.be.true;
      expect(tasks[2].isDone).to.be.true;
    });
  });
});
