$("#add_user").submit( function(event){
    alert('Data Inserted Succesfully');
})
 
$("#update_user").submit( function(event){
    //default behaviour is to reload the browser
    //when clicked on SUBMIT button
    event.preventDefault(); // to stop that default behaviour

    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    })

    // console.log(data)    

// inside this object we will pass value to the AJAX
// we will use AJAX to make req to server and get response
    var request = {
        'url': `http://localhost:5000/api/users/${data.id}`,
        "type":"PUT",
        "data":data
    }

    $.ajax(request).done( response=> {
        alert("Data Updated Succesfully")
    })
}) 

if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click( function(){
        var id = $(this).attr("data-id")
        // console.log(id)
        //making request with this ID
        var request = {
            'url': `http://localhost:5000/api/users/${id}`,
            "method":"DELETE"
        }

        if(confirm("You really want to permanently delete this record ?")){
            $.ajax(request).done( response=> {
                alert("Data Deleted Succesfully")
                location.reload()
            })
        }

    })
}