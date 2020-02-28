/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  //refetching tweets after submission
  const renderTweets = (tweetsArr) => {
    $(".tweets-container").empty();
    tweetsArr.forEach(data => {
      $(".tweets-container").prepend(createTweetElement(data));
    });
  };
  
  //tweet form submission
  $(".new-tweet").hide();
  const $button = $("#tweet-form");
  $button.on("submit", () => {
    event.preventDefault();

    //handling error if textarea length empty or over 140 characters
    let error = $("#error-message");
    const characterLength = $("textarea").val().length;

    if (characterLength > 140) {
      error.slideDown()
        .text("‼️😡OVER 140 CHARACTERS😡‼️")
        .delay(2000)
        .slideUp();
    } else if (characterLength === 0) {
      error.slideDown()
        .text("😬plz try again😬")
        .delay(2000)
        .slideUp();

    //if form submission is successfull then makes request and load tweets
    } else { 
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $button.serialize()
      })
        .then(function() {
          loadtweets();
          $("textarea").val("");
        });
    }
  });

  //click event for arrow animation
  const $post = $(".slide-tweet");
  $post.on("click", (event) => {
    event.preventDefault();

    $(".new-tweet").slideToggle({complete: function() {
      $("textarea").focus();
    }});
  });


  // makes ajax request and renders tweets
  const loadtweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(tweets => {
        renderTweets(tweets);
      });
  };

//prevents XSS by escaping
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // creates new tweet with template
  const createTweetElement = function(tweetData) {
    const name = tweetData.user.name;
    const avatars = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const createdAt = moment(tweetData.created_at).fromNow();
        
    return `
            <article class="tweet">
                <header>
                    <div class="user-info">
                        <img id="avatar" src="${avatars}">
                        <h4 class="user-header-name">${name}</h4>
                    </div>
                    <h5 class="user-header-pad">${handle}</h5>
                </header>
                    <p>${escape(content)}</p>
                <footer id="details">
                    <span>${createdAt}</span>
                    <div class="hover-icon">
                    <i class="fab fa-font-awesome-flag"></i>
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-retweet"></i>
                    </div>
                </footer>
            </article>
        `;
  };
  loadtweets();
});











