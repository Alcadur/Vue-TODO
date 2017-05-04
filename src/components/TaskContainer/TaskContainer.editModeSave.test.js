import Vue from 'vue';
import TaskContainer from './TaskContainer.vue';

describe('TaskContainer', function() {
  let vm;
  let task;

  beforeEach(function() {
    task = { name: 'old name' };
    const Ctrl = Vue.extend(TaskContainer);
    vm = new Ctrl({ propsData: { task } }).$mount();
  });

  describe('editModeSave', function() {
    it('should set \'task.name\' to \'editName\'', function() {
      const EDIT_NAME = 'edited name';
      vm.editName = EDIT_NAME;

      vm.editModeSave();

      expect(vm.task.name).to.be.equal(EDIT_NAME);
    });

    it('should call \'editModeOff\'', function() {
      sinon.stub(vm, 'editModeOff');

      vm.editModeSave();

      expect(vm.editModeOff.called).to.be.true;
    });
  });
});
