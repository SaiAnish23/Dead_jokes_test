import fs from 'fs/promises';
import ejs from 'ejs';
import { getjokes } from './database.js';
const templatePath = './views/index.ejs';
const outputPath = './public/index.html';

const data = {
    // Assuming you need to provide category and joke data to render the template
    category: 'Default Category', // You can set a default category if needed
    question: '', // Default question text
    joke: '', // Default joke text
    myjoke: await getjokes() // Fetch jokes from the database
};
// Load the EJS template
const template = await fs.readFile(templatePath, 'utf-8');

// Render the EJS template
const renderedHTML = ejs.render(template, data);

// Write the rendered HTML to a file
await fs.writeFile(outputPath, renderedHTML);
