function updateAppointment(id){
    $.ajax({
        url: '/appointment/' + id,
        type: 'PUT',
        data: $('#update-appointment').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
