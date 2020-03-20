// main
var app = new Vue({
    el: '#app',
    data: {
        items: [
            '<div class="mySlide w3-container w3-blue w3-center w3-padding-16">' +
            '<h1>Titulo 1</h1><p>Texto descriptivo</p>' +
            '</div>',
            '<div class="mySlide w3-container w3-green w3-center w3-padding-16">' +
            '<h1>Titulo 2</h1><p>Texto descriptivo</p>' +
            '</div>',
            '<div class="mySlide w3-container w3-black w3-center w3-padding-16">' +
            '<h1>Titulo 3</h1><p>Texto descriptivo</p>' +
            '</div>'
        ],
        items1: [
            '<img src="assets/img/avatar1.png" alt="Avatar 1" style="width:100%; height: 300px;">',
            '<img src="assets/img/avatar2.png" alt="Avatar 2" style="width:100%; height: 300px;">',
            '<img src="assets/img/avatar3.png" alt="Avatar 3" style="width:100%; height: 300px;">' 
        ],
        items2: [
            '<img src="assets/img/avatar1.png" alt="Avatar 1" class="w3-image">',
            '<img src="assets/img/avatar2.png" alt="Avatar 2" class="w3-image">',
            '<img src="assets/img/avatar3.png" alt="Avatar 3" class="w3-image">' 
        ],
        items3: [
            {imagen: 'assets/img/avatar1.png', caption:'<strong>Avatar 1</strong>'},
            {imagen: 'assets/img/avatar2.png', caption:'<i>Avatar 2</i>'},
            {imagen: 'assets/img/avatar3.png', caption:'Avatar 3'}
        ],
        tiempo: 2000,
        auto: true,
        tema: 'claro',
        controles: true,
        indicadores: true
    }
});