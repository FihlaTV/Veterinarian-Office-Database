function updatePetVet(id){
    $.ajax({
        url: '/petVet/' + id,
        type: 'PUT',
        data: $('#update-petVet').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
