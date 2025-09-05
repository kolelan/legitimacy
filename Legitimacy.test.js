import { Legitimacy } from './Legitimacy.js';

describe('Legitimacy Class', () => {
    describe('Constructor', () => {
        test('should create instance with valid parameters', () => {
            const legitimacy = new Legitimacy('Test Source', '2024-01-15', 123);

            expect(legitimacy).toBeInstanceOf(Legitimacy);
            expect(legitimacy.dataSource).toBe('Test Source');
            expect(legitimacy.dateSource).toBe('2024-01-15');
            expect(legitimacy.klsIdLegitimacy).toBe(123);
        });
    });

    describe('Validation', () => {
        test('should validate correct object', () => {
            const legitimacy = new Legitimacy('Valid Source', '2024-01-15', 123);
            const validation = legitimacy.validate();

            expect(validation.isValid).toBe(true);
            expect(validation.errors).toBeNull();
        });

        test('should invalidate empty dataSource', () => {
            const legitimacy = new Legitimacy('', '2024-01-15', 123);
            const validation = legitimacy.validate();

            expect(validation.isValid).toBe(false);
            expect(validation.errors).toContain('dataSource должен быть непустой строкой');
        });

        test('should invalidate invalid dateSource', () => {
            const legitimacy = new Legitimacy('Valid Source', 'invalid-date', 123);
            const validation = legitimacy.validate();

            expect(validation.isValid).toBe(false);
            expect(validation.errors).toContain('dateSource должен быть валидной датой');
        });

        test('should invalidate non-number klsIdLegitimacy', () => {
            const legitimacy = new Legitimacy('Valid Source', '2024-01-15', 'not-a-number');
            const validation = legitimacy.validate();

            expect(validation.isValid).toBe(false);
            expect(validation.errors).toContain('klsIdLegitimacy должен быть положительным целым числом');
        });

        test('should invalidate negative klsIdLegitimacy', () => {
            const legitimacy = new Legitimacy('Valid Source', '2024-01-15', -5);
            const validation = legitimacy.validate();

            expect(validation.isValid).toBe(false);
            expect(validation.errors).toContain('klsIdLegitimacy должен быть положительным целым числом');
        });

        test('should invalidate zero klsIdLegitimacy', () => {
            const legitimacy = new Legitimacy('Valid Source', '2024-01-15', 0);
            const validation = legitimacy.validate();

            expect(validation.isValid).toBe(false);
            expect(validation.errors).toContain('klsIdLegitimacy должен быть положительным целым числом');
        });
    });

    describe('Methods', () => {
        let legitimacy;

        beforeEach(() => {
            legitimacy = new Legitimacy('Test Source', '2024-01-15', 123);
        });

        test('getPayload should return correct object', () => {
            const payload = legitimacy.getPayload();

            expect(payload).toEqual({
                data_source: 'Test Source',
                date_source: '2024-01-15',
                kls_id_legitimacy: 123
            });
        });

        test('toString should return correct string representation', () => {
            const stringRepr = legitimacy.toString();

            expect(stringRepr).toBe('Legitimacy: dataSource=Test Source, dateSource=2024-01-15, klsIdLegitimacy=123');
        });

        test('toObject should return plain object', () => {
            const obj = legitimacy.toObject();

            expect(obj).toEqual({
                dataSource: 'Test Source',
                dateSource: '2024-01-15',
                klsIdLegitimacy: 123
            });
        });

        test('clone should create identical copy', () => {
            const clone = legitimacy.clone();

            expect(clone).toBeInstanceOf(Legitimacy);
            expect(clone).not.toBe(legitimacy);
            expect(clone.toObject()).toEqual(legitimacy.toObject());
        });
    });

    describe('Static Methods', () => {
        test('fromJSON should create instance from JSON object', () => {
            const jsonData = {
                dataSource: 'JSON Source',
                dateSource: '2024-03-01',
                klsIdLegitimacy: 789
            };

            const legitimacy = Legitimacy.fromJSON(jsonData);

            expect(legitimacy).toBeInstanceOf(Legitimacy);
            expect(legitimacy.dataSource).toBe('JSON Source');
            expect(legitimacy.dateSource).toBe('2024-03-01');
            expect(legitimacy.klsIdLegitimacy).toBe(789);
        });
    });

    describe('Edge Cases', () => {
    test('should handle null parameters in validation', () => {
        const legitimacy = new Legitimacy(null, null, null);
        const validation = legitimacy.validate();

        expect(validation.isValid).toBe(false);
        expect(validation.errors).toHaveLength(3);
    });

    test('should handle undefined parameters in validation', () => {
        const legitimacy = new Legitimacy(undefined, undefined, undefined);
        const validation = legitimacy.validate();

        expect(validation.isValid).toBe(false);
        expect(validation.errors).toHaveLength(3);
    });

    test('isValidDate should validate various date formats', () => {
        const legitimacy = new Legitimacy('Test', '2024-01-15', 123);

        expect(legitimacy.isValidDate('2024-01-15')).toBe(true);
        expect(legitimacy.isValidDate('invalid-date')).toBe(false);
        expect(legitimacy.isValidDate('')).toBe(false);
        expect(legitimacy.isValidDate(null)).toBe(false);
        expect(legitimacy.isValidDate(undefined)).toBe(false);
        expect(legitimacy.isValidDate(123)).toBe(false);
        expect(legitimacy.isValidDate({})).toBe(false);
    });
});
});