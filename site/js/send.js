
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

$("#sendD").click(function () {
    // alert(validateEmail($("#email-form1-5").val()));
    var Message="";
    if($("#name-form1-5").val() == ''){
        errors( "من فضلك ادخل الاسم " );
    }else if($("#email-form1-5").val() == ''){
        errors("من فضلك ادخل البريد الالكتروني " );
    }else if($("#phone-form1-5").val() == ''){
        errors( "من فضلك ادخل رقم الهاتف " );
    }else if( $("#message-form1-5").val() == '' ){
        errors("من فضلك ادخل الرسالة " );
    }else if(! validateEmail($("#email-form1-5").val()) )
    {
        errors( "البريد الالكتروني غير صحيح " );
    }else {
        const DOCid =Date.now();
        var ref = firestore.doc("coll/" +DOCid);
        ref.set({
                id:DOCid,
                name: $("#name-form1-5").val(),
                email: $("#email-form1-5").val(),
                phone: $("#phone-form1-5").val(),
                message: $("#message-form1-5").val()
            }
        ).then(function () {
            $('.alertDone').toggle();
            setTimeout(function () {
                $('.alertDone').toggle();
            }, 3000);
        })
            .catch(function (error) {
                alert("error");
            });

    }



});
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function errors(error) {
    $("#datamessage").html("<p> "+error+" </p>");
    $('.alerte').toggle();
    setTimeout(function () {
        $('.alerte').toggle();
    }, 3000);
}





