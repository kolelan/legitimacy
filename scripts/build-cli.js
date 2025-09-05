import { readFileSync, writeFileSync, chmodSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Читаем исходный файл CLI
const cliContent = readFileSync(resolve(__dirname, '../src/cli.js'), 'utf8');

// Исправляем импорты для dist
const distCliContent = cliContent
    .replace(`import { readFileSync } from 'fs';`, '')
    .replace(`import { resolve, dirname } from 'path';`, '')
    .replace(`import { fileURLToPath } from 'url';`, '')
    .replace(`const __dirname = dirname(fileURLToPath(import.meta.url));`, '');

// Создаем финальный контент с правильными импортами
const finalCliContent = `

import { resolve, dirname } from 'path';
import { Legitimacy } from './legitimacy.es.js';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

${distCliContent}`;

// Записываем в dist
writeFileSync(resolve(__dirname, '../dist/cli.js'), finalCliContent, 'utf8');

// Делаем файл исполняемым (для Unix-систем)
try {
    chmodSync(resolve(__dirname, '../dist/cli.js'), '755');
    console.log('✅ CLI файл собран и сделан исполняемым');
} catch (error) {
    console.log('✅ CLI файл собран (права на выполнение не установлены)');
}