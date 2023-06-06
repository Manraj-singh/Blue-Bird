// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class HandleReaction {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.handleReactions();
  }

  handleReactions() {
    $(this.toggler).on("click", function (e) {
      // console.log(e.target);
      e.preventDefault();
      let self = this;
      // console.log(self);
      // this is a new way of writing ajax which you might've studied, it looks like the same as promises

      // console.log($(self).attr("href"));
      $.ajax({
        type: "POST",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          let postId = data.data.emojiData.post_id;

          let myPostReaction = data.data.reaction;
          let displayElement = $(`.reaction-count-${postId}`);

          let postType = data.data.likeType === "Comment" ? "comment" : "post";
          console.log(postType);

          // displayElement.attr("data-reactions", myPostReaction);
          $(`.${postType}-reaction-like-${postId}`).html(
            parseInt(data.data.emojiData.Like.length)
          );
          $(`.${postType}-reaction-sad-${postId}`).html(
            parseInt(data.data.emojiData.Sad.length)
          );
          $(`.${postType}-reaction-angry-${postId}`).html(
            parseInt(data.data.emojiData.Angry.length)
          );
          $(`.${postType}-reaction-love-${postId}`).html(
            parseInt(data.data.emojiData.Love.length)
          );
          $(`.${postType}-reaction-wow-${postId}`).html(
            parseInt(data.data.emojiData.Wow.length)
          );

          switch (myPostReaction) {
            case "Like": {
              $(`.reaction-icon-${postId}`).html("👍");
              displayElement.attr(
                `data-${myPostReaction}`,
                parseInt(data.data.emojiData.Like.length)
              );
              displayElement.html(
                `${parseInt(data.data.emojiData.Like.length)} ${myPostReaction}`
              );

              break;
            }
            case "Sad": {
              $(`.reaction-icon-${postId}`).html("😞");
              displayElement.attr(
                `data-${myPostReaction}`,
                parseInt(data.data.emojiData.Sad.length)
              );
              displayElement.html(
                `${parseInt(data.data.emojiData.Sad.length)} ${myPostReaction}`
              );

              break;
            }
            case "Angry": {
              $(`.reaction-icon-${postId}`).html("😡");
              // console.log(data.data.emojiData);

              displayElement.attr(
                `data-${myPostReaction}`,
                parseInt(data.data.emojiData.Angry.length)
              );
              displayElement.html(
                `${parseInt(
                  data.data.emojiData.Angry.length
                )} ${myPostReaction}`
              );

              break;
            }
            case "Love": {
              $(`.reaction-icon-${postId}`).html("♥");
              displayElement.attr(
                `data-${myPostReaction}`,
                parseInt(data.data.emojiData.Love.length)
              );
              displayElement.html(
                `${parseInt(data.data.emojiData.Love.length)} ${myPostReaction}`
              );

              break;
            }
            case "Wow": {
              $(`.reaction-icon-${postId}`).html("😲");
              displayElement.attr(
                `data-${myPostReaction}`,
                parseInt(data.data.emojiData.Wow.length)
              );
              displayElement.html(
                `${parseInt(data.data.emojiData.Wow.length)} ${myPostReaction}`
              );

              break;
            }
          }
        })
        .fail(function (errData) {
          console.log("error in completing the request");
        });
    });
  }
}
