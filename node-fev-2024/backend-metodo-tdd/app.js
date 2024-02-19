import serverless from 'serverless-http';

import express from 'express';

/**************************************



**************************************/

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import {options_swagger} from './configuracoes.js';

import {lista_fotos_novas_sub_pastas} from './back-end/lista_fotos_novas_sub_pastas.js'

import {stage} from './configuracoes.js';

import {atendendo_componente} from './back-end/atendendo_componente.js'

import {entregando_index} from './back-end/entregando_index.js';

import {entregando_front_etiqueta} from './back-end/entregando_front_etiqueta.js';

import {entregando_complementos_index} from './back-end/entregando_complementos_index.js';

import {lista_fotos_classificadas} from './back-end/lista_fotos_classificadas.js'

import {entregando_nova_imagem} from './back-end/entregando_nova_imagem.js'

import {lista_pastas as listar_pastas_classificadas} from './back-end/lista_pastas.js';


import {listando_fotos_pastas} from './back-end/listando_fotos_pastas.js'

import {listando_fotos_pastas_url_query} from './back-end/routes/listando_fotos_pastas_url_query.js'


import cors from 'cors';

////////////////////////////////////////////////////////

const specs = swaggerJsdoc(options_swagger);

const app = express();

app.use(cors()); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Index
app.get('/'+stage+'/', entregando_index);

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

app.get('/', entregando_index);


/************************************************************************
Entrega uma lista daquelas fotos colocadas na PASTA de Novas

Pode-se também listar aquelas pastas classificas (listar_pastas_classificadas)

*************************************************************************/
app.get('/'+stage+'/novas', lista_fotos_novas_sub_pastas);


/**
 * @openapi
 * /novas:
 *   get:
*     summary: 
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               description: 
 */

app.get("/novas", lista_fotos_novas_sub_pastas);


/**
 * @openapi
 * /lista_pastas:
 *   get:

 */

app.get("/lista_pastas", listar_pastas_classificadas);

//PNG
app.get('/'+stage+'/novas/*.png', entregando_nova_imagem); 
app.get("/novas/*.png", entregando_nova_imagem); 
//JPG
app.get('/'+stage+'/novas/*.jpg', entregando_nova_imagem); 
app.get("/novas/*.jpg", entregando_nova_imagem); 






//classificadas
app.get('/'+stage+'/classificadas', lista_fotos_classificadas);
app.get("/classificadas", lista_fotos_classificadas);

//jpg
app.get('/'+stage+'/classificadas/*/*.jpg', entregando_nova_imagem);
app.get("/classificadas/*/*.jpg", entregando_nova_imagem);

//png
app.get('/'+stage+'/classificadas/*/*.png', entregando_nova_imagem);
app.get("/classificadas/*/*.png", entregando_nova_imagem);

//Complemento (Index) 
app.get('/'+stage+'/*.*', entregando_complementos_index); 
app.get("/*.*", entregando_complementos_index); 

//Entregando o front (index.html) relacionado com cada pasta
app.get("/*/*",entregando_front_etiqueta);



app.get("/*", (req, res, next) => {
  if (!req.url.includes('query')) {
    listando_fotos_pastas(req, res);
  }
  next();
});


app.use(listando_fotos_pastas_url_query);



export const lambdaHandler = serverless(app, {
    binary: ['image/png', 'image/gif','image/jpg']
  });

//
app.listen(3001);