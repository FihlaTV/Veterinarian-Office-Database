function updateMedication(id){
    $.ajax({
        url: '/medication/' + id,
        type: 'PUT',
        data: $('#update-medication').serialize(),
        success: function(result){
        window.location.replace("./");
        }
    })
};
