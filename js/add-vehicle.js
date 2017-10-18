// add a vehicle
$("#addVehicleForm").submit(function(e) {
    var url = "http://148.100.99.132:3000/api/org.trustmotors.Car";
    var licensePlate = $("#addVehicleForm :input[name='carId']").val();
    var data = getFormData($("#addVehicleForm"));
    data.$class = "org.trustmotors.Car";
    data.speed = 0;
    data.thermostat = 0;
    data.km = 0;
    data.date = (new Date()).toISOString();

    console.log(data);
    e.preventDefault(); // avoid to execute the actual submit of the form.

    $.ajax({
           type: "POST",
           url: url,
           data: JSON.stringify(data), // serializes the form's elements.
           contentType:"application/json; charset=utf-8",
           dataType: "json",
           beforeSend: function(){
              console.log("before send");
              $("#btnAddVehicle").hide();
              $("#addVehicleLoader").show();
           },
           success: function(data)
           {
              console.log("success");
              window.location = "index.html#licensePlate=" + licensePlate;
           },
           error : function(xhr, errorText){
              console.log(url);
              console.log('Error '+ xhr.responseText);
           },
           complete : function(data) {
              console.log("complete");
              $("#btnAddVehicle").show();
              $("#addVehicleLoader").hide();
           }
         });
});