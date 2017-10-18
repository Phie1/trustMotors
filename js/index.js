$(document).ready(function(){
  if(window.location.hashArray.licensePlate != null) {
    console.log(window.location.hashArray.licensePlate);
    licensePlate = window.location.hashArray.licensePlate;
    $('#inputLicensePlate').val(licensePlate);
    $('#searchLicenseForm').submit();
  }
});


// search a vehicle by license plate
$("#searchLicenseForm").submit(function(e) {

    var licensePlate = $("#searchLicenseForm :input[name='licensePlate']");
    console.log(licensePlate.val());
    var url = "http://148.100.99.132:3000/api/org.trustmotors.Car/" + licensePlate.val();


    e.preventDefault(); // avoid to execute the actual submit of the form.

    $.ajax({
           type: "GET",
           url: url,
           data: $("#searchLicenseForm").serialize(), // serializes the form's elements.
           contentType:"application/json; charset=utf-8",
           dataType: "json",
           beforeSend: function(){
              $("#searchLicenseLoader").show();
              $(".container-fluid").show();
           },
           success: function(data)
           {
              $("#titleLicensePlate").hide();
              window.location = "index.html#licensePlate=" + data.carId;
              console.log(data);
              $('#vehicleLicensePlate').html(data.carId);
              $('#vehicleBrand').html(data.brand);
              $('#vehicleModel').html(data.model);
              $('#vehicleKm').html(data.km);
              getEventsCar(data.carId);
           },
           error : function(xhr, errorText){
              $(".container-fluid").hide();
              $("#titleLicensePlate").show();
              if(xhr.status == 404) {
                alert("The vehicle cannot be found.")
              }
              console.log(url);
              console.log('Error '+ xhr.responseText);
           },
           complete : function(data) {
              $("#searchLicenseLoader").hide();
           }
         });
});


// get all events of the car and put them in table
function getEventsCar(carId) {
    var url = "http://148.100.99.132:3000/api/org.trustmotors.CarEvent";

    $.ajax({
           type: "GET",
           url: url,
           contentType:"application/json; charset=utf-8",
           beforeSend: function(){
              /*$("#searchLicenseLoader").show();
              $(".container-fluid").show();*/
           },
           success: function(data)
           {
              $("#dataTableEventsCar tbody tr").remove();
              //console.log(data);
              console.log("events :");
              for(var i = 0, len = data.length; i < len; i++) {
                if(data[i].car == "resource:org.trustmotors.Car#" + carId) {
                    console.log(data[i]);

                    var tr = $('<tr></tr>');
                    var td_date = $('<td></td>');
                    var td_type = $('<td></td>');
                    var td_com = $('<td></td>');
                    var format_date = moment(data[i].date).format('DD/MM/YYYY HH:mm:ss');
                    tr.append(td_date);
                    tr.append(td_type);
                    tr.append(td_com);
                    td_date.html(format_date);
                    td_type.html(data[i].type);
                    td_com.html(data[i].comment);
                    $("#dataTableEventsCar").append(tr);
                }
              }

              $('#dataTableEventsCar').DataTable();
           },
           error : function(xhr, errorText){
              console.log(url);
              console.log('Error '+ xhr.responseText);
           },
           complete : function(data) {
              /*$("#searchLicenseLoader").hide();
              $("#titleLicensePlate").hide();*/
           }
         });
};