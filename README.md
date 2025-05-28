# todo-vue-app

## Запуск проекту через Vue CLI

1. Встановити залежності:
   ```
   npm install
   ```

2. Запустити проект у режимі розробки:
   ```
   npm run serve
   ```

3. Зібрати проект для продакшну:
   ```
   npm run build
   ```

## Комунікація між компонентами

- Дані про задачу передаються у компонент TodoItem через props.
- Дії (зміна статусу, видалення) повертаються у App.vue через кастомні події ($emit).

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
