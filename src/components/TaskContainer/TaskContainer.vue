<template>
  <div class="task">
    <div class="status" :class="{done: task.isDone}"></div>
    <div v-if="!isEditMode" class="description" @dblclick.prevent="editModeOn">{{ task.name }}</div>
    <div v-if="isEditMode" class="description"><input v-model="editName" @keyup.esc="editModeOff" @keyup.enter.prevent="editModeSave"></div>
    <div class="buttons">
      <button type="button" @click="markAsDone">Done</button>
      <button type="button" @click="remove">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: ['task'],
  data () {
    return {
        editName: '',
        isEditMode: false
    }
  },
  methods: {
    markAsDone() {
        this.task.isDone = true;
    },
    remove() {
      this.$emit('remove', this.task);
    },
    editModeOn() {
        this.editName = this.task.name;
        this.isEditMode = true;
    },
    editModeOff() {
      this.isEditMode = false;
    },
    editModeSave() {
        this.task.name = this.editName;
        this.editModeOff();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.status {
  position: relative;
  top: 7px;
  margin-right: 10px;

  &:before {
    content: '';
    display: block;
    width: 25px;
    height: 25px;
    background: #a6090d;
    transition: background 250ms ease-in-out;
  }

  &.done:before {
    background: #007600;
  }
}

.description {
  box-sizing: border-box;
  width: calc(100% - 200px);
  line-height: 25px ;
}

.buttons {
  width: 150px;

  .task & button {
    width: auto;
  }
}

a {
  color: #42b983;
}
</style>
