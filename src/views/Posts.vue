<template>
    <div class="container">
      <div class="content">
        <div v-if="selectedMenu === 'Post'" class="post-section">
          <div style="text-align: center;">
            <!-- Added label for select dropdown -->
            <label for="user-select">Select User</label>
            <select id="user-select" v-model="selectedUser" @change="fetchPosts">
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
          </div>
          <div v-if="posts.length > 0">
            <h2>Postingan User: {{ selectedUserName }}</h2>
            <ul>
              <li v-for="post in posts" :key="post.id">
                <h3>{{ post.title }}</h3>
                <p>{{ post.body }}</p>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const selectedMenu = ref('Post');
  const users = ref([]);
  const selectedUser = ref(null);
  const selectedUserName = ref('');
  const posts = ref([]);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      users.value = await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const fetchPosts = async () => {
    if (selectedUser.value) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
        posts.value = await response.json();
        const selectedUserObj = users.value.find(user => user.id === selectedUser.value);
        if (selectedUserObj) {
          selectedUserName.value = selectedUserObj.name;
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  };
  
  onMounted(fetchUsers);
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    height: 100vh;
  }
  
  header {
    background-color: #fdf908;
    padding: 5px;
    display: block;
    width: 100%;
    border-radius: 0.5rem;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }
  
  nav ul li {
    margin-right: 20px;
  }
  
  nav ul li button {
    background-color: #ff00ff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  nav ul li button:hover {
    background-color: #cc00cc;
  }
  
  nav ul li .active {
    font-weight: bold;
  }
  
  .content {
    max-width: 800px;
    width: 100%;
  }
  
  .post-section {
    margin-top: 20px;
    text-align: center; /* Center the select element */
  }
  
  .post-section label {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .post-section select {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  
  .post-section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .post-section ul li {
    margin-bottom: 20px;
  }
  </style>
  