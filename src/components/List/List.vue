<template>
  <div id="app">
    <div>
      <button type="button" @click="fetchTasks">fetch</button>
      <button type="button" @click="markAllAsDone">all</button>
      <input placeholder="Task name" @keyup.prevent.enter="addTask">
       {{ doneTasksNumber }} / {{ tasks.length }}
    </div>
    <ul>
      <li v-for="task in tasks"><task-container
        :task="task"
        @remove="remove"></task-container> </li>
    </ul>
  </div>
</template>

<script>
import TaskContainer from '../TaskContainer/TaskContainer.vue'

class Task {
    constructor(name) {
        this.name  = name || '';
        this.isDone = false;
    }
}

export default {
  name: 'list',
  data() {
      return {
        newTaskName: '',
          tasks: []
      }
  },
  methods: {
    addTask(event) {
        if(event.target.value.trim() === '' || this.findTaskByName(this.newTaskName)){
            return;
        }

        this.tasks.push(new Task(event.target.value));
        event.target.value = '';
    },
    markAllAsDone() {
          this.tasks.forEach(task => task.isDone = true);
    },
    remove(task){
      const taskPosition = this.findTaskPositionByName(task.name);

      if(taskPosition > -1) {
            this.tasks.splice(taskPosition, 1)
      }
    },
    findTaskByName(taskName) {
        return this.tasks.find(task => task.name === taskName);
    },
    findTaskPositionByName(taskName) {
      let taskPosition = -1;

      this.tasks.find((task, index) => {
        if(task.name === taskName) {
          taskPosition = index;
        }
      });

      return taskPosition;
    },
    fetchTasks() {
        this.$http.get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
              response.body.forEach(item => {
                this.tasks.push(new Task(item.title))
              });
          });
    }
  },
  computed: {
    doneTasksNumber() {
        return this.tasks.filter(task => task.isDone).length;
    }
  },
  components: {
    TaskContainer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
