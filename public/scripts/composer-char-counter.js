$(document).ready(function() {
    console.log("hello dere");


    $("textarea").on('keyup', function() {
        // let result = 140 - $(this).val().length;
        $('.counter')[0].textContent = 140 - $(this).val().length;
        console.log($('.counter')[0].textContent)

        
    });
});

