
const form = document.querySelector("form");

const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const cep = document.querySelector("#cep");
const nome = document.querySelector("#nome");

// Permitir somente números e limitar a quantidade de dígitos
function somenteNumeros(valor, limite) {
    return valor.replace(/\D/g, "").slice(0, limite);
}

// MÁSCARA DO CPF: 000.000.000-00
cpf.addEventListener("input", function () {
    const numeros = somenteNumeros(this.value, 11);

    let valor = numeros;

    if (numeros.length > 9) {
        valor = numeros.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{1,2})$/,
            "$1.$2.$3-$4"
        );
    } else if (numeros.length > 6) {
        valor = numeros.replace(
            /^(\d{3})(\d{3})(\d{1,3})$/,
            "$1.$2.$3"
        );
    } else if (numeros.length > 3) {
        valor = numeros.replace(
            /^(\d{3})(\d{1,3})$/,
            "$1.$2"
        );
    }

    this.value = valor;
});

// MÁSCARA DO TELEFONE
telefone.addEventListener("input", function () {
    const numeros = somenteNumeros(this.value, 11);
    let valor = numeros;

    if (numeros.length > 10) {
        valor = numeros.replace(
            /^(\d{2})(\d{5})(\d{1,4})$/,
            "($1) $2-$3"
        );
    } else if (numeros.length > 6) {
        valor = numeros.replace(
            /^(\d{2})(\d{4})(\d{1,4})$/,
            "($1) $2-$3"
        );
    } else if (numeros.length > 2) {
        valor = numeros.replace(/^(\d{2})(\d+)$/, "($1) $2");
    } else if (numeros.length > 0) {
        valor = "(" + numeros;
    }

    this.value = valor;
});

// MÁSCARA DO CEP: 00000-000
cep.addEventListener("input", function () {
    const numeros = somenteNumeros(this.value, 8);

    if (numeros.length > 5) {
        this.value = numeros.replace(
            /^(\d{5})(\d{1,3})$/,
            "$1-$2"
        );
    } else {
        this.value = numeros;
    }
});

// Permitir apenas letras e espaços no nome
nome.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
});

// FUNÇÃO PARA VALIDAR CPF
function validarCPF(valorCPF) {
    const numeros = valorCPF.replace(/\D/g, "");

    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    let soma = 0;

    // Calcula o primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        soma += Number(numeros[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    if (resto !== Number(numeros[9])) {
        return false;
    }

    soma = 0;

    // Calcula o segundo dígito verificador
    for (let i = 0; i < 10; i++) {
        soma += Number(numeros[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
        resto = 0;
    }

    return resto === Number(numeros[10]);
}

// VALIDAÇÃO AO ENVIAR O FORMULÁRIO
form.addEventListener("submit", function (event) {
    const numerosCPF = cpf.value.replace(/\D/g, "");
    const numerosTelefone = telefone.value.replace(/\D/g, "");
    const numerosCEP = cep.value.replace(/\D/g, "");

    if (!validarCPF(numerosCPF)) {
        event.preventDefault();
        alert("CPF inválido. Confira os 11 números digitados.");
        cpf.focus();
        return;
    }

    if (![10, 11].includes(numerosTelefone.length)) {
        event.preventDefault();
        alert("Telefone inválido. Digite um telefone com DDD.");
        telefone.focus();
        return;
    }

    if (numerosCEP.length !== 8) {
        event.preventDefault();
        alert("CEP inválido. Digite os 8 números do CEP.");
        cep.focus();
        return;
    }

    // O projeto ainda não possui servidor para receber os dados.
    event.preventDefault();
    alert("Validação concluída! Os dados estão prontos para envio.");
});
