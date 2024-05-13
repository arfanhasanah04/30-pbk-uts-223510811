<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <li>
            <button @click="selectedMenu = 'Post'" :class="{ active: selectedMenu === 'Post' }">Post</button>
          </li>
          <li>
            <button @click="selectedMenu = 'Todos'" :class="{ active: selectedMenu === 'Todos' }">Todos</button>
          </li>
        </ul>
      </nav>
    </header>
    <div class="content">
      <div v-if="selectedMenu === 'Post'" class="post-section">
        <div class="select-user">
          <label for="user-select">Pilih Pengguna:</label>
          <select id="user-select" v-model="selectedUser" @change="fetchPosts">
            <option value="" disabled>Pilih pengguna</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
        <div v-if="posts.length > 0" class="post-list">
          <h2>Postingan User: {{ selectedUserName }}</h2>
          <table class="post-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts" :key="post.id">
                <td>{{ post.title }}</td>
                <td>{{ post.body }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="loading">
          <p>Loading...</p>
        </div>
      </div>
      <div v-else-if="selectedMenu === 'Todos'" class="todos-section">
        <Todos :todos="todos" />
      </div>
    </div>
  </div>
</template>

<script>
import Todos from './Todos.vue';

export default {
  components: {
    Todos
  },
  data() {
    return {
      selectedMenu: 'Post',
      users: [],
      selectedUser: null,
      selectedUserName: '',
      posts: [],
      todos: []
    };
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchPosts() {
      if (this.selectedUser) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(data => {
            this.posts = data;
          })
          .catch(error => {
            console.error('Error fetching posts:', error);
          });
        
        const selectedUser = this.users.find(user => user.id === parseInt(this.selectedUser));
        if (selectedUser) {
          this.selectedUserName = selectedUser.name;
        }
      }
    }
  },
  watch: {
    selectedUser() {
      this.fetchPosts();
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

header {
  background-color: #3A82EE;
  padding: 15px 0;
  border-radius: 0.5rem;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
  color: #fff;
  cursor: pointer;
}

nav ul li.active {
  font-weight: bold;
}

button {
  background-color: #ff00ff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #cc00cc;
}

.content {
  max-width: 800px;
}

.post-section,
.todos-section {
  margin-top: 20px;
}

.select-user {
  margin-bottom: 20px;
}

.select-user label {
  margin-right: 10px;
}

.select-user select {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.post-list {
  margin-top: 20px;
}

.loading {
  margin-top: 20px;
  text-align: center;
}

/* Styling for post table */
.post-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

/* Styling for table header */
.post-table th {
  background-color: #3A82EE;
  color: #fff;
  font-weight: bold;
  padding: 10px;
}

/* Styling for table body */
.post-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

/* Styling for table rows */
.post-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.post-table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

/* Hover effect on table rows */
.post-table tbody tr:hover {
  background-color: #cceeff;
}
</style>
