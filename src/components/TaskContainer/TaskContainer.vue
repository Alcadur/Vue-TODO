<template>
  <div class="task">
    <div>{{ task.isDone }}</div>
    <div v-if="!isEditMode" @dblclick.prevent="editModeOn">{{ task.name }}</div>
    <div v-if="isEditMode"><input v-model="editName" @keyup.esc="editModeOff" @keyup.enter.prevent="editModeSave"></div>
    <div>
      <button type="button" @click="markAsDone">done</button>
      <button type="button" @click="remove">remove</button>
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
<style scoped>
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

a {
  color: #42b983;
}
</style>
