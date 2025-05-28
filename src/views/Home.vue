<template>
  <div class="home-container">
    <div v-if="user" class="greeting">Вітаємо, {{ user.displayName }}!</div>
    <div v-if="message" class="notify">{{ message }}</div>
    <h1>Kanban ToDo</h1>
    <!-- Фільтр за тегами -->
    <div class="tags-filter" v-if="allTags.length">
      <span
        v-for="tag in allTags"
        :key="tag"
        :class="['tag', { active: filterTag === tag }]"
        @click="filterTag = filterTag === tag ? '' : tag"
        style="display: flex; align-items: center;"
      >
        {{ tag }}
        <button class="remove-tag-btn" @click.stop="removeTagEverywhere(tag)" title="Видалити тег">×</button>
      </span>
      <span v-if="filterTag" class="clear-filter" @click="filterTag = ''">Скинути фільтр</span>
    </div>
    <div class="todo-input">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Назва задачі *" />
      <textarea v-model="newDetails" placeholder="Деталі (необов'язково)" rows="2"></textarea>
      <div class="tags-input">
        <input
          v-model="newTag"
          @keyup.enter="addTag"
          placeholder="Додати тег і натиснути Enter"
        />
        <span
          v-for="(tag, idx) in newTags"
          :key="tag"
          class="tag"
          @click="removeTag(idx)"
          title="Видалити тег"
        >{{ tag }} ×</span>
      </div>
      <button @click="addTodo">Додати</button>
    </div>
    <div class="kanban-board">
      <div class="kanban-column">
        <h2>Заплановано</h2>
        <draggable
          v-model="plannedList"
          group="tasks"
          item-key="id"
          class="todo-list"
        >
          <template #item="{ element }">
            <TodoItem
              :todo="element"
              @toggle="toggleTodo(element)"
              @remove="removeTodo(element)"
            >
              <template #tags>
                <div class="todo-tags">
                  <span v-for="tag in element.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </template>
            </TodoItem>
          </template>
        </draggable>
      </div>
      <div class="kanban-column">
        <h2>В процесі</h2>
        <draggable
          v-model="inProgressList"
          group="tasks"
          item-key="id"
          class="todo-list"
        >
          <template #item="{ element }">
            <TodoItem
              :todo="element"
              @toggle="toggleTodo(element)"
              @remove="removeTodo(element)"
            >
              <template #tags>
                <div class="todo-tags">
                  <span v-for="tag in element.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </template>
            </TodoItem>
          </template>
        </draggable>
      </div>
      <div class="kanban-column">
        <h2>Готово</h2>
        <draggable
          v-model="doneList"
          group="tasks"
          item-key="id"
          class="todo-list"
        >
          <template #item="{ element }">
            <TodoItem
              :todo="element"
              @toggle="toggleTodo(element)"
              @remove="removeTodo(element)"
            >
              <template #tags>
                <div class="todo-tags">
                  <span v-for="tag in element.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </template>
            </TodoItem>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '../components/TodoItem.vue'
import notify from '../mixins/notify'
import { auth, db } from '../firebase'
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import draggable from 'vuedraggable'

export default {
  name: 'HomePage',
  components: { TodoItem, draggable },
  mixins: [notify],
  data() {
    return {
      newTodo: '',
      newDetails: '',
      newTag: '',
      newTags: [],
      filterTag: '',
      todos: [],
      user: null,
      statuses: [
        { value: 'planned', label: 'Заплановано' },
        { value: 'in-progress', label: 'В процесі' },
        { value: 'done', label: 'Готово' }
      ]
    }
  },
  computed: {
    allTags() {
      const tags = new Set();
      this.todos.forEach(todo => (todo.tags || []).forEach(tag => tags.add(tag)));
      return Array.from(tags);
    },
    plannedList: {
      get() {
        let list = this.todos ? this.todos.filter(t => t.status === 'planned') : [];
        if (this.filterTag) list = list.filter(t => (t.tags || []).includes(this.filterTag));
        return list;
      },
      async set(newList) {
        for (const todo of newList) {
          const ref = doc(db, "users", this.user.uid, "todos", todo.id)
          await updateDoc(ref, { status: 'planned' })
        }
      }
    },
    inProgressList: {
      get() {
        let list = this.todos.filter(t => t.status === 'in-progress');
        if (this.filterTag) list = list.filter(t => (t.tags || []).includes(this.filterTag));
        return list;
      },
      async set(newList) {
        for (const todo of newList) {
          const ref = doc(db, "users", this.user.uid, "todos", todo.id)
          await updateDoc(ref, { status: 'in-progress' })
        }
      }
    },
    doneList: {
      get() {
        let list = this.todos.filter(t => t.status === 'done');
        if (this.filterTag) list = list.filter(t => (t.tags || []).includes(this.filterTag));
        return list;
      },
      async set(newList) {
        for (const todo of newList) {
          const ref = doc(db, "users", this.user.uid, "todos", todo.id)
          await updateDoc(ref, { status: 'done' })
        }
      }
    }
  },
  created() {
    this.user = auth.currentUser
    if (this.user) {
      this.fetchTodos()
    } else {
      auth.onAuthStateChanged(user => {
        this.user = user
        if (user) this.fetchTodos()
      })
    }
  },
  methods: {
    addTag() {
      const tag = this.newTag.trim();
      if (tag && !this.newTags.includes(tag)) {
        this.newTags.push(tag);
      }
      this.newTag = '';
    },
    removeTag(idx) {
      this.newTags.splice(idx, 1);
    },
    async fetchTodos() {
      const q = query(collection(db, "users", this.user.uid, "todos"), orderBy("createdAt", "asc"))
      onSnapshot(q, (querySnapshot) => {
        this.todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
    },
    async addTodo() {
      if (this.newTodo.trim()) {
        await addDoc(collection(db, "users", this.user.uid, "todos"), {
          text: this.newTodo,
          details: this.newDetails,
          tags: this.newTags,
          done: false,
          status: 'planned',
          createdAt: Date.now()
        })
        this.newTodo = ''
        this.newDetails = ''
        this.newTags = []
        this.showMessage('Задачу додано!')
      }
    },
    async toggleTodo(todo) {
      const ref = doc(db, "users", this.user.uid, "todos", todo.id)
      await updateDoc(ref, {
        done: !todo.done,
        status: todo.done ? 'planned' : 'done'
      })
    },
    async removeTodo(todo) {
      const ref = doc(db, "users", this.user.uid, "todos", todo.id)
      await deleteDoc(ref)
    },
    async removeTagEverywhere(tagToRemove) {
      // Видаляємо тег з усіх задач користувача
      const tasksWithTag = this.todos.filter(todo => (todo.tags || []).includes(tagToRemove));
      for (const todo of tasksWithTag) {
        const newTags = (todo.tags || []).filter(tag => tag !== tagToRemove);
        const ref = doc(db, "users", this.user.uid, "todos", todo.id);
        await updateDoc(ref, { tags: newTags });
      }
      // Якщо цей тег був у фільтрі — скидаємо фільтр
      if (this.filterTag === tagToRemove) this.filterTag = '';
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 1100px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(60,60,60,0.10);
  padding: 32px 24px 24px 24px;
}
.greeting {
  font-size: 1.2em;
  color: #2b6cb0;
  margin-bottom: 12px;
  font-weight: 600;
}
.todo-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}
.tags-input, .tags-filter, .todo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}
.tag {
  background: #e0e7ef;
  color: #2563eb;
  border-radius: 6px;
  padding: 2px 10px;
  font-size: 0.95em;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}
.tag.active, .tag:hover {
  background: #2563eb;
  color: #fff;
}
.clear-filter {
  margin-left: 12px;
  color: #e53e3e;
  cursor: pointer;
  font-size: 0.95em;
}
input, textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #e0e7ef;
  font-size: 1em;
}
button {
  background: #3182ce;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
button:hover {
  background: #2563eb;
}
.kanban-board {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}
.kanban-column {
  flex: 1;
  background: #f8fafc;
  border-radius: 10px;
  padding: 18px 12px;
  min-height: 300px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.04);
}
.kanban-column h2 {
  text-align: center;
  margin-bottom: 16px;
  color: #3182ce;
  font-size: 1.15em;
  font-weight: 600;
}
.todo-list {
  min-height: 40px;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.notify {
  color: green;
  margin-bottom: 10px;
}
.remove-tag-btn {
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 1.1em;
  margin-left: 4px;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  border-radius: 50%;
  transition: background 0.2s;
}
.remove-tag-btn:hover {
  background: #ffeaea;
}
</style>