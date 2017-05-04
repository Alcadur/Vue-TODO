import Vue from 'vue';
import TaskContainer from './TaskContainer.vue';

describe('TaskContainer', function() {

  const TASK_NAME = 'naughty task';

  let vm;
  let task;

  beforeEach(function() {
    task = { name: TASK_NAME };
    const Ctrl = Vue.extend(TaskContainer);
    vm = new Ctrl({ propsData: { task } }).$mount();
  });

  describe('editModeOn', function() {
    it('should set \'editName\' to task name', function() {
      vm.editName = '';

      vm.editModeOn();

      expect(vm.editName).to.be.equal(TASK_NAME);
    });

    it('should change \'isEditMode\' to true', function() {
      vm.isEditMode = false;

      vm.editModeOn();

      expect(vm.isEditMode).to.be.true;
    });

    it('should show input node in template', function(done) {
      vm.editModeOn();

      Vue.nextTick(function() {
        expect(vm.$el.querySelector('div:nth-child(2)').innerHTML).to.contain('<input');
        done();
      });
    });
  });
});
