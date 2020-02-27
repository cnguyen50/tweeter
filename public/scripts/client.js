/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(() => {
  const renderTweets = (tweetsArr) => {
    tweetsArr.forEach(data => {
      $('.tweets-container').append(createTweetElement(data));
    })};
    
  const $button = $("#tweet-form");
  $button.on('submit', function () {
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



    
  const createTweetElement = function(tweetData) {
    const name = tweetData.user.name;
    const avatars = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const createdAt = tweetData.created_at;
        
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
  renderTweets(data);
});











