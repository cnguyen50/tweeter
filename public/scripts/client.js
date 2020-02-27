/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {
  const renderTweets = (tweetsArr) => {
    tweetsArr.forEach(data => {
      $('.tweets-container').append(createTweetElement(data));
    })};
    
  const $button = $("#tweet-form");
  $button.on('submit', () => {
    console.log("listening here", $button.serialize());
    event.preventDefault();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $button.serialize() 
    })
      .then(function () {
        console.log("CREATED NEW TWEET");
      })
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
                    <p>${content}</p>
                <footer>
                    <span class="date">${createdAt}</span>
                </footer>
            </article>
        `;
  };
  // renderTweets(data);
  loadtweets();
});











