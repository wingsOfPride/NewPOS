var globalNumber = 0;
var dt = null;

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
})


var message = (condition, message, title) => {
    var data = condition === "Success" ? 'success' : 'danger';
    return '<div class="alert alert-' + data + '">' +
        '<strong>' + title + '</strong> ' + message + '';

};


function amount(item) {
    return item.totalcost;
}

function format(d) {

    let total = 0;

    let data = d.item.map(item => {  return '<tr><td style="font-weight: bold;">' + item.inv_name + '</td><td>' + item.inv_um + '</td><td>' + item.qty + '</td><td>' + item.amount + '</td><td>' + (item.amount * item.qty) + '</td></tr>' }).join('');

    return '<div><div class="row"><div class="col-md-4"><h6>Customer: ' + d.cus_name + '</h6><table class="table table-striped" style="width: 500px !important; margin: 10px;"><thead class="thead-dark" ><tr><th style="width: 170px;">Item Code</th><th style="width: 80px;">U/M</th><th style="width: 80px;">Qty</th><th>Price</th><th>Total Amount</th></tr></thead><tbody>' + data + '<tbody><tfoot style="border-top: 1px solid;"><tr><th colspan="4" style="text-align:right">Total</th><th style="color:red;">' + d.totalcost + '</th></tr></tfoot></table></div>' +


        '</div></div>';

}

onChangeFunction = (value, quantity, change) => {

    var total = quantity - value.replace(/,/g, "");
    var ta = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var ee = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    $('#qty' + change).val(ee);
    $('#rem' + change).val(ta);
    if (total < 0) {
        $('#rem' + change).css("color", "red")
        $('#delSubmit').prop("disabled", true);
    } else {
        $('#rem' + change).css("color", "black")
        $('#delSubmit').prop("disabled", false);
    }


    // $('#qty0').val( value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    // var total = quantity - value;
    // console.log(total);
    // var part = value.toString().split(".");
    //   part[0] = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // $('#rem1').val(part.join("."))
    //   $('#rem'+change).val('hahaha');

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");




}

deleteDetailsDeliver = (d) => {
    swal({
        title: "",
        text: "Are you sure you want to remove ?",
        icon: "info",
        buttons: true,
    })
        .then((ifproceed) => {
            if (ifproceed) {
                $.ajax({
                    url: 'http://wingsofpride619-001-site1.btempurl.com/api/CustomerOrder/DeleteDeliveryDetail/' + d,
                    type: 'DELETE',
                    dataType: 'json',
                    success: function (response) {
              
                        //var res = JSON.parse(response);
                        if (response.response == "1") {
                            swal("Success", response.message, "success").then(() => {
                                dt.ajax.reload();
                                $('#deliveryModal').modal('hide');


                            });
                        }
                        else if (response.response == "2") {
                            swal("Success", response.message, "info");
                        }





                    }


                })
            } else {

            }

        });
}


deleteDetails = (d) => {
    swal({
        title: "",
        text: "Are you sure you want to remove ?",
        icon: "info",
        buttons: true,
    })
        .then((ifproceed) => {
            if (ifproceed) {
                $.ajax({
                    url: 'http://wingsofpride619-001-site1.btempurl.com/api/CustomerOrder/DeletePaymentDetail/'+d,
                    type: 'DELETE',
                    dataType: 'json',
                    success: function (response) {
                    
                        //var res = JSON.parse(response);
                        if (response.response == "1") {
                            swal("Success", response.message, "success").then(() => {
                                dt.ajax.reload();
                                $('#paymentModal').modal('hide');


                            });
                        }
                        else if (response.response == "2") {
                            swal("Success", response.message, "info");
                        }
                    




                    }


                })
            } else {

            }
           
        });
}

$(document).ready(function () {
    $(".inlineRadio").click(function () {
        $('#paySubmit').prop('disabled', false);
        $('#payAmountPaid').val('');
        $('#payBalance').val(formatter.format(globalNumber));
        var radioValue = $("input[name='paymentMethod']:checked").val();
        if (radioValue == 'Check') {
            $('#payCheck').show();
            $('#paymentDetails').show();
        } else {
            $('#paymentDetails').show();
            $('#payCheck').find('input:text').val('');
            $('#paymentDetails').find('input:text').val('');
            $('#payCheck').hide();
        }
    });


    $('#delSubmit').click(function () {

        if ($('#delDate').val().length == 0 || $('#delDRNo').val().length == 0) {
            swal("Error Message", "Please fill the information", "error");
            return
        }

        var arrayObjects = [];
        let myResult = {};
        // Loop through grabbing everything

        var arrayObj = [];
        const data = JSON.stringify($("#deliveryForm").serializeArray());
        var myobject = JSON.parse(data);

        myobject.map(item => {
            myResult[item.name] = item.value;
        })

        $("#delTables tbody tr").each(function () {

            if ($(this).children("td").children("input")[1].value.length <= 0) {


            } else {
                myResult["item_code"] = $(this).children("td")[0].innerHTML;
                myResult["qty"] = $(this).children("td").children("input")[1].value;
                arrayObjects.push(myResult);
            }

        });
        swal({
            title: "",
            text: "Are you sure you want to proceed ?",
            icon: "info",
            buttons: true,
        })
            .then((willProceed) => {
                if (willProceed) {
                    $('#delSubmit').html('<i class="fa fa-refresh fa-spin"></i> Loading');
                    $("#delSubmit").attr("disabled", true);

                    $.ajax({
                        dataType: 'text',
                        type: 'POST',
                        url: 'http://wingsofpride619-001-site1.btempurl.com/api/CustomerDelivery/InsertCustomerDelivery',
                        data: JSON.stringify(arrayObjects),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {

                            data = JSON.parse(data);

                            if (data.response == null) {
                                swal("Message", "Something's Wrong", "error");
                                $('#delSubmit').html('Submit');
                                $("#delSubmit").attr("disabled", false);
                                return
                            }

                            if (data.response === '1') {

                                swal("Message", "Successfully paid", "success").then((willProceed) => {
                                    $('#delModal').modal('hide');
                                    $('#delSubmit').html('Submit');
                                    $("#delSubmit").attr("disabled", false);
                                    dt.ajax.reload();

                                });


                            } else if (data.response === '2') {
                                swal("Message", data.message, "error");
                                $('#delSubmit').html('Submit');
                                $("#delSubmit").attr("disabled", false);

                            } else if (data.response === '3') {

                                swal("Message", data.message, "error");
                                $('#delSubmit').html('Submit');
                                $("#delSubmit").attr("disabled", false);
                            } else {
                                swal("Message", data.message, "error");
                                $('#delSubmit').html('Submit');
                                $("#delSubmit").attr("disabled", false);

                                $('#paySubmit').html('Submit');
                                $("#delSubmit").attr("disabled", false);
                            }
                            $('#delSubmit').html('Submit');
                            $("#delSubmit").attr("disabled", false);

                        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                            if (XMLHttpRequest.readyState == 4) {
                                swal("Message", XMLHttpRequest.statusText, "error");
                            }
                            else if (XMLHttpRequest.readyState == 0) {
                                swal("Message", "Connection Error", "error");
                            }
                            else {
                                swal("Message", "Error Ajax Request", "error");
                            }


                            $('#delSubmit').html('Submit');
                            $("#delSubmit").attr("disabled", false);
                        }

                    })


                } else {
                    swal("Payment Cancelled!");
                }
            });


    })



    $('#paySubmit').click(function () {
        let myResult = {};

        const data = JSON.stringify($("#payment").serializeArray());
        var myobject = JSON.parse(data);
        myobject.map(item => {
            myResult[item.name] = item.value;
        })


        if ($('#payDate').val() == "") {
            swal("Error Message", "Empty Date!", "error");
            return
        } else if ($("input[name='paymentMethod']:checked").val() == 'Check') {
            if ($('#checkDate').val() == "" || $('#checkNo').val() == "" || $('#amnt').val() == "") {
                swal("Error Message", "Empty Payment Details, please fill up the information.", "error");
                return
            }
        }
        else if ($("input[name='paymentMethod']:checked").val() == 'Cash') {
            if ($("input[name='amnt']").val() == "") {
                swal("Error Message", "Please input the amount", "error");
                return
            }
        } else if ($("input[name='amnt']").val() > 0) {

        }
        swal({
            title: "",
            text: "Are you sure you want to proceed ?",
            icon: "info",

            buttons: true,

        })
            .then((willProceed) => {
                if (willProceed) {
                    $('#paySubmit').html('<i class="fa fa-refresh fa-spin"></i> Loading');
                    $("#paySubmit").attr("disabled", true);

                    $.ajax({
                        dataType: 'text',
                        type: 'POST',
                        url: 'http://wingsofpride619-001-site1.btempurl.com/api/Payments/InsertPayments',
                        data: JSON.stringify(myResult),
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {


                            data = JSON.parse(data);

                            if (data.response === '1') {

                                swal("Message", "Successfully paid", "success").then((success) => {
                                    $('#exampleModal').modal('hide');
                                    dt.ajax.reload();
                                });
                             

                            } else if (data.response === '2') {
                                swal("Message", data.message, "error");

                            } else if (data.response === '3') {

                                swal("Message", data.message, "error");
                            } else {
                                swal("Message", data.message, "error");
                            }
                            $('#paySubmit').html('Submit');
                            $("#paySubmit").attr("disabled", false);

                        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                            if (XMLHttpRequest.readyState == 4) {
                                swal("Message", XMLHttpRequest.statusText, "error");
                            }
                            else if (XMLHttpRequest.readyState == 0) {
                                swal("Message", "Connection Error", "error");
                            }
                            else {
                                swal("Message", "Error Ajax Request", "error");
                            }


                            $('#paySubmit').html('Submit');
                            $("#paySubmit").attr("disabled", false);
                        }

                    })


                } else {
                    swal("Payment Cancelled!");
                }
            });
    });


    dt = $('#example').DataTable({
        "processing": true,
        "ajax": {
            "url": 'http://wingsofpride619-001-site1.btempurl.com/api/CustomerOrder/GetCustomerOrderDetails',
            "type": "GET",
            "datatype": "json"

        },
        "columns": [
            {
                "class": "details-control",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            },
            { "data": "date" },
            { "data": "cus_name" },
            { "data": "referenceNo" },

            { "data": "terms" },
            { "data": "goodthru" },
            { "data": "totalcost", "render": function (data, rw, row) { return '<span style="color:black; font-weight: bold;">' + formatter.format(data) + '</span>' } },

            {
                "data": "totalamountpaid", "render": function (data, rw, row) { return '<a href="#" class="amountPaid" style="color:green;  font-weight: bold;">' + formatter.format(data) + '</a>' }
            },
            { "data": "balance", "render": function (data, rw, row) { return '<span style="color:red; font-weight: bold;">' + formatter.format(data) + '</span>' } },
            {
                "data": "goodthru", "render": function (data, da, row) {
                    var balance = 0;
                    row.item.map(item => { balance += item.balance });
                 

                    if (balance == 0) {
                        return '<a href="#" class="deliverDetails">Delivered</a>';
                    } else if (row.deliverylist.length == 0) {
                        return '<a href="#" class="deliverDetails">Pending</a>';
                    }
                    else {

                        return '<a href="#" class="deliverDetails">Partially Delivered</a>';
                    }


                 
                }
            },
            {
                "data": "referenceNo", "render": function (data, rw, row) {

                    if (row.balance == 0) {

                        return '<button style="width: 100%; cursor: no-drop;" id="btn' + data + '" class="btn btn-primary paymentBtn" disabled>Pay</button>'

                    } else if (row.balance < row.totalcost) {

                        return '<button style="width: 100%;" id="btn' + data + '" class="btn btn-primary paymentBtn">Pay</button>'
                    } else if (row.balance == row.totalcost) {

                        return '<button style="width: 100%;" id="btn' + data + '" class="btn btn-primary paymentBtn">Pay</button>'

                    }


                }
            },
            {
                "data": "referenceNo", "render": function (data, n, row) {
                    var balance = 0;
                    row.item.map(item => { balance += item.balance });
               
                    if (balance == 0) {
                        return '<button style="width: 100%;  cursor: no-drop;" id="del' + data + '" class="btn btn-danger delBtn" disabled>Deliver</button>';
                    } else {

                        return '<button style="width: 100%;" id="del' + data + '" class="btn btn-danger delBtn" >Deliver</button>';
                    }


                }
            },


        ],
        "order": [[1, 'asc']],
        "columnDefs": [
            { "width": "4%", "targets": 10 },
            { "width": "4%", "targets": 11 }
        ]



    });
    $('#example tbody').on('click', '.deliverDetails', function () {

        var data = dt.row($(this).parents('tr')).data();
  
        let count = 0;
        let totalamount = 0;
        let balance = 0;
        let bae = data.deliverylist.map((item, key) => { totalamount += item.qty; return '<tr><td style="font-weight: bold;">' + item.date + '</td><td style="font-weight: bold;">' + item.drNo + '</td><td>' + item.inv_name + '</td><td> ' + item.inv_um + '</td><td>' + formatter.format(item.qty) + '</td><td><a type="button" href="#" class="btn btn-danger" onclick="deleteDetailsDeliver(' + item.id +')"><i class="fas fa-trash"></i></a></td></tr>' }).join('');

        let total = data.item.map(item => { return balance += item.balance });

        $('#deliveryOrderDate').val(data.date);
        $('#deliveryOrderNo').val(data.referenceNo);
        $('#deliveryCustomer').val(data.cus_name);
        $('#deliveryInfoTable').html(bae);
        $('#deliverytotalAmountPaid').html(formatter.format(totalamount));
        $('#remainingBags').html(balance);
        $('#deliveryModal').modal('show');
    });

    $('#example tbody').on('click', '.amountPaid', function () {

        var data = dt.row($(this).parents('tr')).data();

        let count = 0;
        let totalamount = 0;

        let bae = data.paymentlist.map((item, key) => { totalamount += item.amount; return '<tr><td style="font-weight: bold;">' + item.date + '</td><td style="font-weight: bold;">' + item.paymentMethod + '</td><td>' + item.checkDate + '</td><td> ' + item.checkNo + '</td><td>' + formatter.format(item.amount) + '</td><td><a type="button" href="#" class="btn btn-danger" onclick="deleteDetails('+item.id+')"><i class="fas fa-trash"></i></a></td></tr>' }).join('');
        $('#paymentOrderDate').val(data.date);
        $('#paymentOrderNo').val(data.referenceNo);
        $('#paymentCustomer').val(data.cus_name);
        $('#paymentInfoTable').html(bae);
        $('#totalAmountPaid').html(formatter.format(totalamount));
        $('#paymentModal').modal('show');
    });

    $('#example tbody').on('click', '.delBtn', function () {

        var data = dt.row($(this).parents('tr')).data();
        let count = 0;
        let totalamount = 0;
        let bae = data.item.map((item, key) => { totalamount += (item.amount * item.qty); return '<tr><td style="font-weight: bold;">' + item.inv_code + '</td><td style="font-weight: bold;">' + item.inv_name + '</td><td>' + item.inv_um + '</td><td><input class="form-control" style="text-align: right;width: 90px;" value="' + item.balance + '" readonly/></td><td><input autocomplete="off" id="qty' + key + '" type="text" onkeyup="onChangeFunction(this.value, ' + item.balance + ', ' + key + ')" class="form-control" style="text-align: right;width: 100%;"/></td><td><input id="rem' + count++ + '" class="form-control" style="text-align: right;width: 100px;" readonly/></td></tr>' }).join('');
        $('#deliveryForm')[0].reset();
        $('#delRef').val(data.referenceNo);
        $('#delCustomer').val(data.cus_name);
        $('#delTable').html(bae);
        $('#delModal').modal('show');
    });



    var detailRows = [];


    $('#example tbody').on('click', '.paymentBtn', function () {
        $('#paySubmit').prop('disabled', true);
        var data = dt.row($(this).parents('tr')).data();
        let totalamount = 0;
        globalNumber = data.balance;
        let bae = data.item.map(item => { totalamount += (item.amount * item.qty); return '<tr><td style="font-weight: bold;">' + item.inv_name + '</td><td>' + item.inv_um + '</td><td>' + item.qty + '</td><td>' + formatter.format(item.amount) + '</td><td>' + formatter.format((item.amount * item.qty)) + '</td></tr>' }).join('');
        $('#paymentDetails').hide();
        $('#payment')[0].reset();
        $('#payRef').val(data.referenceNo);
        $('#payCustomer').val(data.cus_name);
        $('#payBalance').val(formatter.format(data.balance));
        $('#payTable').html(bae);
        $('#payTotal').html(formatter.format(totalamount));
        $('#exampleModal').modal('show');
    });






    $('#example tbody').on('click', 'tr td.details-control', function () {

        var tr = $(this).closest('tr');
        var row = dt.row(tr);

        var idx = $.inArray(tr.attr('id'), detailRows);

        if (row.child.isShown()) {
            tr.removeClass('details');
            row.child.hide();

            // Remove from the 'open' array
            detailRows.splice(idx, 1);
        }
        else {
            tr.addClass('details');

            row.child(format(row.data())).show();

            // Add to the 'open' array
            if (idx === -1) {
                detailRows.push(tr.attr('id'));
            }
        }
    });


    dt.on('draw', function () {
        $.each(detailRows, function (i, id) {
            $('#' + id + ' td.details-control').trigger('click');
        });
    });



})
