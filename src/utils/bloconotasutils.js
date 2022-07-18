
function formatarData(req){

    let mes = req.getMonth() + 1;

    if(mes < 10)
        mes = '0' + mes;

    let dataemString = req.getDate() + '/' + mes + '/' + req.getFullYear();
    return dataemString;
}

function criarModel(req){

    let dtcriadoFormatado = formatarData(req.criado);
    let dtatualiazadoFormatado = formatarData(req.atualizado);

    let obj = {
        id: req._id,
        titulo: req.nome,
        conteudo: req.conteudo,
        criado: dtcriadoFormatado,
        atualizado: dtatualiazadoFormatado
    };

    return obj;
}

function ordenarAnotacoes(req, query){
    
    if(query == "maisantigos"){
        return req.sort((a, b) => {
            
            if(a.criado < b.criado)
                return -1;
        })
    }
    else if(query == "maisnovos"){
        return req.sort((a, b) => {
            
            if(a.criado > b.criado)
                return -1;
        })
    }
    else
        return req;
}

module.exports = { criarModel, ordenarAnotacoes };