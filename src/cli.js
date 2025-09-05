
// Функция для вывода помощи
function showHelp() {
    console.log(`
Legitimacy CLI Tool - Демонстрация работы с классом Legitimacy

Использование:
  legitimacy-demo [опции]

Опции:
  --help, -h      Показать эту справку
  --version, -v   Показать версию
  --test, -t      Запустить тестовые примеры
  --create, -c    Создать объект Legitimacy (требует параметры)
  
Примеры:
  legitimacy-demo --test
  legitimacy-demo --create "Источник" "2024-01-01" 123
    `);
}

// Функция для показа версии
async function showVersion() {
    try {
        const fs = await import('fs');
        const path = await import('path');
        const { fileURLToPath } = await import('url');

        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const packageJsonPath = path.resolve(__dirname, '../package.json');

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        console.log(`Legitimacy CLI v${packageJson.version}`);
    } catch (error) {
        console.log('Legitimacy CLI v1.0.0');
    }
}

// Функция для создания объекта из аргументов командной строки
function createFromArgs(args) {
    if (args.length < 3) {
        console.error('Ошибка: для создания объекта需要 3 параметра: dataSource, dateSource, klsIdLegitimacy');
        process.exit(1);
    }

    const dataSource = args[0];
    const dateSource = args[1];
    const klsIdLegitimacy = parseInt(args[2], 10);

    if (isNaN(klsIdLegitimacy)) {
        console.error('Ошибка: klsIdLegitimacy должен быть числом');
        process.exit(1);
    }

    try {
        const legitimacy = new Legitimacy(dataSource, dateSource, klsIdLegitimacy);

        console.log('✅ Объект успешно создан:');
        console.log(legitimacy.toString());

        const validation = legitimacy.validate();
        console.log('\n🔍 Результат валидации:');
        console.log(validation.isValid ? '✅ Валидный' : '❌ Невалидный');

        if (!validation.isValid) {
            console.log('Ошибки:', validation.errors.join(', '));
        }

        console.log('\n📦 Payload:');
        console.log(legitimacy.getPayload());

    } catch (error) {
        console.error('❌ Ошибка при создании объекта:', error.message);
        process.exit(1);
    }
}

// Основная функция CLI
async function runCLI() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        showHelp();
        return;
    }

    if (args.includes('--version') || args.includes('-v')) {
        await showVersion();
        return;
    }

    if (args.includes('--test') || args.includes('-t')) {
        console.log('🚀 Запуск демонстрационных примеров...\n');

        return;
    }

    if (args.includes('--create') || args.includes('-c')) {
        const createIndex = args.findIndex(arg => arg === '--create' || arg === '-c');
        const createArgs = args.slice(createIndex + 1);
        createFromArgs(createArgs);
        return;
    }

    console.log('❌ Неизвестная команда. Используйте --help для справки.');
    process.exit(1);
}

// Запуск CLI
runCLI().catch(error => {
    console.error('❌ Неожиданная ошибка:', error);
    process.exit(1);
});