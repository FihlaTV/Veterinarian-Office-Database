function updateOwner(id){
    $.ajax({
        url: '/owner/' + id,
        type: 'PUT',
        data: $('#update-owner').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
