app.factory('sellFactory', ['$http', function ($http) {

    const add = function (item) {
        this.invoice.push(item);
    };

    const remove = function (index) {
        this.invoice.splice(index, 1);
        $('#itemsDataList').focus();
    };

    const total = function () {
        return this.invoice.reduce(function (memo, item) { // memo is the reduced value initialized by array with two zeros [0,0]
            return [memo[0] + (item.quantity * item.cost), memo[1] + (item.quantity * item.price)];
        }, [0,0]);
    };

    const clear = function () {
        this.invoice = [];
    };

    return {
        invoice: [],
        addToInvoice: add,
        removeFromInvoice: remove,
        total: total,
        clearInvoice: clear
    };
}]);