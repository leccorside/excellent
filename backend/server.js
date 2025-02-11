const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Nome único para cada arquivo
    }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nest_project'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao consultar produtos:', err);
            res.status(500).send('Erro ao consultar produtos');
            return;
        }
        res.json(results);
    });
});

app.post('/produtos', upload.array('imagens', 10), (req, res) => {
    const { descricao, valor_venda, estoque } = req.body;
    let imagens = req.files.map(file => file.filename);
  
    // Usar imagem padrão se nenhuma imagem for enviada
    if (imagens.length === 0) {
      imagens.push('padrao.jpg');
    }
  
    const query = 'INSERT INTO produtos (descricao, valor_venda, estoque, imagens) VALUES (?, ?, ?, ?)';
    db.query(query, [descricao, valor_venda, estoque, JSON.stringify(imagens)], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar produto:', err);
        res.status(500).send('Erro ao cadastrar produto');
        return;
      }
      res.status(201).send('Produto cadastrado com sucesso');
    });
  });

app.put('/produtos/:id', upload.array('imagens', 10), (req, res) => {
    const { id } = req.params;
    const { descricao, valor_venda, estoque } = req.body;
    let imagens = req.files.map(file => file.filename);
  
    if (imagens.length === 0) {
      imagens = JSON.parse(req.body.imagens); // Manter as imagens existentes
    }
  
    const query = 'UPDATE produtos SET descricao = ?, valor_venda = ?, estoque = ?, imagens = ? WHERE id = ?';
    db.query(query, [descricao, valor_venda, estoque, JSON.stringify(imagens), id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
        return;
      }
      res.send('Produto atualizado com sucesso');
    });
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).send('Erro ao deletar produto');
        return;
      }
      res.send('Produto deletado com sucesso');
    });
});  

app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao consultar clientes:', err);
            res.status(500).send('Erro ao consultar clientes');
            return;
        }
        res.json(results);
    });
});

app.post('/clientes', (req, res) => {
    const { cnpj, razao_social, email } = req.body;
    const checkQuery = 'SELECT * FROM clientes WHERE cnpj = ?';
    db.query(checkQuery, [cnpj], (err, results) => {
        if (err) {
            console.error('Erro ao verificar CNPJ:', err);
            res.status(500).send('Erro ao verificar CNPJ');
            return;
        }
        if (results.length > 0) {
            res.status(409).send('CNPJ já consta no banco de dados');
            return;
        }
        const insertQuery = 'INSERT INTO clientes (cnpj, razao_social, email) VALUES (?, ?, ?)';
        db.query(insertQuery, [cnpj, razao_social, email], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar cliente:', err);
                res.status(500).send('Erro ao cadastrar cliente');
                return;
            }
            res.status(201).send('Cliente cadastrado com sucesso');
        });
    });
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM clientes WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).send('Erro ao deletar cliente');
        return;
      }
      res.send('Cliente deletado com sucesso');
    });
});

app.post('/pedidos', (req, res) => {
    const { cliente_id, produtos, valor_total } = req.body;
  
    console.log('Recebido pedido:', JSON.stringify(req.body, null, 2));
  
    const pedidoQuery = 'INSERT INTO pedidos (cliente_id, valor_total) VALUES (?, ?)';
    db.query(pedidoQuery, [cliente_id, valor_total], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar pedido:', err);
        res.status(500).send('Erro ao cadastrar pedido');
        return;
      }
  
      const pedidoId = result.insertId;
      console.log('Pedido cadastrado com ID:', pedidoId);
  
      if (!produtos || produtos.length === 0) {
        console.error('Erro: Nenhum produto foi fornecido para o pedido.');
        res.status(400).send('Erro: Nenhum produto foi fornecido para o pedido.');
        return;
      }
  
      const pedidoProdutosQuery = 'INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade, valor_total) VALUES ?';
      const pedidoProdutosData = produtos.map(produto => {
        console.log('Processando produto:', produto);
        if (typeof produto.valor_venda === 'undefined') {
          console.error('Erro: Produto sem valor_venda:', produto);
          return null;
        }
        return [pedidoId, produto.produto_id, produto.quantidade, produto.valor_total];
      }).filter(data => data !== null);
  
      if (pedidoProdutosData.length === 0) {
        console.error('Erro: Nenhum produto válido foi fornecido.');
        res.status(400).send('Erro: Nenhum produto válido foi fornecido.');
        return;
      }
  
      db.query(pedidoProdutosQuery, [pedidoProdutosData], (err, result) => {
        if (err) {
          console.error('Erro ao cadastrar produtos do pedido:', err);
          res.status(500).send('Erro ao cadastrar produtos do pedido');
          return;
        }
        console.log('Produtos do pedido cadastrados com sucesso:', result);
        res.status(201).send('Pedido cadastrado com sucesso');
      });
    });
  });
  
  
  
  
  app.get('/pedidos', (req, res) => {
    const query = `
      SELECT 
        p.id AS pedido_id, 
        p.cliente_id, 
        c.razao_social AS cliente_razao_social, 
        p.data_do_pedido, 
        p.valor_total, 
        pp.produto_id, 
        prod.descricao AS produto_descricao, 
        pp.quantidade, 
        pp.valor_total AS produto_valor_total
      FROM pedidos p
      JOIN clientes c ON p.cliente_id = c.id
      JOIN pedido_produtos pp ON p.id = pp.pedido_id
      JOIN produtos prod ON pp.produto_id = prod.id
    `;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Erro ao obter pedidos:', err);
        res.status(500).send('Erro ao obter pedidos');
        return;
      }
  
      const pedidosMap = new Map();
  
      result.forEach(row => {
        if (!pedidosMap.has(row.pedido_id)) {
          pedidosMap.set(row.pedido_id, {
            id: row.pedido_id,
            cliente_id: row.cliente_id,
            cliente_razao_social: row.cliente_razao_social,
            data_do_pedido: row.data_do_pedido,
            valor_total: row.valor_total,
            produtos: []
          });
        }
        pedidosMap.get(row.pedido_id).produtos.push({
          produto_id: row.produto_id,
          produto_descricao: row.produto_descricao,
          quantidade: row.quantidade,
          valor_total: row.produto_valor_total
        });
      });
  
      const pedidos = Array.from(pedidosMap.values());
      res.json(pedidos);
    });
  });
  
  app.delete('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    
    const deletePedidoProdutosQuery = 'DELETE FROM pedido_produtos WHERE pedido_id = ?';
    db.query(deletePedidoProdutosQuery, [id], (err, result) => {
      if (err) {
        console.error('Erro ao deletar produtos do pedido:', err);
        res.status(500).send('Erro ao deletar produtos do pedido');
        return;
      }
  
      const deletePedidoQuery = 'DELETE FROM pedidos WHERE id = ?';
      db.query(deletePedidoQuery, [id], (err, result) => {
        if (err) {
          console.error('Erro ao deletar pedido:', err);
          res.status(500).send('Erro ao deletar pedido');
          return;
        }
        res.send('Pedido deletado com sucesso');
      });
    });
  });


app.listen(port, () => {
    console.log(`Servidor backend rodando na porta ${port}`);
});
