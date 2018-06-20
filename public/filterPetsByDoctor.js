function filterByDoctor(){
        var doctor_id = document.getElementById('doctor_filter').value
                window.location = '/pet/filter/' + parseInt(doctor_id)
                }
