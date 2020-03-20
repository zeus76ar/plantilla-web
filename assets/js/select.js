Vue.component('v-select', VueSelect.VueSelect);

var app = new Vue({
    el: '#app',
    data: {
        value: '',
        options: [{
            id: 0,
            pais: 'Argentina'
        },{
            id: 1,
            pais: 'Brasil'
        },{
            id: 3,
            pais: 'Chile'
        }]
    },
    mounted: function() {
        this.value = this.options[0];   
    }
});