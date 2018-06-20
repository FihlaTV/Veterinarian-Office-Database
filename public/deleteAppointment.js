function deleteAppointment(id){
    $.ajax({
        url: '/appointment/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
