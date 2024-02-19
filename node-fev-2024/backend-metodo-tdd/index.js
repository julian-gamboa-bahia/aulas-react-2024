import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: [
  'index.js',
  'index.js',
  ], 
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


/**
 * @openapi
 * /:
 *   get:
*     summary: Retrieve the main page
 *     description: This endpoint retrieves the main `index.html` file located at the root ("/") of the project.
 *     responses:
 *       200:
 *         description: Successfully retrieved the `index.html` file from the "front-end" folder.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               description: The HTML content of the `index.html` file.
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(3000, () => console.log('Listening on port 3000'));