# Legitimacy Project

Проект для тестирования работы Jest с ES Modules (import/export) и исследования различных конфигураций.

## 📋 О проекте

Этот проект создан для изучения и демонстрации:
- Настройки Jest для работы с ES Modules (import/export)
- Различных конфигураций Jest (через `jest.config.js` или `package.json`)
- Сравнения подходов ES Modules vs CommonJS
- Генерации отчетов о покрытии тестами

## 🏗️ Структура проекта

```
legitimacy-project/
├── src/
│   ├── models/
│   │   └── Legitimacy.js      # Основной класс с ES Modules
│   └── index.js               # Демонстрационный файл
├── tests/
│   └── models/
│       └── Legitimacy.test.js # Тесты для класса Legitimacy
├── coverage/                  # Отчеты о покрытии (генерируется)
├── jest.config.js            # Конфигурация Jest
├── babel.config.js           # Конфигурация Babel
└── package.json
```

## 🚀 Быстрый старт

### Установка зависимостей
```bash
npm install
```

### Запуск тестов
```bash
npm test
```

### Запуск тестов с покрытием
```bash
npm run test:coverage
```

### Запуск демонстрации
```bash
npm start
```

## 🔧 Конфигурации Jest

### Текущая конфигурация (ES Modules с Babel)
Используется Babel для трансформации ES Modules в CommonJS:

**jest.config.js:**
```javascript
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js'
  ],
  coverageReporters: ['text', 'lcov', 'html']
};
```

**babel.config.js:**
```javascript
export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
};
```

## 🌿 Ветка CommonJS

Для сравнения подходов создана отдельная ветка `commonjs-version` с примером использования CommonJS:

```bash
git checkout commonjs-version
```

### Конфигурация для CommonJS
В ветке CommonJS используется упрощенная настройка:

**package.json:**
```json
{
  "jest": {
    "testEnvironment": "node",
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/index.js"
    ]
  }
}
```

## 📊 Покрытие тестами

Проект включает тесты для:
- ✅ Конструктора класса
- ✅ Валидации данных
- ✅ Всех методов класса
- ✅ Статических методов
- ✅ Граничных случаев
- ✅ Обработки ошибок

## 🧪 Тестируемые сценарии

### Валидные данные
```javascript
const valid = new Legitimacy('Источник', '2024-01-15', 123);
```

### Невалидные данные
```javascript
const invalid = new Legitimacy('', 'invalid-date', -5);
```

### Статические методы
```javascript
const fromJson = Legitimacy.fromJSON(jsonData);
```

## 🔄 Альтернативные конфигурации

### Вариант 1: Нативная поддержка ES Modules
```javascript
// jest.config.js
export default {
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};
```

### Вариант 2: Конфигурация в package.json
```json
{
  "jest": {
    "testEnvironment": "node",
    "transform": {
      "^.+\\.js$": "babel-jest"
    },
    "collectCoverage": true
  }
}
```

## 📝 Заметки по настройке

### Проблемы и решения
1. **SyntaxError: Cannot use import statement outside a module**
    - Решение: Использовать Babel для трансформации

2. **ExperimentalWarning: VM Modules**
    - Решение: Настройка transform в Jest config

3. **Поддержка ES Modules в Node.js**
    - Требует аккуратной настройки package.json и Jest

### Рекомендации
- Для новых проектов использовать ES Modules + Babel
- Для legacy проектов - CommonJS
- Тестировать конфигурацию на простых примерах перед применением в больших проектах

## 📈 Отчеты о покрытии

После запуска `npm run test:coverage` генерируются:
- Текстовый отчет в консоли
- HTML отчет в папке `coverage/`
- LCOV отчет для CI систем

## 🔗 Полезные ссылки

- [Jest Documentation](https://jestjs.io/)
- [Babel Documentation](https://babeljs.io/)
- [ES Modules in Node.js](https://nodejs.org/api/esm.html)
- [CommonJS vs ES Modules](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/)

## 👥 Разработка

Проект создан для исследования и может использоваться как:
- Пример настройки Jest с ES Modules
- Шаблон для новых проектов
- Educational material для изучения тестирования

## 📄 Лицензия

MIT License - можно свободно использовать для обучения и проектов.