
function ModelResponseCategoria(req){

    let obj = {

        Id: req._id,
        Nome: req.nome,
        Descricao: req.descricao
    };

    return obj;
}

function ModelRequestTarefa(req, idCat){

    const infoRequest = {
        tarefa: req.tarefa,
        concluida: false,
        prioridade: req.prioridade,
        adicionada: new Date(),
        idcategoria: idCat
    };

    return infoRequest;
}

function ModelResponseTarefa(req){

    const modeloRes = {
        Idtarefa: req._id.toString(),
        Tarefa: req.tarefa,
        Concluida: req.concluida,
        Prioridade: req.prioridade,
        Adicionada: req.adicionada,
        Idcategoria: req.idcategoria
    };

    return modeloRes;
}

module.exports = { ModelResponseCategoria, ModelResponseTarefa, ModelRequestTarefa  };