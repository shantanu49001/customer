$(document).ready(function () {
    var items=[];
    $("#item-form").on("submit",addItemToCart);
    $("#cart-table").on("click",".btn-danger",removeItemFromCart);
    $("#generate-invoice").on("click", generateInvoice);

    function addItemToCart(event){
        event.preventDefault();
        var itemName=$("#item-name").val();
        var itemPrice=$("#item-price").val();

       if(itemName!==""&& itemPrice!=="") {
        var item={
            name:itemName,
            price:itemPrice,

        };

        items.push(item);
        $("#cart-table tbody").append(
         "<tr><td>" + item.name + "</td><td>" + item.price + '</td><td><button class="btn btn-danger">Resolved?</button></td></tr>'
        );

        UpdateTotalCost();
        $("#item-name").val("");
        $("#item-price").val("");

       }
    }

    function removeItemFromCart() {
        var index=$(this).closest("tr").index();
        items.slice(index,1);
        $(this).closest("tr").remove();
        UpdateTotalCost();
    }

  function UpdateTotalCost() {
    var totalCost=0;
    items.forEach(function (item) {
        tol̥talCost+=item.price;
    });

    $("total-cost").text(totalCost);
  } 
  
  function generateInvoice() {
    var invoice=`<html>
<head>

    <title>INVOICE</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
  <div class="container mt-5">
    <h1 class="text-centre">Invoice</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Customer name</th>
                <th>Query</th>
                <th></th>
            </tr>
        </thead>
        <tbody>`;

        items.forEach(function (item) {
            invoice+= "<tr><td>" +
             item.name + 
             "</td><td>" 
             +item.price +
              "</td></tr>";
        });

        invoice +=  '</tbody><p class="text-right">'
          +
         "</div></body></html>";


        var popup=window.open("","_blank");
        popup.document.open();
        popup.document.write(invoice);   
        popup.document.close();


        function getTotalCost(){
            var totalCost= "";
            items.forEach(function (item) {
                totalCost+=item.price;
            });

            return totalCost;
        }



    
  }
  
});