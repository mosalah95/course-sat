
$(document).ready( function () {
    $('#mydata').DataTable({
    });


} );

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQIs1XHK4I7rycWArh3Se4m9zFejk79PM",
    authDomain: "course-sat.firebaseapp.com",
    databaseURL: "https://course-sat.firebaseio.com",
    projectId: "course-sat",
    storageBucket: "course-sat.appspot.com",
    messagingSenderId: "250498630953"
};
firebase.initializeApp(config);

var firestore = firebase.firestore();
var ref =firestore.doc("coll/doc");
//var colref = firestore.doc("coll");

$("#send").click(function () {
    var ref =firestore.doc("coll/"+Date.now());
    ref.set({
            name:$("#name").val(),
            email:$("#email").val(),
            phone:$("#phone").val(),
            message:$("#message").val()
        }
    ).then(function() {
       alert("done");

    })
    .catch(function(error) {
       alert("error");
    });
});

$("#load").click(function () { alert("ef");
   ref.get().then(function (value) {
    var mydata = value.data();
    // alert(mydata);
       $("#area").val( "name  :"+mydata.name + " email :"+mydata.email );


   });

});
$("#load2").click(function () {
    // alert("ed");
    firestore.collection("coll").get().then(function (value) {
        value.forEach(function (value2) {
            var data = value2.data();
            $("#rowdata").append("<tr>" +
                " <td> "+data.name +" </td>" +
                " <td> "+data.email +" </td>" +
                "<td> "+data.phone +" </td> " +
                "<td> "+data.message +"</td> " +
                " </tr>");
            $("#area").append( data.id +"-> "+data.email );

        });
    });

});

function realtime() {
    ref.onSnapshot(function (value) {
        var mydata = value.data();
        // alert(mydata);
        // $("#area").val( "name  :"+mydata.name + " email :"+mydata.email );

    })
}
// realtime();



function  loadTable() {

    var list = document.getElementById("rowdata");
    list.removeChild(list.childNodes[0]);

    ref.onSnapshot(function (value) {
        // var data = value.data();

        firestore.collection("coll").get().then(function (value) {
            value.forEach(function (value2) {
                var data = value2.data();
                $("#rowdata").append("<tr>" +
                    " <td> "+data.name +" </td>" +
                    " <td> "+data.email +" </td>" +
                    "<td> "+data.phone +" </td> " +
                    "<td> "+data.message +"</td> " +
                    " </tr>");
                $("#area").append(data.email+"," );
                $("#loader").css("display", "none");

            });
        });

    })
}
loadTable();


$("#copy").click(function(){
    document.getElementById('area').select();
    document.execCommand('copy');

    // $("area").select();
    // document.execCommand('copy');
    $('.alertDone').toggle();
    setTimeout(function(){ $('.alertDone').toggle(); }, 3000);

});




