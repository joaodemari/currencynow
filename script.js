const moedaEl_um = document.getElementById("moeda-um");
const moedaEl_dois = document.getElementById("moeda-dois");
const quantEl_um = document.getElementById("quant-um");
const quantEl_dois = document.getElementById("quant-dois");

const taxaEl = document.getElementById('taxa');
const trocar = document.getElementById('trocar');



// fetch currency rates and update the dom
function calcular(calculoQuantUm = true){
    const moeda_um = moedaEl_um.value
    const moeda_dois = moedaEl_dois.value
    var quant_um = Number(quantEl_um.value)
    var quant_dois = Number(quantEl_dois.value)

    fetch(`https://v6.exchangerate-api.com/v6/65b3eaf4fe2a4c970d24a412/latest/${moeda_um}`)
        .then(res => res.json())
        .then(data => {
            const taxa = data.conversion_rates[moeda_dois]
            taxaEl.innerText = `1 ${moeda_um} = ${taxa} ${moeda_dois}`;
            if (calculoQuantUm) {
                quantEl_dois.value = (quant_um*taxa).toFixed(2);
            } else {
                quantEl_um.value = (quant_dois/taxa).toFixed(2);
            }
        });   
}

moedaEl_um.addEventListener('change', () => calcular(true));
moedaEl_dois.addEventListener('change', () => calcular(false));
quantEl_um.addEventListener('input', () => calcular(true));
quantEl_dois.addEventListener('input', () => calcular(false));

trocar.addEventListener('click', () => {
    const temp = moedaEl_um.value;
    moedaEl_um.value = moedaEl_dois.value;
    moedaEl_dois.value = temp;
    calcular(true);
})

calcular(true);





