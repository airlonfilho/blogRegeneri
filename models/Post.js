const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    titulo: String,
    descricao: [String],
    imagem: String,
  }, { timestamps: true }); 

module.exports = mongoose.model('Post', PostSchema);