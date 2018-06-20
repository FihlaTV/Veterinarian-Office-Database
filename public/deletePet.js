function deletePet(id){
    $.ajax({
        url: '/pet/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deletePetMed(p_ID, m_ID){
  $.ajax({
      url: '/petMed/pet_id/' + p_ID + '/medication_id/' + m_ID,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};

