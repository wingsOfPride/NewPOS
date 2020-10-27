$(document).ready(function () {



    $('#dataTable').DataTable({
        "ajax": {
            "url": '../ProductList/GetProducts',
            "type": "GET",
            "datatype": "json",
        },

        "columns": [
            { "data": "inv_code", "title": "Inventory Code" },
            { "data": "inv_name", "title": "Inventory Name" },
            { "data": "inv_category", "title": "Category" },
            { "data": "inv_um", "title": "U/M" },
            { "data": "inv_brand", "title": "Brand" },
            {
                "data": "status", "title": "Status", "render": function (data, type, row) {
                    return data === "true" ? '<p style="color: green;">Active</p>' : '<p style="color: reds;>Inactive</p>';
                }
            },
            {
                "data": "inv_id", "title": "", "render": function (data, type, row) {
                    return '<button class="btn btn-primary">Edit <i class="fas fa-edit"></i></button>'
                }
            }
           
        ]

    });

});