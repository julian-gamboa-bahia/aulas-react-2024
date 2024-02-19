/*************************************************************************


Na pasta (novas) podem se colocar pastas e arquivos(fotos) diretamente



*************************************************************************/

import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { pasta_FOTOS_novas, stage } from '../configuracoes.js';
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

export function lista_fotos_novas_sub_pastas(req, res) {
    const completo_pasta_FOTOS = path.join(__dirname, pasta_FOTOS_novas);


    const listando_arquivos = getFiles(completo_pasta_FOTOS);


    const base_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    var lista_arquivos = listando_arquivos.map(
        function(val){
            return base_url+"/"+val;
        }
     );
       
    res.json(lista_arquivos);
}
