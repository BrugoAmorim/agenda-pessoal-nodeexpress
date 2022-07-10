
async function validarCamposContato(req, res){

    if(req.contato.length < 4)
        return { erro: true, msg: 'Nome do contato inválido'}

    return { erro: false, doc: req };
}

module.exports = { validarCamposContato };