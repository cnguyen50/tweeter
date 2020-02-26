$(document).ready(function() {
    console.log("hello dere");


    $("textarea").on('keyup', function() {
        // // let difference = $(this).next().next()[0].textContent;
        // let length = $(this).val().length;
        // // let result = 140 - length;
        // let counter = $(this).next().next()[0]
        // let result = counter.textContent
        // if (result.text < 0) {
        //     counter.addClass("overlimit")
        // }
        // result = counter

        // console.log(counter) 
        let length = $(this).val().length;
        let counter = $(this).next().next();
        let result = counter.text(140 - length);

        if (counter.text() < 0) {
            counter.addClass("overlimit")
        }


        console.log(result)
    });


});

