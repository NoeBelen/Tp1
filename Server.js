

const http= require("http");
const fs=require("fs");
const path = require("path");


let materias=[];
let idCounter=[];

const requestHandlet=(req,res)=>{

    const url = req.url;
    const method = req.url;
}
if (url === '/' && method === 'GET') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error al cargar el archivo HTML');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });

}
else if (url.startsWith('/public/')) {
    const filePath = path.join(__dirname, url);
    const ext = path.extname(filePath);
    const contentType = ext === '.css' ? 'text/css' : 'application/javascript';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end('Archivo no encontrado');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

else if (url === '/materias' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(materias));
}

else if (url.startsWith('/materias/') && method === 'GET') {
    const id = parseInt(url.split('/')[2]);
    const materia = materias.find(m => m.id === id);
    if (materia) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(materia));
    } else {
        res.writeHead(404);
        res.end('Materia no encontrada');
    }
}

else if (url === '/materias' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const nuevaMateria = JSON.parse(body);
        nuevaMateria.id = idCounter++;
        materias.push(nuevaMateria);
        res.writeHead(201);
        res.end('Materia agregada');
    });
}

else if (url === '/materias' && method === 'DELETE') {
    materias = [];
    res.writeHead(200);
    res.end('Todas las materias han sido eliminadas');
}

else if (url.startsWith('/materias/') && method === 'DELETE') {
    const id = parseInt(url.split('/')[2]);
    materias = materias.filter(m => m.id !== id);
    res.writeHead(200);
    res.end(`Materia con ID ${id} ha sido eliminada`);
}

else {
    res.writeHead(404);
    res.end('Ruta no encontrada');
}
;


const server = http.createServer(requestHandler);


