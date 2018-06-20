function deleteOwner(id){
    $.ajax({
        url: '/owner/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
