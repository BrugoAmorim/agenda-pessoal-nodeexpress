
function criarmodeloresponse(req){

    let obj = {

        Id: req._id,
        Nome: req.nome,
        Descricao: req.descricao
    };

    return obj;
}

module.exports = { criarmodeloresponse };