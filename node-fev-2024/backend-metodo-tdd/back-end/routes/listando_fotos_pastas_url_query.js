import path from 'path';
import express from 'express';

const router = express.Router();


import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { local_index, mime } from '../../configuracoes.js';
import { pasta_FOTOS_novas, stage } from '../../configuracoes.js';

import fs from 'fs';


// Recursive function to get all files in subfolders
function getFiles(directory) {
   const files = fs.readdirSync(directory, { withFileTypes: true });
   let fileNames = [];
   files.forEach(file => {
      if (file.isDirectory()) {
         const subfolderPath = path.join(directory, file.name);
         const subfolderFiles = getFiles(subfolderPath);
         fileNames = fileNames.concat(subfolderFiles.map(element => `${file.name}/${element}`));
      } else {
         fileNames.push(file.name);
      }
   });

   return fileNames;
}


export function listando_fotos_pastas_url_query(req, res, next) {

   var nome_pasta = req.query.pasta;   

   const completo_pasta_FOTOS = path.join(__dirname, "../"+pasta_FOTOS_novas);   

   const listando_arquivos = getFiles(completo_pasta_FOTOS);

   const base_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

   var base_url_desconsiderando_dupla_chamada = base_url.slice(0,base_url.indexOf(req.path));

   
   var lista_arquivos_filtrados=listando_arquivos.filter((val) => 
      val.includes(nome_pasta)
   );

   var lista_arquivos = lista_arquivos_filtrados.map(
      function (val) {
         return base_url_desconsiderando_dupla_chamada + "/novas/" + val;
      }
   );

   res.json(lista_arquivos);
}


/**
 * @openapi
 * /listando_fotos_pastas_url_query:
 *   get:
 *     summary: Retrieve photos from a specific folder
 *     description: This endpoint retrieves information from a specific folder within the 'novas' folder.
 *     parameters:
 *       - in: query
 *         name: pasta
 *         required: true
 *         description: The name of the specific folder to retrieve photos from.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Lista de fotos que estão na pasta especificada.
 */
router.get("/listando_fotos_pastas_url_query", listando_fotos_pastas_url_query);

export default router;