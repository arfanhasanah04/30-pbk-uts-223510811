<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Arfan Hasanah
        </q-toolbar-title>
        <q-btn flat label="Posts" @click="$router.push('/posts')" />
        <q-btn flat label="Todos" @click="$router.push('/todos')" />
        <q-btn flat label="Albums" @click="$router.push('/albums')" />
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

.q-toolbar {
  background-color: rgb(10, 66, 179);
  color: #fff;
}

.q-page-container {
  padding: 20px;
}

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

.options .q-radio.movie-radio {
  background-color: #fff3cd; /* Yellow background for movies */
  border-radius: 4px;
  padding: 5px;
}

.options .q-radio.series-radio {
  background-color: #c3e6cb; /* Light green background for series */
  border-radius: 4px;
  padding: 5px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-item.done {
  background-color: #d4edda;
}

.todo-item.movie {
  background-color: #fff3cd; /* Yellow background for movies */
  border: 2px solid #ffc107; /* Yellow border for movies */
}

.todo-item.series {
  background-color: #c3e6cb; /* Light green background for series */
  border: 2px solid #28a745; /* Green border for series */
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

/* Added styles for buttons */
.q-btn.movie-btn {
  background-color: #ffc107; /* Yellow background for movie button */
  color: #000; /* Dark text color for contrast */
}

.q-btn.series-btn {
  background-color: #28a745; /* Green background for series button */
  color: #000; /* Dark text color for contrast */
}
</style>
