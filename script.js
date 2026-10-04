const form = document.querySelector("form");

const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const cep = document.querySelector("#cep");
const nome = document.querySelector("#nome");


// Permitir somente números no CPF, telefone e CEP
cpf.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 11);
});

telefone.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 11);
});

cep.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 8);
});


// Permitir apenas letras e espaços no nome
nome.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
});


// Função para verificar se o CPF é válido
function validarCPF(cpf) {

    cpf = cpf.replace(/\D/g, "");

    // CPF precisa ter 11 números
    if (cpf.length !== 11) {
        return false;
    }

    // Impede CPFs com todos os números iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;

    // Segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    return resto === parseInt(cpf.charAt(10));
}


// Validação quando o usuário tenta enviar
form.addEventListener("submit", function (event) {

    if (!validarCPF(cpf.value)) {

        event.preventDefault();

        alert("CPF inválido. Digite um CPF válido com 11 números.");

        cpf.focus();

        return;
    }


    if (telefone.value.length < 10 || telefone.value.length > 11) {

        event.preventDefault();

        alert("Telefone inválido. Digite um telefone com 10 ou 11 números.");

        telefone.focus();

        return;
    }


    if (cep.value.length !== 8) {

        event.preventDefault();

        alert("CEP inválido. Digite um CEP com 8 números.");

        cep.focus();

        return;
    }

});