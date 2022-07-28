
const db = require('../models/bd.js').mongoose;
const ModelCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelCategorias);

const ModelsTarefas = require('../models/tarefas.js').Tarefas;
const Tarefas = db.model('tarefas', ModelsTarefas);

// business
const validar = require('../services/categoriasservices.js');

async function listarCategorias(req, res){

    await Categorias.find({}).lean().exec().then((docs) => {

        res.render('categorias', { Docs: docs });
    });

}

async function adicionarCategoria(req, res){

    const resultado = await validar.novaCategoria(req.body);
    if(resultado.erro == true){

        const doc = await Categorias.find({}).lean().exec();
        res.render('categorias', { Docs: doc, erro: true, msg: resultado.msg, form: req.body });
    }   
    else{

        const { nome, descricao } = req.body;
        await Categorias.create({ nome, descricao }).then((doc) => {

            res.redirect("/agenda-listadetarefas");
        })
    }
}

async function editarCategoria(req, res){

    const idCategoria = req.params.id;

    const result = await validar.atualizacaoCategoria(req.body, idCategoria);
    if(result.erro == true){
        
        return res.status(400).json({ erro: result.msg, codigo: 400 });
    }
    else{

        const { nome, descricao } = result;

        await Categorias.findByIdAndUpdate({_id: idCategoria}, { $set:{ nome, descricao }}, { new: true }).then((doc) => {

            let resultado = {
                id: doc._id.toString(),
                nome: doc.nome,
                descricao: doc.descricao
            }

            return res.status(200).json(resultado);
        })
    }
}

async function apagarCategoria(req, res){

    let validarCategoria = await validar.deletarCategoria(req.params.idcategoria);
    if(validarCategoria.erro == true){

        return res.status(400).json({ erro: validarCategoria.msg, codigo: 400 });
    }
    else{

        let idCategoria = req.params.idcategoria;

        let minhastarefas = await Tarefas.find({ idcategoria: idCategoria }).exec();
        minhastarefas.map(async (doc) => {

            await Tarefas.findOneAndDelete({ _id: doc._id });
        }); 

        await Categorias.findByIdAndDelete({ _id: idCategoria }).then(() => {

            return res.status(200).json({ msg: "Esta categoria foi excluida com êxito", codigo: 200 });
        })
    }
}

module.exports = { listarCategorias, adicionarCategoria, editarCategoria, apagarCategoria };