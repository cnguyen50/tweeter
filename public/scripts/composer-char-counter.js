$(document).ready(function() {
    console.log("hello dere");


    $("textarea").on('input', function() {
        let length = $(this).val().length;
        let counter = $(this).next().next();
        let result = counter.text(140 - length);

        if (counter.text() < 0) {
            counter.addClass("overlimit")
        } else {
            counter.removeClass("overlimit")
        }


        console.log(result)
    });


});

