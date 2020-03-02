import Vue from 'vue';

Vue.mixin({
    methods: {
        formatPrice(value) {
            if (value === undefined) return
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        formatDate(value) {
            if (!value) return
            let subValue = value.substr(0, 10);
            var date = new Date(subValue);
            if (!isNaN(date.getTime())) {
                var day = date.getDate().toString();
                var month = (date.getMonth() + 1).toString();
                return date.getFullYear() + '/' +
                    (month[1] ? month : '0' + month[0]) + '/' + (day[1] ? day : '0' + day[0]);
            }
        },
        formatShift(value) {
            if (!value) return
            return value.substr(0, 5);
        }
    }
});