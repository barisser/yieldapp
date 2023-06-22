new Vue({
    el: '#app',
    data: {
        unpaidPrincipal: '',
        rate: '',
        effectiveYield: '',
        remainingPayments: '',
        price: '',
    },
    watch: {
        unpaidPrincipal() {
            setTimeout(() => {
                if (this.unpaidPrincipal && this.rate && this.effectiveYield && this.remainingPayments) {
                    this.computePrice();
                }
            }, 10);
        },
        rate() {
            setTimeout(() => {
                if (this.unpaidPrincipal && this.rate && this.effectiveYield && this.remainingPayments) {
                    this.computePrice();
                }
            }, 10);
        },
        effectiveYield() {
            setTimeout(() => {
                if (this.unpaidPrincipal && this.rate && this.effectiveYield && this.remainingPayments) {
                    this.computePrice();
                }
            }, 10);
        },
        remainingPayments() {
            setTimeout(() => {
                if (this.unpaidPrincipal && this.rate && this.effectiveYield && this.remainingPayments) {
                    this.computePrice();
                }
            }, 10);
        },
        // price() {
        //     setTimeout(() => {
        //         if (this.unpaidPrincipal && this.rate && this.effectiveYield && this.remainingPayments) {
        //             this.computeYield();
        //         }
        //     }, 1000);
        // },
    },
    methods: {
        computePrice() {
            this.price = this.note_price(this.unpaidPrincipal, this.rate, this.effectiveYield, this.remainingPayments);
        },
        computeYield() {
            this.effectiveYield = this.note_yield(this.price, this.unpaidPrincipal, this.rate, this.remainingPayments);
        },
        _func(i, n) {
            i = i / 100; 
            const i2 = Math.pow(1. + i, 1. / 12.) - 1;
            return i2 * Math.pow(1. + i2, n) / (Math.pow(1. + i2, n) - 1.);
        },
        note_yield(price, unpaid, rate, payments) {
            let tol = 1e-5;
            let total_payment = unpaid * this._func(rate, payments);
            let target = total_payment / price;
            let left = -1, right = 10.;
            while (right - left > tol) {
                let mid = (right + left) / 2;
                let val = this._func(mid, payments);
                if (val > target) {
                    right = mid;
                } else {
                    left = mid;
                }
            }
            return (right + left) / 2;
        },
        note_price(unpaid, rate, market_rate, payments) {
            return unpaid * this._func(rate, payments) / this._func(market_rate, payments);
        }
    },
    template: `
        <div class="container">
            <h1>The Yield App</h1>
            <div class="form-group">
                <label for="unpaidPrincipal">Unpaid Principal:</label>
                <input type="number" id="unpaidPrincipal" v-model="unpaidPrincipal" class="form-control">
            </div>
            <div class="form-group">
                <label for="rate">Rate:</label>
                <input type="number" id="rate" v-model="rate" class="form-control">
            </div>
            <div class="form-group">
                <label for="effectiveYield">Effective Yield:</label>
                <input type="number" id="effectiveYield" v-model="effectiveYield" class="form-control">
            </div>
            <div class="form-group">
                <label for="remainingPayments">Remaining Payments:</label>
                <input type="number" id="remainingPayments" v-model="remainingPayments" class="form-control">
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" id="price" v-model="price" class="form-control">
            </div>
        </div>
    `
});
