Vue.component('vue-autocomplete', {
    template: '<div><input v-bind:class="class_input" type="text" ' +
    'v-bind:value="value" v-on:input="updateValue($event.target.value)" ' +
    'v-on:keydown.enter="enter" v-on:keydown.down="down" v-on:keydown.up="up" ' +
    'v-bind:placeholder="placeholder">' + 
    '<ul v-show="open" v-bind:class="class_ul" ' + 
    'style="position: absolute; z-index: 50;">' +
    '   <template v-if="matches.length > 0">' + 
    '       <li v-for="(item, index) in matches" ' +
    '       v-bind:class="[ isActive(index) ? class_active : \'\' ]" ' +
    '       v-on:click="suggestionClick(index)">' +
    '           <a href="javascript:void(0)" ' + 
    '           style="text-decoration: none">{{ item }}</a>' +
    '       </li>' +
    '   </template>' +
    '   <li v-else>No hay resultados</li>' +
    '</ul></div>',
    props: {
        value: {
            type: String,
            required: true
        },
        suggestions: {
            type: Array,
            required: true
        },
        min_len: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        class_input: {
            type: String,
            required: false
        },
        class_ul: {
            type: String,
            required: false
        },
        class_active: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            open: false,
            current: 0
        }
    },
    computed: {
        // Filtering the suggestion based on the input
        matches: function() {
            var resultado = [];
            
            if (this.value.length >= parseInt(this.min_len))
            {
                resultado = this.suggestions.filter(this.buscarCoincidencias);
            }

            return resultado;
        }
    },
    methods: {
        // Triggered the input event to cascade the updates to 
        // parent component
        updateValue: function(value) {
            if (this.open === false) {
                this.open = true;
                this.current = 0;
            }
            
            this.$emit('input', value);
        },
        // When enter key pressed on the input
        enter: function() {
            this.$emit('input', this.matches[this.current]);
            this.open = false;
        },
        // When up arrow pressed while suggestions are open
        up: function() {
            if (this.current > 0) this.current--;
        },
        // When down arrow pressed while suggestions are open
        down: function() {
            if (this.current < this.matches.length - 1) this.current++;
        },
        // For highlighting element
        isActive: function(index) {
            return index === this.current;
        },
        // When one of the suggestion is clicked
        suggestionClick: function(index) {
            this.$emit('input', this.matches[index]);
            this.open = false;
        },
        buscarCoincidencias: function(valor) {
            //var condicion = valor.indexOf(this.value) >= 0;
            var patt = new RegExp(this.value, "i");
            var condicion = valor.search(patt) >= 0;

            return condicion;
        }
    }
});