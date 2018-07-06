
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
            name:$("#name-form1-5").val(),
            email:$("#email-form1-5").val(),
            phone:$("#phone-form1-5").val(),
            message:$("#message-form1-5").val()
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
                        " <td> " + data.name + " </td>" +
                        " <td> " + data.email + " </td>" +
                        "<td> " + data.phone + " </td> " +
                        "<td> " + data.message + "</td> " +
                        "<td>  <span style='display: none' id='id'>" + data.id + "</span> <a onclick='deleteElement(" + data.id + ")'  class='deleteElement btn btn-danger'>Delete</a>  </td> " +
                        " </tr>");
                    $("#area").append(data.email + ",&#10;");
                    $("#loader").css("display", "none");


                });
                if(value.exists){}else{
                    $("#loader").css("display", "none");
                    // $("#rowdata").append(" <tr colspan='1'> <td>لا يوجد بيانات</td> </tr>");
                }
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

// $("#delete").click(function () {
//     firestore.collection("coll").doc("doc2").delete().then(function() {
//         alert("All The data cleared");
//     }).catch(function(error) {
//         console.error("Error removing document: ", error);
//     });
// });


function deleteElement(id) {
    swal({
        title: "هل انت متأكد من حذف العنصر ؟",
        text: "سيتم حذف بيانات العنصر نهائيا ",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete)   {
        if (willDelete) {

            const deletedDoc = id.toString();
            firestore.collection("coll").doc(deletedDoc).delete().then(function() {
                // alert("تم حذف العنصر ");

            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });

            swal("تم حذف البيانات بنجاح", {
                icon: "success",
            });
            setTimeout(function () {
                location.reload();
            }, 2000);


        } else {
            swal("لم يتم حذف شيئ");
}
});








}
function deletealldata() {
    swal({
        title: "هل انت متأكد من حذف كل البيانات ؟",
        text: "سيتم حذف كل البيانات نهائيا ",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function (willDelete) {
        if (willDelete) {


            firestore.collection("coll").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    firestore.collection("coll").doc(doc.id).delete().then(function () {
                        swal("تم حذف البيانات بنجاح", {
                            icon: "success",
                        });
                        setTimeout(function () {
                            location.reload();
                        }, 2000);

                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                    });


                });
            });
        } else {
            swal("لم يتم حذف شيئ");
        }
    });
}

