
const db = require('../models/bd').mongoose;

const ModelCategoria = require('../models/categorias').Categorias;
const Categoria = db.model("categorias", ModelCategoria); 

const ModelTarefas = require('../models/tarefas').Tarefas;
const Tarefas = db.model("tarefas", ModelTarefas);

async function NovaTarefa(req, idcategoria){

    const minhaCategoria = await Categoria.findOne({ _id: idcategoria }).exec();
    const TarefaRepetida = await Tarefas.findOne({ tarefa: req.tarefa, idcategoria });

    if(TarefaRepetida != null)
        return { erro: true, msg: "Não é permitido criar tarefas repetidas" };

    if(minhaCategoria == null)
        return { erro: true, msg: "Esta categoria não foi encontrada" };

    if(req.tarefa.length == 0)
        return { erro: true, msg: "Você não pode adicionar uma tarefa vazia" };

    if(req.prioridade != Number)
        req.prioridade = 1;

    return { erro: false, doc: req };
}

module.exports = { NovaTarefa };