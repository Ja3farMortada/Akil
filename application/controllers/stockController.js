app.controller('stockController', ['$scope', 'stockFactory', 'NotificationService', 'stockModel', function ($scope, stockFactory, NotificationService, stockModel) {

    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // Get Items
    $scope.items = stockFactory.items;

    // Get Total Stock
    $scope.totalStock = stockFactory.totalStock;

    // await get items promise
    stockFactory.getItems.then(function () {
        $scope.options = setItemsPerPage();
        angular.element(document.querySelector('#search')).trigger('focus');
    });

    // sorting in table
    $scope.sortKey = 'IID';
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    // Items per page initial value and set function
    $scope.itemsPerPage = 10;

    function setItemsPerPage() {
        return options = [{
                name: "10",
                value: 10
            },
            {
                name: "20",
                value: 20
            },
            {
                name: "50",
                value: 50
            },
            {
                name: "All",
                value: $scope.items.length
            },
        ]
    };

    // get exchange rate
    $scope.exchangeRate = stockModel.exchangeRate;

    // toggle currency
    $scope.isDollar = stockFactory.isDollar;
    $scope.toggleCurrency = () => {
        stockFactory.toggleCurrency();
    };


    // declare add item modal values
    function addItemModal() {
        $scope.barcodeExisted = false;
        $scope.modalTitle = "Add Item";
        $scope.modalMode = 'add';
        $scope.modalItem = {
            "item_name": null,
            "barcode": null,
            "item_currency": 'dollar',
            "item_qty": 0,
            "item_cost": 1,
            "item_price": null,
            "notes": null
        };
        $('#itemModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
        $('#itemModal').on('hide.bs.modal', function () {
            angular.element(document.querySelector('#search')).trigger('focus');
        });
        $('#itemModal').modal('show');
    };


    // declare edit item modal values
    let index;

    function editItemModal(ID) {
        $scope.barcodeExisted = false;
        $scope.modalTitle = "Edit Item";
        $scope.modalMode = 'edit';
        index = $scope.items.findIndex(index => index.IID == ID);
        $scope.modalItem = {};
        angular.copy($scope.items[index], $scope.modalItem);
        $scope.modalItem.is_hidden = ($scope.modalItem.is_hidden == true) ? true : false;
        $('#itemModal').on('hide.bs.modal', function () {
            angular.element(document.querySelector('#search')).trigger('focus');
        });
        $('#itemModal').modal('show');
    };

    // open target modal
    $scope.openItemModal = (type, ID) => {
        switch (type) {
            case 'add':
                addItemModal();
                break;

            case 'edit':
                editItemModal(ID);
                break;
        };
    };
    // submit target functions in modal
    $scope.submit = () => {
        switch ($scope.modalMode) {
            case 'add':
                submitAddItem();
                break;

            case 'edit':
                submitEditItem();
                break;
        }
    };

    // Insert function
    function submitAddItem() {
        if ($scope.barcodeExisted == false) {
            stockFactory.addItem($scope.modalItem).then(function (response) {
                if (response) {
                    $scope.items.push(response);
                }
            });
        };
    };

    // update function
    function submitEditItem() {
        if ($scope.barcodeExisted == false) {
            stockFactory.editItem($scope.modalItem).then(function () {
                $scope.items[index] = $scope.modalItem;
            });
        };
    };

    // **** DELETE ITEM ****
    $scope.deleteItem = function () {
        let item = {
            ID: $scope.modalItem.IID
        };
        NotificationService.showWarning().then(ok => {
            if (ok) {
                stockFactory.deleteItem(item).then(function () {
                    $scope.items.splice(index, 1);
                });
            }
        });
    };

    // *** check if barcode exists ***
    $scope.checkBarcode = barcode => {
        if (barcode != '') {
            for (var i = 0; i < $scope.items.length; i++) {
                if (barcode == $scope.items[i].barcode) {
                    $scope.barcodeExisted = true;
                    break;
                } else {
                    $scope.barcodeExisted = false;
                }
            }
        }
    };
}]);