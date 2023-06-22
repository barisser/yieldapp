new Vue({
    el: '#app',
    data: {
        unpaidPrincipal: '',
        rate: '',
        effectiveYield: '',
        remainingPayments: '',
        price: ''
    },
    watch: {
        unpaidPrincipal() {
            this.computePrice();
        },
        rate() {
            this.computePrice();
        },
        effectiveYield() {
            this.computePrice();
        },
        remainingPayments() {
            this.computePrice();
        },
        price() {
            this.computeYield();
        },
    },
    methods: {
        computePrice() {
            if (this.unpaidPrincipal && this.rate && this.effectiveYield && this.remainingPayments) {
                this.price = this.unpaidPrincipal * this._func(this.rate, this.remainingPayments) / this._func(this.effectiveYield, this.remainingPayments);
            }
        },
        computeYield() {
            if (this.unpaidPrincipal && this.rate && this.price && this.remainingPayments) {
                const target = this._totalPayment(this.unpaidPrincipal, this.rate, this.remainingPayments) / this.price;
                const tol = 1e-5;
                let left = -1, right = 10.;

                while (right - left > tol) {
                    const mid = right / 2. + left / 2.;
                    const val = this._iterate(mid, this.remainingPayments);

                    if (val > target) {
                        right = mid;
                    } else {
                        left = mid;
                    }
                }

                this.effectiveYield = mid;
            }
        },
        _iterate(i, n) {
            const i2 = Math.pow(1. + i, 1/12.) - 1.;
            return i2 * Math.pow(1. + i2, n) / (Math.pow(1. + i2, n) - 1.);
        },
        _totalPayment(principal, rate, payments) {
            const per_interval_interest = Math.pow(1. + rate, 1. / 12.) - 1.;
            const mult = Math.pow(1. + per_interval_interest, payments);
            return principal * per_interval_interest * mult / (mult - 1);
        },
        _func(i, n) {
            const i2 = Math.pow(1. + i, 1/12.) - 1.;
            return i2 * Math.pow(1. + i2, n) / (Math.pow(1. + i2, n) - 1.);
        }
    },
    template: `
        <div class="container">
            <h1>Note Price and Yield Calculator</h1>
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
