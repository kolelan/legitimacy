/**
 * класс отвечает за данные о легитимности сведений
  */
class Legitimacy {
    constructor(dataSource, dateSource, klsIdLegitimacy) {
        this.dataSource = dataSource;
        this.dateSource = dateSource;
        this.klsIdLegitimacy = klsIdLegitimacy;
    }

    getPayload() {
        return {
            data_source: this.dataSource,
            date_source: this.dateSource,
            kls_id_legitimacy: this.klsIdLegitimacy
        };
    }

    // Метод валидации
    validate() {
        const errors = [];

        if (!this.dataSource || typeof this.dataSource !== 'string') {
            errors.push('dataSource должен быть непустой строкой');
        }

        if (!this.dateSource || typeof this.dateSource !== 'string') {
            errors.push('dateSource должен быть непустой строкой');
        } else if (!this.isValidDate(this.dateSource)) {
            errors.push('dateSource должен быть валидной датой');
        }

        // Исправлено: проверка на число вместо строки
        if (this.klsIdLegitimacy === undefined ||
            this.klsIdLegitimacy === null ||
            typeof this.klsIdLegitimacy !== 'number' ||
            !Number.isInteger(this.klsIdLegitimacy) ||
            this.klsIdLegitimacy <= 0) {
            errors.push('klsIdLegitimacy должен быть положительным целым числом');
        }

        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : null
        };
    }

    // Вспомогательный метод для проверки даты
    isValidDate(dateString) {
        // Проверяем, что это строка и не пустая
        if (typeof dateString !== 'string' || !dateString.trim()) {
            return false;
        }

        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }

    toString() {
        return `Legitimacy: dataSource=${this.dataSource}, dateSource=${this.dateSource}, klsIdLegitimacy=${this.klsIdLegitimacy}`;
    }

    // Статический метод для создания из JSON
    static fromJSON(json) {
        return new Legitimacy(
            json.dataSource,
            json.dateSource,
            json.klsIdLegitimacy
        );
    }

    // Метод для преобразования в простой объект
    toObject() {
        return {
            dataSource: this.dataSource,
            dateSource: this.dateSource,
            klsIdLegitimacy: this.klsIdLegitimacy
        };
    }

    // Дополнительный метод для клонирования
    clone() {
        return new Legitimacy(
            this.dataSource,
            this.dateSource,
            this.klsIdLegitimacy
        );
    }
}

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

// Автозапуск только если это основной модуль
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { Legitimacy, Legitimacy as default, main };
//# sourceMappingURL=legitimacy.esm.js.map
