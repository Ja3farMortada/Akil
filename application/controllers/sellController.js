app.controller('sellController', ['$scope', '$http', '$timeout', 'sellFactory', 'stockFactory', 'DateService', 'NotificationService', 'stockModel', 'customersFactory', function ($scope, $http, $timeout, sellFactory, stockFactory, DateService, NotificationService, stockModel, customersFactory) {


    // Get Items
    $scope.items = stockFactory.items;

    // Get Customers
    $scope.customers = customersFactory.customers;

    stockFactory.getItems.then(function () {
        angular.element(document.querySelector("#itemsDataList")).trigger('focus');
    });

    // get exchange rate
    $scope.exchangeRate = stockModel.exchangeRate;

    // define server path
    const url = `http://${keys.host}:${keys.port}`;

    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // initialize empty invoice
    $scope.invoice = sellFactory.invoice;

    // watch for invoice changes and calculate invoice's total cost and price
    $scope.$watch('invoice', function () {
        $scope.totalCost = sellFactory.total()[0];
        $scope.totalPrice = sellFactory.total()[1];
    }, true);

    // Print Order
    $scope.print = function () {
        if ($scope.invoice.length > 0) {
            ipcRenderer.send('printDocument', [$scope.invoice, $scope.totalPrice]);
        }
    };

    // select quantity input on focus
    $scope.selectQuantity = function (index) {
        $('#input' + index).select();
    };

    // select item enter event
    $scope.selectOption = function (event) {
        if (event.keyCode == 13 && $scope.selectedItem) {
            event.preventDefault();
            let count = 0;
            for (let i = 0; i < $scope.items.length; i++) {
                if ($scope.selectedItem == $scope.items[i]['item_name']) {
                    count++;
                    let found = false;
                    for (let j = 0; j < $scope.invoice.length; j++) {
                        if ($scope.selectedItem == $scope.invoice[j]['name']) {
                            found = true;
                            $scope.invoice[j]['quantity'] += 1;
                            break;
                        }
                    }
                    if (!found) {
                        sellFactory.addToInvoice({
                            ID: $scope.items[i]['IID'],
                            barcode: $scope.items[i]['barcode'],
                            name: $scope.items[i]['item_name'],
                            cost: $scope.items[i]['item_currency'] == 'dollar' ? $scope.items[i]['item_cost'] * $scope.exchangeRate.exchange_rate : $scope.items[i]['item_cost'],
                            quantity: 1,
                            price: $scope.items[i]['item_currency'] == 'dollar' ? $scope.items[i]['item_price'] * $scope.exchangeRate.exchange_rate : $scope.items[i]['item_price']
                        });
                    }
                    break;
                }
            }
            if (count == 0) {
                swal({
                    title: "Item not found",
                    text: "Item not found, it is not defined!",
                    icon: 'error',
                    dangerMode: true
                }).then((ok) => {
                    if (ok) {
                        $('#itemsDataList').focus();
                    }
                })
            }
            $scope.selectedItem = null;
        }
    };

    // barcode input enter event
    $('#sellInput').keyup(function (e) {
        if (e.keyCode == 13) {
            let count = 0;
            if ($scope.barcode) {
                for (let i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i]['barcode'] == $scope.barcode) {
                        count++;
                        let found = 0;
                        for (let j = 0; j < $scope.invoice.length; j++) {
                            if ($scope.barcode == $scope.invoice[j]['barcode']) {
                                $scope.invoice[j]['quantity'] += 1;
                                found++;
                                break;
                            }
                        }
                        if (found == 0) {
                            sellFactory.addToInvoice({
                                ID: $scope.items[i]['IID'],
                                barcode: $scope.items[i]['barcode'],
                                name: $scope.items[i]['item_name'],
                                cost: $scope.items[i]['item_currency'] == 'dollar' ? $scope.items[i]['item_cost'] * $scope.exchangeRate.exchange_rate : $scope.items[i]['item_cost'],
                            quantity: 1,
                            price: $scope.items[i]['item_currency'] == 'dollar' ? $scope.items[i]['item_price'] * $scope.exchangeRate.exchange_rate : $scope.items[i]['item_price']
                            });
                        }
                        break;
                    }
                }
                if (count == 0) {
                    swal({
                        title: "Item not found",
                        text: "Item not found, it may be not defined",
                        icon: 'error',
                        dangerMode: true
                    }).then(() => {
                        $('#sellInput').focus();
                    })
                }
                $scope.$digest($scope.barcode = null);
            }
        }
    });

    // delete a row from invoice view
    $scope.deleteRow = function (index) {
        sellFactory.removeFromInvoice(index);
    };

    // **** EDIT PRICE ****
    // open edit price modal
    $scope.openEditPriceModal = function (index) {
        $scope.newPrice = null;
        $('#editPriceModal').modal('show');
        $('#editPriceModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').focus();
        });
        $('#editPriceModal').on('hidden.bs.modal', function () {
            $('#itemsDataList').focus();
        });
        $scope.selectedIndex = index;
        $scope.minAtt = $scope.invoice[index]['cost'];
        $scope.selectedRowCost = $scope.invoice[index]['cost'].toLocaleString();
        $scope.selectedRowPrice = $scope.invoice[index]['price'].toLocaleString();
    };
    // edit price function
    $scope.editPrice = function () {
        $scope.invoice[$scope.selectedIndex]['price'] = $scope.newPrice;
        $('#editPriceModal').modal('toggle');
    };

    // checkout
    $scope.checkout = function () {
        $scope.selectedCustomer = null;
        $scope.cashReceived = null;
        $scope.validated = true;
        $('#selectCustomer').modal('show');
        $('#selectCustomer').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').focus();
        });
    };

    $scope.validate = () => {
        $scope.validated = true;
    };
    // Confirm Order button clicked!
    $scope.confirmOrderClicked = function () {
        if (!$scope.selectedCustomer && $scope.cashReceived == null) {
            $scope.cashReceived = 0;
            $('#cashInput').select();
        } else if (!$scope.selectedCustomer) {
            swal({
                title: `Change: ${($scope.cashReceived - $scope.totalPrice).toLocaleString()} L.L`,
                icon: "info",
            }).then((ok) => {
                if (ok) {
                    confirmOrder(null);
                } else {
                    $('#cashInput').focus();
                }
            });
        } else {
            $scope.validated = false;
            let customerID;
            for (let i = 0; i < $scope.customers.length; i++) {
                if ($scope.customers[i].customer_name == $scope.selectedCustomer) {
                    $scope.validated = true;
                    customerID = $scope.customers[i].customer_ID;
                    break;
                } else {
                    $('#choose').select();
                }
            }
            if ($scope.validated) {
                swal({
                    title: $scope.selectedCustomer,
                    text: "Are you sure you want to continue?",
                    icon: "info",
                    buttons: true,
                    dangerMode: true,
                }).then((ok) => {
                    if (ok) {
                        confirmOrder(customerID);
                    } else {
                        $('#choose').focus();
                    }
                });
            }
        }
    };

    // ***** CONFIRM ORDER FUNCTION *****
    async function confirmOrder(ID) {
        $('#selectCustomer').modal('toggle');
        let date = DateService.getDate();
        let time = DateService.getTime();
        $('#itemsDataList').focus();
        let invoiceTotalCost = $scope.totalCost;
        let invoiceTotalPrice = $scope.totalPrice;
        let dollar_exchange = $scope.exchangeRate.exchange_rate;
        $http.post(`${url}/addInvoice`, {
            "items": $scope.invoice,
            "invoice": {
                "customer_ID_FK": ID,
                "inv_date": date,
                "inv_time": time,
                "inv_total_cost": invoiceTotalCost,
                "inv_total_price": invoiceTotalPrice,
                "dollar_exchange": dollar_exchange
            }
        }).then(function () {
            NotificationService.showSuccessCash();
            sellFactory.clearInvoice();
            $scope.invoice = sellFactory.invoice;
            $('#itemsDataList').focus();
            if (ID) {
                DebtsFactory.updateCustomerDebit({
                    "customer_ID": ID,
                    "debitAmount": invoiceTotalPrice,
                    "method": "add"
                });
            }
            $timeout(function () {
                stockFactory.fetchItems();
            }, 1000);
            // stockFactory.fetchTotalStock();
        }, function (error) {
            swal({
                title: 'Error',
                text: 'Error' + JSON.stringify(error)
            });
        });
    };

    $scope.cancelOrder = function () {
        swal({
            title: "WARNING",
            text: "Are you sure you want to cancel order?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                sellFactory.clearInvoice();
                $scope.$digest($scope.invoice = sellFactory.invoice);
                angular.element(document.querySelector("#itemsDataList")).focus();
            }
        });
    }

}]);