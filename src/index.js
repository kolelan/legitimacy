import { Legitimacy } from './models/Legitimacy.js';

// Пример использования класса Legitimacy
function main() {
    console.log('=== Демонстрация работы класса Legitimacy ===\n');

    // Создание валидного объекта
    try {
        const validLegitimacy = new Legitimacy(
            'Официальный источник',
            '2024-01-15',
            123
        );

        console.log('Валидный объект:');
        console.log(validLegitimacy.toString());

        const validation = validLegitimacy.validate();
        console.log('Валидация:', validation);
        console.log('Payload:', validLegitimacy.getPayload());
        console.log('JSON объект:', validLegitimacy.toObject());
        console.log('');
    } catch (error) {
        console.error('Ошибка при создании валидного объекта:', error.message);
    }

    // Создание невалидного объекта
    try {
        const invalidLegitimacy = new Legitimacy(
            '', // невалидный dataSource
            'невалидная дата', // невалидная дата
            -5 // невалидный klsIdLegitimacy
        );

        console.log('Невалидный объект:');
        console.log(invalidLegitimacy.toString());

        const validation = invalidLegitimacy.validate();
        console.log('Валидация:', validation);
        console.log('');
    } catch (error) {
        console.error('Ошибка при создании невалидного объекта:', error.message);
    }

    // Демонстрация статических методов
    console.log('=== Демонстрация статических методов ===');

    const jsonData = {
        dataSource: 'Внешняя база',
        dateSource: '2024-02-20',
        klsIdLegitimacy: 456
    };

    const fromJSON = Legitimacy.fromJSON(jsonData);
    console.log('Из JSON:', fromJSON.toString());

    const clone = fromJSON.clone();
    console.log('Клон:', clone.toString());
    console.log('Клон равен оригиналу:', clone.toObject() === fromJSON.toObject() ? 'Да' : 'Нет');
}

// Запуск демонстрации
main();