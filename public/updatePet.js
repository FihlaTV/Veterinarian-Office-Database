function updatePet(id){
    $.ajax({
        url: '/pet/' + id,
        type: 'PUT',
        data: $('#update-pet').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
