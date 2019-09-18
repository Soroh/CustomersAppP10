//Appends all customers to customer div
function loadCustomers() {
        $.ajax({
        type: "GET",
        dataType: 'json',
        url: "/customers",
        success: function (customers) {
            populateCustomer(customers)
    }
    });
    }

//    loading one customer to profile model
function getCustomer(customerId) {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "/customer/"+customerId,
        success: function (customer) {
            if (customer!=null) {
                document.getElementById("customer-name").innerHTML="<h3>" + customer.lastName +" "+ customer.firstName+"</h3>"
                document.getElementById("customer-bio-data").innerHTML=
                    "<h4>Customer Details</h4>"+
                    "<table style='width: 100%;'><p><tr><th>Email Address :</th><td> " +customer.email+"</td></tr>"+
                    "<p><tr><th>Location :</th><td> " + customer.latitude +", "+customer.longitude +"</td></tr>"+
                    "<p><tr><th>IP Address : </th><td>" +customer.ip+"</td></tr>"+
                    "<p><tr><th>Since:</th><td> " + customer.createdAt+"</td></tr>"+
                    "</table>";
                document.getElementById("customer-interests").innerHTML=
                    "<h4>Interests</h4>" +
                    "<ul>" +
                        "<li>Photography</li>"+
                        "<li>Speed Cubes </li>"+
                        "<li>Fortnite</li>"+
                        "<li>Mother of Dragons</li>"+
                    "</ul>";
                    var content=
                    "<h4>Orders</h4>"+
                    "<table class='table'>"+
                        "<tr>" +
                            "<th>SN</th>" +
                            "<th>Date</th>" +
                            "<th>Status</th>" +
                            "<th>Actions</th>" +
                        "</tr>";
                for(var i=0;i<3;i++)
                {
                    content+="<tr>" +
                        // "<td>"+data[i].customerId+"</td>" +
                        // "<td>"+data[i].lastName+"</td>" +
                        // "<td>"+data[i].firstName+"</td>" +
                        "<td>789</td>"+
                        "<td>2018-06-15T16:00:00Z</td>"+
                        "<td>Processing</td>"+
                        "<td><a href='/order/789'>View</a></td>"+
                          "</tr>";
                }
                content+="</table>";
                    document.getElementById("customer-orders").innerHTML=content;
                }
            }
    });
}


//Delete customer by ID
function myDelFunction(customerId) {
    if (confirm("Alert!!!!!!\nAre you sure you want to delete the user".concat(customerId).concat("?"))) {

        $.ajax({
            type: "DELETE",
            dataType: 'json',
            url: "/customer/"+customerId,
            success: function (result) {
                if(result){
                    loadCustomers();
                    window.alert('Successfully Deleted');//To be changed
                }
                else
                    window.alert('There was an error deleting the customer.');
            }
            });
    }
}

$("#search-bar").keyup(function (keyPressed) {
    clearTimeout($.data(this, 'timer'));
    if($("#search-bar").val()==="")
        loadCustomers();
    else if (keyPressed.keyCode == 13)
        DataFromJson(true);
    else{
        $(this).data('timer', setTimeout(DataFromJson, 750));
        //sets the timer between the key press from keyboard and the search
    }
})

function DataFromJson(force){
    var searchValue = $("#search-bar").val();        //fetching the value from the textbox
        $.ajax({
        type: "GET",
        dataType: 'json',
        url: "/customer/search/"+searchValue,
        success: function (customersData) {
            populateCustomer(customersData);
        }
});
}


function populateCustomer(data){
    document.getElementById("customers-div").innerHTML="";
       if (data.length>0) {
           var content="<table class='table'>";
            content+="<tr>" +
                "<th>SN</th>" +
                "<th>Last Name</th>" +
                "<th>First Name</th>" +
                "<th>Email Address</th>" +
                "<th>IP Address</th>" +
                "<th>Latitude</th>" +
                "<th>Longitude</th>" +
                "<th>Created on</th>" +
                "<th>Updated on</th>" +
                "<th colspan='3' style='text-align: center'>Admin Operations</th>" +
                "</tr>";
        for(var i=0;i<data.length;i++)
        {
            content+="<tr id='row"+i+"' style='text-align: left'>" +
                "<td>"+(i+1)+"</td>" +
                "<td>"+data[i].lastName+"</td>" +
                "<td>"+data[i].firstName+"</td>" +
                "<td>"+data[i].email+"</td>" +
                "<td>"+data[i].ip+"</td>" +
                "<td>"+data[i].latitude+"</td>" +
                "<td>"+data[i].longitude+"</td>" +
                "<td>"+data[i].createdAt+"</td>" +
                "<td>"+((data[i].updatedAt!=null)?data[i].updatedAt:data[i].createdAt)+"</td>" +
                "<td><button class='btn btn-primary btn-sm  glyphicon glyphicon-user' data-toggle='modal' onclick='getCustomer("+data[i].customerId+")' data-target='#profileModel'>&nbsp;Profile</button></td>"+
                "<td><a href='/home/new-customer/"+data[i].customerId+"'> <button class='btn btn-warning btn-sm  glyphicon glyphicon-pencil' >&nbsp;Update</button></a></td>"+
                "<td><button class='btn btn-danger btn-sm  glyphicon glyphicon-trash ' onclick='myDelFunction("+data[i].customerId+")'>&nbsp;Delete</button></td>"+
                "</tr>";
        }
        content+="</table>";
        $('#customers-div').append(content);  //this is to append the data fetched from json to the table
    }else {
           document.getElementById("customers-div").innerHTML="";
           content="" +
               "<div  style='background-color: Lightgray;width: 40%;margin: 0 auto;padding: 5%;'>" +
               "<h3>We couldn't locate the customer you're looking for!</h3><h4>Try again with different name, email, or IP Address.</h4></div>";
           $('#customers-div').append(content);
       }
}

