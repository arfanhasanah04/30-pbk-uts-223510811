import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // Pastikan path ke router benar
import { Quasar, QLayout, QHeader, QToolbar, QToolbarTitle, QBtn, QPageContainer, QList, QItem, QItemSection, QItemLabel, QImg, QInput, QForm, QRadio, QCheckbox } from 'quasar';
import 'quasar/dist/quasar.css'; // Pastikan path ke quasar.css benar
import './main.css'; // Pastikan path ke main.css benar

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  components: {
    QLayout,
    QHeader,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QPageContainer,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QImg,
    QInput,
    QForm,
    QRadio,
    QCheckbox
  }
});

app.mount('#app');
