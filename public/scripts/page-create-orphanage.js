// create map
const map = L.map('mapid').setView([-23.7155049,-46.578851], 15)

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})



let marker
// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat
    const lng = event.latlng.lng

    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng

    // remove icon 
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)
})



//  adicionar  o campo de fotos
function addPhotoField() {
    // pegar o container de fotos #images
    const container = document.querySelector('#images')

    // pegar o container para dublicar .new-images
    const fildsContainer = document.querySelectorAll('.new-upload')

    // realizar o clone da última imagem adicionada
    const newFieldContainer = fildsContainer[fildsContainer.length - 1].cloneNode(true)

    // verificar se o campo está vazio, se sim, nao adicionar ao container de imagens
    const input = newFieldContainer.children[0]

    if(input.value == "") {
        return
    }

    //limpar o campo antes de adicionar ao container de imagens
    input.value = ''

    // adicionar o clone ao container de #image
    container.appendChild(newFieldContainer)
}


function deleteFild(event) {
    const span = event.currentTarget

    const fildsContainer = document.querySelectorAll('.new-upload')

    if(fildsContainer.length <= 1) {
        // limpar o valor do campo
        span.parentNode.children[0].value = ""

        return
    }
    
    // deletar o campo
    span.parentNode.remove()
}

// seleção do sim ou não

function toggleSelect() {

    // retirar a classe active do botões
    document.querySelectorAll('.button-select button').forEach( (button) => {
        button.classList.remove('active');
    })
    

    // colocar a class .active nesse botão clicado
    const button = event.currentTarget
    button.classList.add('active');


    // atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    
    //verificar se é sim ou não
    input.value = button.dataset.value
}