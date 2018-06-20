function deleteDoctor(id){
    $.ajax({
        url: '/doctor/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
