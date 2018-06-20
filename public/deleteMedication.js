function deleteMedication(id){
    $.ajax({
        url: '/medication/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
