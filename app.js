const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'db_users'
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida');
});

app.post('/registrarUsuario', (req, res) => {
  const { name, password } = req.body;

  const sql = 'INSERT INTO db_info (username, userpassword) VALUES (?, ?)';
  const values = [name, password];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    } else {
      console.log('Usuário registrado com sucesso');
      res.json({ message: 'Usuário registrado com sucesso' });
    }
  });
});

// Função para registrar o usuário
function registrarUsuario() {
  const name = document.querySelector('input[name="name"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Enviar uma requisição POST para o servidor
  fetch('http://localhost:3000/registrarUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert('Usuário registrado com sucesso!');
  })
  .catch(error => {
    console.error('Usuário registrado com sucesso!', error);
    alert('Usuário registrado com sucesso!');
  });
}

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});


app.post('/verificarUsuario', (req, res) => {
    const { name, password } = req.body;
  
    const sql = 'SELECT * FROM db_info WHERE username = ? AND userpassword = ?';
    const values = [name, password];
  
    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Erro ao verificar usuário:', error);
        res.status(500).json({ error: 'Erro ao verificar usuário' });
      } else {
        if (results.length > 0) {
          // Usuário encontrado no banco de dados
          res.json({ message: 'Usuário verificado com sucesso' });
        } else {
          // Usuário não encontrado
          res.status(404).json({ error: 'Usuário não encontrado' });
        }
      }
    });
  });
  