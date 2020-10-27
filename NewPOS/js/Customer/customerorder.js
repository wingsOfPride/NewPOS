

var message = (condition, message, title) => {
    var data = condition === "Success" ? 'success' : 'danger';
    return '<div class="alert alert-' + data + '">' +
        '<strong>' + title + '</strong> ' + message + '';

};

//push data from ajax response
var data = [];
//declare variable for datatable
var ee = null;

clearData = () => {
    document.getElementById("form").reset();
    ee.clear().draw();
    $('#totalamount').html('');

}

 getData = () => {

    $.ajax({
        url: '../Product/GetProducts',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
          
            let object = JSON.parse(response);
            object.data.map(t => {
                data.push(t);
            })

      
   



        }


    })

}


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function number_format(val, decimals) {
    //Parse the value as a float value
    val = parseFloat(val);
    //Format the value w/ the specified number
    //of decimal places and return it.
    return val.toFixed(decimals);
}

var sampledata = () => {

    var ee = data.map(data => {
  
        return ' <option value=' + data.inv_code + '>' + data.inv_code + '</option>'
    });

    return '<select  class="searchProd form-control" id="actions"><option>Select</option>' + ee + ' </select>';


}

const totalAmount = () => {
    var tableBody = document.getElementById("projects_table").getElementsByTagName("tbody").item(0);

    var sum = 0;
    for (i = 1; i <= tableBody.rows.length; i++) {
        sum += parseFloat(document.getElementById("projects_table").rows[i].cells.item(5).innerHTML.replace(/,/g,''));
    }

    $('#totalamount').html(numFormat(sum));


}



var numFormat = $.fn.dataTable.render.number('\,', '.', 2, '').display;


function submit() {
    var arrayObj = [];

    if ($('#datepicker').val() == "") {
        swal('Message', "fill the date", "info").then(() => {
            $('#btn-ser1').html('Submit');
            $("#btn-ser1").attr("disabled", false)
            return;
        })
      
           
    } else if ($('#myInput').val() == ""){
        swal('Message', "Empty Customer", "info").then(() => {
            $('#btn-ser1').html('Submit');
            $("#btn-ser1").attr("disabled", false)
            return;
        })
    } else if ($('#inputGroupSelect01').val() == "0") {
        swal('Message', "Select payment method", "info").then(() => {
            $('#btn-ser1').html('Submit');
            $("#btn-ser1").attr("disabled", false)
            return;
        })
    }



    $("#projects_table tbody tr").each(function () {
        var obj = {}, i = 0;
        $(this).children("td").each(function () {
            switch (i) {
                case 0:
                  
                    if (typeof $(this).find('select').val() == 'undefined') {
                        return
                        break;
                    } else {
                        obj["referenceNo"] = $('#referenceNo').val();
                        obj["inv_code"] = $(this).find('select').val();
                    }
             
                    break;
                case 1:
              
                    obj["item_name"] = $(this).html();
                    break;
                case 2:
                    obj["qty"] =  parseFloat($(this).find("input").val());
                    break;
                case 3:
                    obj["um"] = $(this).html();
                    break;
                case 4:
                    obj["amnt"] = parseFloat($(this).find("input").val());
 
                    break;
                case 5:
                   // obj["totalcost"] = parseFloat($(this).html());
                    break;
                case 6:
           
                    break;
                default:
                  
            }
     
            i++;
        })
        arrayObj.push(obj);
    });
    var verified = false;
    var array = {};
    const data = JSON.stringify($("#form").serializeArray());
    var myobject = JSON.parse(data);


   
 
  
    myobject.map((data, item) => {
            array[data.name] = data.value;
    })

    if (array.id == "" || array.date == "" || array.referenceNo == "") {
        $('#message').html(message("Danger", "Fill information above", "Warning"));
        $('#btn-ser1').html('Submit');
        $("#btn-ser1").attr("disabled", false);
        return;
    }

    var eee = customers.find(x => x.cus_name == array.id);
    if (typeof eee == "undefined") {
        $('#message').html(message("Danger", "Empty Table!.", "Warning"));
        $('#btn-ser1').html('Submit');
        $("#btn-ser1").attr("disabled", false);
        return;
    } else {

        array["customer_id"] = eee.cus_code;
        array["totalcost"] = parseFloat(($('#totalamount').html().replace(/\,/g, '')));
    }




   

   

    arrayObj.map(data => {
      
        if (typeof data.inv_code == 'undefined' || array.length == 0) {
            verified = false;
        } else {
            verified = true
        }
    })
    var myurl = $('#btn-ser1').data('request-url');
    if (verified) {
        $('#message').html('');


                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: myurl,
                    data: { cus: array, inv: arrayObj },
                    success: function (data) {


                        data = JSON.parse(data);
      
                        if (data.response === '1') {
                            $('#message').html(message("Success", data.message, "Success"))

                            clearData();

                        } else if (data.response === '2') {
                            $('#message').html(message("Danger", data.message, "Warning"))

                        } else if (data.response === '3') {
                            $('#message').html(message("Danger", data.message, "Warning"))

                        } else {
                            $('#message').html(message("Warning", data.message, data.response))
                        }


                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest, textStatus, errorThrown);

                    }

                })


       


        $('#btn-ser1').html('Submit');
        $("#btn-ser1").attr("disabled", false);
    } else {
        $('#message').html(message("Danger", 'Empty Table please add a product', "Warning"));
        $('#btn-ser1').html('Submit');
        $("#btn-ser1").attr("disabled", false);
    }

 


 

}

$(document).ready(function () {

    //change the data of a row when selecting a product
    $('#projects_table').on('change', '.searchProd', function (e) {

        var number = $(this).parents('tr')[0].rowIndex;




        $("#actions").prop('id', 'actions' + number);
        var e = document.getElementById(this.id);
  
        var result = e.options[e.selectedIndex].text;
        const idNumber = e.options[e.selectedIndex].value;



       

        if (idNumber == "Select") {

            document.getElementById("projects_table").rows[number].cells.item(1).innerHTML = "";
            document.getElementById("projects_table").rows[number].cells.item(3).innerHTML = "";



        } else {
         
            let found = data.find(x => x.inv_code == idNumber);
     
            document.getElementById("projects_table").rows[number].cells.item(1).innerHTML = found.inv_name;
            document.getElementById("projects_table").rows[number].cells.item(3).innerHTML = found.inv_um;

        }



    });


    //delete a row in datatable
    $('#projects_table').on('click', '.submitMe', function (e) {
 
    
        ee
            .row($(this).parents('tr'))
            .remove()
            .draw();
        // ee.row(this).delete();
    });

 
    //submit button for customer order
    $('#btn-ser1').click(function () {
        $('#btn-ser1').html('<i class="fa fa-refresh fa-spin"></i> Loading');
        $("#btn-ser1").attr("disabled", true);
     

        swal({
            title: "",
            text: "Are you sure you want to proceed ?",
            icon: "info",
            buttons: true,
        })
            .then(() => {
                submit();
            });
        //submit();

 

    })


    $('#projects_table').on('update', function () {
        alert('Table updated, launching kill space goats sequence now.')
    });

    //event for table 
    $('#projects_table').on('input', '.move', function (e) {
        //console.log($(this).parents('tr'));
        var number = $(this).parents('tr')[0].rowIndex;
   
        const quantity = document.getElementById("projects_table").rows[number].cells.item(2).querySelector('input').value;
        const price = document.getElementById("projects_table").rows[number].cells.item(4).querySelector('input').value;

        var total = (quantity * price).toFixed(2);

    



        document.getElementById("projects_table").rows[number].cells.item(5).innerHTML = numFormat(total);
     

        totalAmount();

    });


    //event for select payment method
    $('select').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;

        if (valueSelected === '0') {
            $("#terms").prop('disabled', true);
            return;
        } else if (valueSelected === 'Cash') {
       
            $("#terms").prop('disabled', true);
        }
        else if (valueSelected === 'Terms') {
      
            $("#terms").prop('disabled', false);

        }

    });

    //event for datatable
    ee = $('#projects_table').DataTable({
        "footerCallback": function (row, data, start, end, display) {
    
        },
        "columnDefs": [
            { "width": "20%", "targets": 0 },
            { "width": "22%", "targets": 1 },
            { "width": "10%", "targets": 2 },
            { "width": "5%", "targets": 3 },
            { "width": "1%", "targets": 4 },
            { "width": "12%", "targets": 5 },
            { "width": "5%", "targets": 6, "className": "text-center" }


        ],
       
     
    });

    //get products
    getData();


    //event on adding table row in datatable juqery
    $('#addRow').on('click', function () {

        var officersIdss = data.map(officer => {

            return officer.inv_id
        });



        ee.row.add([sampledata
            ,
            '<span id="name"></span>',
            '<input type="number" class="move" id="qty" style="width: 100%;" ></input>',
            '.3',
            '<input type="number" class="move" id="amount" style="width: 100%;"></input>',
            '',

            '<a class="submitMe btn btn-danger" style="color: white;" type="submit" > <i class="fas fa-trash-alt"></i></a>'
        ]).draw(true);


    });









})