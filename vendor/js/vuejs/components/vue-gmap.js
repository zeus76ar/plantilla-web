// depende de google maps
Vue.component('vue-gmap', {
    props: {
        id_mapa: {
            type: String,
            required: true
        },
        lat_base: {
            type: Number,
            required: true
        },
        long_base: {
            type: Number,
            required: true
        },
        zoom_base: {
            type: Number,
            required: true
        },
        marcadores: {
            type: Array,
            required: false
        },
        ajustar_limites: {
            type: Boolean,
            required: true
        }
    },
    data: function() {
        return {
            mapa: null,
            punto: {
                gm_lat: 0,
                gm_long: 0
            },
            gm_marcadores: []
        };
    },
    template: '<div style="overflow: hidden;padding-bottom: 56.25%; ' +
    'position:relative;height:0;">' +
    '<div v-bind:id="id_mapa" style="left: 0;top: 0;height: 100%;width: 100%; '+
    'position: absolute;"></div></div>',
    methods: {
        cargarMapa: function() {
            var div_mapa = document.getElementById(this.id_mapa);

            var punto = new google.maps.LatLng(this.lat_base, this.long_base);

            if (this.usar_geoloc)
            {
                punto = new google.maps.LatLng(this.punto.gm_lat, this.punto.gm_long);
            }

            var opciones = {
                zoom: this.zoom_base,
                center: punto,
                // mapTypeId: TERRAIN, ROADMAP, HYBRID o SATELLITE
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true
            };

            this.mapa = new google.maps.Map(div_mapa, opciones);

            this.centrarMapa(this.lat_base, this.long_base);
        },
        centrarMapa: function(latitud, longitud) {
            var pos = new google.maps.LatLng(latitud, longitud);
            
            this.mapa.setCenter(pos);
        },
        agregarMarcador: function(marcador) {
            // marcador: {lat, long, icono, titulo, contenido, fijo}            
            var punto = new google.maps.LatLng(parseFloat(marcador.lat), 
            parseFloat(marcador.long));

            var marker = new google.maps.Marker({
                position: punto,
                map: this.mapa,
                title: marcador.titulo
            });

            if (this.ajustar_limites)
            {
                var bounds = new google.maps.LatLngBounds();
                
                this.mapa.fitBounds(bounds.extend(punto));
            }

            if (marcador.icono !== '') marker.setIcon(marcador.icono);
            
            if (! marcador.fijo)
            {
                marker.setDraggable(true);
                
                google.maps.event.addListener(marker, 'dragend', function() {
                    this.punto.gm_lat = marker.getPosition().lat();
                    this.punto.gm_long = marker.getPosition().lng();
                });
            }
            
            if (marcador.contenido !== '')
            {
                var infowindow = new google.maps.InfoWindow({
                    content: marcador.contenido
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    this.mapa.setCenter(marker.position);
                    
                    infowindow.open(this.mapa, marker);
                });
            }
            
            this.gm_marcadores.push(marker);

            this.centrarMapa(marcador.lat, marcador.long);
        },
        eliminarMarcadores: function() {
            for (var i = 0; i < this.gm_marcadores.length; i++)
            {
                this.gm_marcadores[i].setMap(null);
            }
            
            this.gm_marcadores = [];
        }
    },
    mounted: function() {
        this.cargarMapa();
        
        if (typeof this.marcadores !== 'undefined')
        {
            if (this.marcadores.length > 0)
            {
                this.marcadores.forEach(item => {
                    this.agregarMarcador(item);
                });
            }
        }
    }
});