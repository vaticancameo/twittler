$(document).ready(function(){
        var $body = $('body');
        var latest = streams.home.length;


        function padDigits(number) {
          return Array(Math.max(2 - String(number).length + 1, 0)).join(0) + number;
        }
 
        var timestamp = function(dateObject) {
          var year = dateObject.getFullYear();
          var month = dateObject.getMonth();
          var date = dateObject.getDate();
          var hour = padDigits(dateObject.getHours());
          var minute = padDigits(dateObject.getMinutes());
          return hour + ":" + minute + " - " + month + "/" + date + "/" + year;
        };

        var displayNewTweet = function() {
          var index = 0;
          while (index < latest) {
            var tweet = streams.home[index];
            var $container = $('<div class="boxes"></div>');
            var $tweet = $('<span class="content"></span>');
            var $timeTweeted = $('<p></p>');
            var $user = $('<span class="user"></span>');
            $user.text("@" + tweet.user);
            $timeTweeted.text("Tweeted at " + timestamp(tweet.created_at));
            $tweet.text(': ' + tweet.message);
            $container.insertAfter($body);
            $user.appendTo($container);
            $tweet.appendTo($container);
            $timeTweeted.appendTo($container);
            index += 1;
          };
        };

        var displayTimeline = function(username) {
          var index = 0;
          var usertweets = streams.users[username];
          while (index < usertweets.length) {
            var tweet = streams.users[username][index];
            var $container = $('<div class="boxes"></div>');
            var $tweet = $('<span class="content"></span>');
            var $timeTweeted = $('<p></p>');
            var $user = $('<span class="user"></span>');
            $user.text("@" + tweet.user);
            $timeTweeted.text("Tweeted at " + timestamp(tweet.created_at));
            $tweet.text(': ' + tweet.message);
            $container.insertAfter($body);
            $user.appendTo($container);
            $tweet.appendTo($container);
            $timeTweeted.appendTo($container);
            index += 1;
        }
      };

        var userInteraction = function() {
          $(".user").on("mouseenter", function() {
            $(this).addClass("highlighted");
          });

          $(".user").on("mouseleave", function() {
            $(this).removeClass("highlighted");
          });

          $(".user").on("click", function() {
            $(".boxes").remove();
            displayTimeline($(this).text().slice(1));
            userInteraction();
          });
        };

        $("button").click(function() {
          $(".boxes").remove();
          latest = streams.home.length;
          displayNewTweet();
          userInteraction();
        });

        displayNewTweet();
        userInteraction();

        
      });