
async function validarCamposContato(req, res){

    if(req.contato.length == 0)
        return { erro: true, msg: 'Informe o Nome do contato'}

    return { erro: false, doc: req };
}

module.exports = { validarCamposContato };