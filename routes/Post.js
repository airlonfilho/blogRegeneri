const router = require('express').Router();
const Post = require('../models/Post');
const multer = require("multer");
const path = require('path');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.post('/', upload.single('imagem'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhuma imagem enviada' });
  }
  const { titulo, descricao } = req.body;
  let descricaoArray = [];

  if (Array.isArray(descricao)) {
    // Se descricao for um array, remover o caractere \r de cada item
    descricaoArray = descricao.map(paragraph => paragraph.replace(/\r$/, ''));
  } else if (typeof descricao === 'string') {
    // Se descricao for uma única string, dividir em parágrafos e remover o caractere \r
    descricaoArray = descricao.split('\n').map(paragraph => paragraph.replace(/\r$/, ''));
  }
  // Obter a extensão do arquivo
  const extensao = path.extname(req.file.originalname);
  // Criar um novo nome de arquivo com a extensão
  const novoNomeArquivo = req.file.filename + extensao;
  // Mover o arquivo para a pasta de destino com o novo nome
  const novoCaminho = path.join(req.file.destination, novoNomeArquivo);
  fs.renameSync(req.file.path, novoCaminho);
  // Criar um novo documento
  const post = new Post({
    titulo,
    descricao: descricaoArray,
    imagem: req.file.filename,
  });

  // Salvar o documento no banco de dados
  post.save()
    .then(() => {
      res.json({ message: 'Imagem enviada e documento salvo com sucesso' });
    })
    .catch(error => {
      console.error('Erro ao salvar o documento:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    });
});

//update post
router.put('/:id', upload.single('imagem'), (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;

  let descricaoArray = [];

  if (Array.isArray(descricao)) {
    descricaoArray = descricao.map(paragraph => paragraph.replace(/\r$/, ''));
  } else if (typeof descricao === 'string') {
    descricaoArray = descricao.split('\n').map(paragraph => paragraph.replace(/\r$/, ''));
  }

  const update = {
    titulo,
    descricao: descricaoArray,
    imagem: req.file ? req.file.path : undefined,
  };

  Post.findByIdAndUpdate(id, update)
    .then(() => {
      res.status(200).json({ message: 'Post atualizado com sucesso!' });
    })
    .catch(error => {
      console.error('Erro ao atualizar o post:', error);
      res.status(500).json({ error: 'Erro ao atualizar o post' });
    });
});

//delete post 
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Post.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({ message: 'Post excluído com sucesso!' });
    })
    .catch(error => {
      console.error('Erro ao excluir o post:', error);
      res.status(500).json({ error: 'Erro ao excluir o post' });
    });
});

//get All posts 
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json(error);
  }
})
//get one post 
router.get('/:id', async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;