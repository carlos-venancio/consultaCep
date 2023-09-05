const msg = "O CEP informado é inválido"
let campo_cep = document.getElementById('campo_cep')
// consulta as informações do cep especificado
function getCep() {
    let cep = document.querySelector('#cep').value.replace('-','')
    
    //  usa a funçaõ validaCep para conferir cep
    if (!validaCep(cep)){
        campo_cep.innerHTML = `
        <p> ${msg} </p>
        `

    } else {

        let url =  `https://viacep.com.br/ws/${cep}/json/`
        fetch(url,{
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resposta) => {
            return resposta.json()
        }).then((dados) => {
            // tratamento das respostas da api
            
            let campo_cep = document.getElementById('campo_cep')
    
            // não encontrou
            if(dados.erro){
                campo_cep.innerHTML = `
                    <p> O CEP informado não existe </p>
                `    
            }else {
                
                campo_cep.innerHTML = `
                        <p> <strong> Endereço </strong> ${dados.logradouro == '' ? '' : dados.logradouro} </p>
                        <p> <strong> Complemento </strong> ${dados.complemento == '' ? '' : dados.complemento} </p>
                        <p> <strong> Bairro </strong> ${dados.bairro == '' ? '' : dados.bairro} </p>
                        <p> <strong> Cidade </strong> ${dados.localidade == '' ? dados.localidade : dados.localidade} </p>
                        <p> <strong> Estado </strong> ${dados.uf == '' ? '' : dados.uf} </p>  
                    `  
            }
    
            document.querySelector('#resultado-cep').innerHTML = cep
            document.getElementById('invisible').style.display = 'block'
    
        })
    }
    
}

// aplica as verificações ao cep: maior que 8 e caracter inválido
function validaCep(cep){
    console.log(cep)
    if(cep.length !== 8){
        return false
    } 
    console.log(cep.length)

    for (let count = 0; count < cep.length;count++){
        console.log(cep[count])
        if( isNaN(cep[count]) ) {
            return false
        }
    }

    return true
// valida os caracteres 
}

document.querySelector('#cep').addEventListener('blur', (event) => {
    getCep()
})