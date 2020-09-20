Vue.component('vue-multiselect', window.VueMultiselect.default);

// main
var app = new Vue({
    el: '#app',
    data: {
        anios: [2018, 2019, 2020],
        fecha: '30/09/2020', // dd/mm/aaaa, dd-mm-yyyy
        mostrar_mes_corto: true,
        fecha2: ''
    }
});