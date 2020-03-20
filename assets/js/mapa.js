// main
var app = new Vue({
    el: '#app',
    data: {
        lat: -31.5375000,
        long: -68.5363900,
        zoom: 10,
        ajustar_limites: false,
        marcadores: [
            {
                lat: -31.546579, 
                long: -68.650553, 
                icono: '', 
                titulo: 'Rivadavia', 
                contenido: '', 
                fijo: true
            },
            {
                lat: -31.688151, 
                long: -68.463575,
                icono: '', 
                titulo: 'Rawson', 
                contenido: '', 
                fijo: true
            },
            {
                lat: -31.537894, 
                long: -68.462088,
                icono: '', 
                titulo: 'Santa Lucia', 
                contenido: '', 
                fijo: true
            }
        ]
    }
});