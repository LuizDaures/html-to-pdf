const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { execSync } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.text({ type: 'text/html' }));

app.post('/gerar-pdf', (req, res) => {
  const html = req.body;
  const id = uuidv4();
  const htmlPath = `/tmp/${id}.html`;
  const pdfPath = `/tmp/${id}.pdf`;

  fs.writeFileSync(htmlPath, html);
  execSync(`wkhtmltopdf ${htmlPath} ${pdfPath}`);
  const pdfBase64 = fs.readFileSync(pdfPath).toString('base64');

  fs.unlinkSync(htmlPath);
  fs.unlinkSync(pdfPath);

  res.json({ base64: pdfBase64 });
});

app.listen(3000, () => console.log('Rodando na porta 3000'));
