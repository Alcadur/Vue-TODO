<template>
  <div id="app">
    <h2>Thing to do</h2>
    <div>
      <button type="button" @click="fetchTasks">Fetch tasks</button>
      <button type="button" @click="markAllAsDone">Mark all as done</button>
      <input placeholder="Task name" @keyup.prevent.enter="addTask">
       {{ doneTasksNumber }} / {{ tasks.length }}
    </div>
    <ul>
      <li v-for="task in tasks" :key="task.name"><task-container
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
        if(event.target.value.trim() === '' || this.findTaskByName(event.target.value)){
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

<style lang="scss">
  #app {
    width: 60%;
    margin: 0 auto;
    text-align: center;

    ul {
      padding: 0;
      list-style: none;
    }

    li > div > div {
      display: inline-block;
    }
  }
  .list-leave-active {
    position: absolute;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-move {
    transition: transform 1s;
  }
</style>
