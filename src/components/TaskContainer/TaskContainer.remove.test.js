import Vue from 'vue';
import TaskContainer from './TaskContainer.vue';

describe('TaskContainer', function() {

  let vm;
  let task;

  beforeEach(function() {
    const Ctrl = Vue.extend(TaskContainer);
    task = { name: 'task to remove' };
    vm = new Ctrl({ propsData: { task } }).$mount();
  });

  describe('remove', function() {
    it('should emit \'remove\' event', function() {
      const $emitStub = sinon.stub(vm, '$emit');

      vm.remove();

      expect($emitStub.calledWith('remove', task)).to.be.true;
      //expect(vm.$emit.calledWith('remove', task)).to.be.true;
    });
  });
});
