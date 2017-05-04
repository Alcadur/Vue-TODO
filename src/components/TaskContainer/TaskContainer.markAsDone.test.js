import Vue from 'vue';
import TaskContainer from './TaskContainer.vue';

describe('TaskContainer', function() {
  let vm;
  let task;

  beforeEach(function() {
    task = { isDone: false };
    const Ctor = Vue.extend(TaskContainer);
    vm = new Ctor({ propsData: { task } }).$mount();
  });

  describe('markAsDone', function() {
    it('should change \'isDone\' to \'true\'', function() {
      vm.task = { isDone: false };

      vm.markAsDone();

      expect(vm.task.isDone).to.be.true;
    })
  });
});
