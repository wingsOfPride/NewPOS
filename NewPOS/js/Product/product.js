
 


  
    //submit click
$("#btnSubmit").click(function () {
    if ($('#inv_code').val() == "" || $('#inv_name').val() == "" || $('#inv_um').val() == "" || $('#inv_brand').val() == "") {
        swal("Fill the information !");
        return;
    }
    var array = {};
    const data = JSON.stringify($("#form").serializeArray());
    var myobject = JSON.parse(data);
    myobject.map((data, item) => {
        array[data.name] = data.value;

    })

    var myurl = $(this).data('request-url');
    swal({
        title: "",
        text: "Are you sure you want to Add ?",
        icon: "info",
        buttons: true,
    })
        .then((ifSccess) => {
            if (ifSccess) {
                $('#btnSubmit').html('<i class="fa fa-refresh fa-spin"></i> Loading');
                $("#btnSubmit").attr("disabled", true);


                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: myurl,
                    data: array,
                    success: function (data) {

                        data = JSON.parse(data);
                 
                        if (data.response === '1') {
                            swal("Success", data.message, "success").then(() => {
                                dt.ajax.reload();
                                $('#form')[0].reset();
                                $('#btnSubmit').html('Submit');
                                $("#btnSubmit").attr("disabled", false);


                            });
                        } else if (data.response === '2') {
                            swal("Success", data.message, "info").then(() => {
                                dt.ajax.reload();
                                $('#form')[0].reset();
                                $('#btnSubmit').html('Submit');
                                $("#btnSubmit").attr("disabled", false);

                            });
                        } else if (data.response === '3') {
                            swal("Success", data.message, "info").then(() => {
                                dt.ajax.reload();
                                $('#form')[0].reset();
                                $('#btnSubmit').html('Submit');
                                $("#btnSubmit").attr("disabled", false);

                            });
                        } else {
                            swal("Success", data.message, "info").then(() => {
                                dt.ajax.reload();
                                $('#form')[0].reset();

                                $('#btnSubmit').html('Submit');
                                $("#btnSubmit").attr("disabled", false);
                            });
                        }


                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest, textStatus, errorThrown);
                        $('#btnSubmit').html('Submit');
                        $("#btnSubmit").attr("disabled", false);
                    }

                })
            } else {
                $('#btnSubmit').html('Submit');
                $("#btnSubmit").attr("disabled", false);
            }
        

        })

});


