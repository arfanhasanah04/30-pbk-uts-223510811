<template>
    <q-page class="container">
      <section class="greeting">
        <h2 class="title">
          Mau Nonton Apa? <q-input filled v-model="nameData" placeholder="Name here" />
        </h2>
      </section>
  
      <section class="create-todo">
        <h3>List Movie</h3>
  
        <q-form @submit.prevent="addTodo" class="form-content">
          <q-input filled v-model="input_content" placeholder="Enter movie or series name" />
          
          <h4>Kategori Film</h4>
          <div class="options">
            <q-radio v-model="input_category" val="Movie" label="Movie" />
            <q-radio v-model="input_category" val="Series" label="Series" />
          </div>
  
          <q-btn label="Add to list" type="submit" color="primary" class="add-btn" />
        </q-form>
      </section>
  
      <section class="todo-list">
        <h3>TODO LIST</h3>
        <div class="list" id="todo-list">
          <q-item v-for="todo in todos" :key="todo.createdAt" class="todo-item" :class="todo.category.toLowerCase()">
            <q-item-section>
              <q-checkbox v-model="todo.done" />
              <span>{{ todo.content }}</span>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="delete" @click="removeTodo(todo)" color="negative" class="delete-btn" />
            </q-item-section>
          </q-item>
        </div>
      </section>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  
  const todosData = ref([]);
  const nameData = ref('');
  
  const input_content = ref('');
  const input_category = ref(null);
  
  const todos = computed(() => todosData.value.sort((a, b) => a.createdAt - b.createdAt));
  
  watch(nameData, (newVal) => {
    localStorage.setItem('name', newVal);
  });
  
  watch(todosData, (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal));
  }, {
    deep: true,
  });
  
  const addTodo = () => {
    if (input_content.value.trim() === '' || input_category.value === null) {
      return;
    }
  
    todosData.value.push({
      content: input_content.value,
      category: input_category.value,
      done: false,
      editable: false,
      createdAt: new Date().getTime(),
    });
    input_content.value = '';
    input_category.value = null;
  };
  
  const removeTodo = (todo) => {
    todosData.value = todosData.value.filter((t) => t !== todo);
  };
  
  onMounted(() => {
    nameData.value = localStorage.getItem('name') || '';
    todosData.value = JSON.parse(localStorage.getItem('todos')) || [];
  });
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f0f0f0;
  }
  
  .greeting {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .create-todo,
  .todo-list {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .options {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
  
  .options q-radio {
    margin: 0 10px;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  
  .todo-item.done {
    background-color: #d4edda;
  }
  
  .todo-item.movie {
    background-color: #fff3cd; /* Yellow background for movies */
  }
  
  .todo-item.series {
    background-color: #d4edda; /* Green background for series */
  }
  
  .add-btn,
  .delete-btn {
    font-size: 12px;
    min-width: unset;
    margin-left: 10px;
  }
  
  .delete-btn .q-icon {
    font-size: 12px;
  }
  </style>
  