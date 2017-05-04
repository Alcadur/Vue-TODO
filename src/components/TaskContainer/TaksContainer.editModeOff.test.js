import Vue from 'vue';
import TaskContainer from './TaskContainer.vue';

describe('TaskContainer', function() {

  let vm;
  let task;

  beforeEach(function() {
    task = { name: 'task name' };
    const Ctrl = Vue.extend(TaskContainer);
    vm = new Ctrl({ propsData: { task } }).$mount();
  });

  describe('editModeOff', function() {
    it('should change \'isEditMode\' to false', function() {
      vm.isEditMode = true;

      vm.editModeOff();

      expect(vm.isEditMode).to.be.false;
    });

    it('should hide input node in template', function(done) {
      vm.isEditMode = true;

      vm.editModeOff();

      Vue.nextTick(function() {
        Vue.nextTick(function() {
          expect(vm.$el.querySelector('div:nth-child(2)').innerHTML).to.not.contain('<input');
          done();
        });
      });
    });
  });
});
