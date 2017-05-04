import Vue from 'vue';
import List from './List.vue';

describe('List', function() {

  let vm;
  let event;

  beforeEach(function(){
    vm = new Vue(List).$mount();
    event = {
      target: {
        value: ''
      }
    };
  });

  describe('addTask', function() {
    it('should add new task to list', function() {
      event.target.value = 'not empty';
      vm.tasks.length = 0;
      sinon.stub(vm, 'findTaskByName').returns(undefined);

      vm.addTask(event);

      expect(vm.tasks).to.have.lengthOf(1);
    });

    it('should added task name be \'event.target.value\'', function() {
      const TASK_NAME = 'new task name';
      event.target.value = TASK_NAME;
      sinon.stub(vm, 'findTaskByName').returns(undefined);

      vm.addTask(event);

      expect(vm.tasks[0].name).to.be.equal(TASK_NAME);
    });

    it('should clear \'event.target.value\' after create new task', function() {
      const TASK_NAME = 'some name';
      event.target.value = TASK_NAME;
      sinon.stub(vm, 'findTaskByName').returns(undefined);

      vm.addTask(event);

      expect(vm.tasks[0].name).to.be.equal(TASK_NAME);
      expect(event.target.value).to.be.empty;
    });

    it('should not add task to list when \'event.target.value\' will be empty', function() {
      vm.addTask(event);

      expect(vm.tasks).to.have.lengthOf(0);
    });

    it('should not add task to list when task with that name already exists', function() {
      const TASK_NAME = 'clone task';
      event.target.value = TASK_NAME;
      sinon.stub(vm, 'findTaskByName')
           .onFirstCall()
           .returns(undefined)
           .onSecondCall()
           .returns({});


      vm.addTask(event);
      event.target.value = TASK_NAME;
      vm.addTask(event);

      expect(vm.tasks).to.have.lengthOf(1);
    });
  });

});
