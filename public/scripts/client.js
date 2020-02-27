/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  const renderTweets = (tweetsArr) => {
    $(".tweets-container").empty();
    tweetsArr.forEach(data => {
      $(".tweets-container").prepend(createTweetElement(data));
    })};
    
  const $button = $("#tweet-form");
  $button.on("submit", () => {
    console.log("listening here", $button.serialize());
    event.preventDefault();

    let error = $("#error-message");
    const characterLength = $("textarea").val().length;

    if (characterLength > 140) {
      error.slideDown().text("😡OVER 140 CHARACTERS😡");
      return
    }

    if (characterLength === 0) {
      error.slideDown().text("🥱plz try again🥱");
      return

    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $button.serialize() 
      })
        .then(function() {
          loadtweets();
          // console.log("CREATED NEW TWEET");
        })
    }

  });



  const loadtweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(tweets => {
        renderTweets(tweets);
    });
  }


  const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


    
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
                    <div>
                    <i class="fab fa-font-awesome-flag"></i>
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-retweet"></i>
                    </div>
                </footer>
            </article>
        `;
  };
  // renderTweets(data);
  loadtweets();
});











