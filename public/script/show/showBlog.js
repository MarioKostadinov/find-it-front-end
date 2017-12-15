var individualBlog = (function(){

    // Cache DOM for Blog
    var individualBlog      = $("#individual-blog"),
        blogAuthorThumbnail = individualBlog.find("#individual-blog-author-avatar"),
        blogAuthorName      = individualBlog.find("#individual-blog-author-name"),
        blogTitle           = individualBlog.find("#individual-blog-title"),
        blogThumbnail       = individualBlog.find("#individual-blog-thumbnail"),
        blogTopic           = individualBlog.find("#individual-blog-topic span"),
        blogBody            = individualBlog.find("#individual-blog-body p");

    var createComment = $("#create-comment"),
        currentAuthor = createComment.find("#current-user-name"),
        currentAvatar = createComment.find("#current-user-avatar"),
        commentBody   = createComment.find("textarea[name=comment-body]"),
        commentButton = createComment.find("button[name=submit-comment]");


    // Cache DOM for Comments
    var commentSection = $("#comment-section");

    events.on("loadIndividualBlog", requestBlog);

    function requestBlog(blogId) {
      let url = "/api/v1/blogs/"+blogId;
      $.ajax({
        url: url,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
        success: function(data) {
          console.log(data.blog[0]);

          setBlog(data.blog[0]);
          }
      });
    }

    function setBlog(blog) {
      let url = "/api/v1/users/"+blog.authorId+'/avatar';
      let blogUrl = "/api/v1/blogs/"+blog._id;
      individualBlog.attr('src', blogUrl);
      $.ajax({
        url: url,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
        success: function(data) {
          blogAuthorThumbnail.attr('src', data.data.avatar);
          }
      });

    blogTitle.text(blog.title);
    blogThumbnail.css('background-image', 'url(' + blog.thumbnail + ')');
    blogBody.text(blog.body);
    blogAuthorName.text(blog.authorName);
    blogTopic.text(blog.topic);

    loadCurrentUserComments();
    loadComments(blog.comments);

    }

    function loadComments(comments){
        let section = $("#comment-section");
        section.empty();
        comments.forEach(function(comment){
            let template =
            "<div class= comment>"
            +
            "<div class=row>"
            +
            "<div class=col-12>"
            +
            "<div class=comment-author>"
            +
            "<div class=row>"
            +
            "<div class=col-md>"
            +
            "<img class=comment-author-thumbnail src="
            +
            comment.authorAvatar
            +
            ">"
            +
            "<h4 class=comment-author-name>"
            +
            comment.authorName
            +
            "</h4>"
            +
            "</div>"
            +
            "</div>"
            +
            "</div>"
            +
            "<div class=comment-body>"
            +
            "<p>"
            +
            comment.body
            +
            "</p>"
            +
            "</div>"
            +
            "</div>"
            +
            "</div>"
            +
            "</div>";
            section.append(template);
        });
    }

    function loadCurrentUserComments(){
      currentAuthor.text(user.firstName+" "+user.surname);
      currentAvatar.attr('src', user.avatar);
    }

    function gatherInput(){

      let comment = commentBody.val();
      let author = user.firstName + " " + user.surname;
      let avatar = user.avatar;

      let commentObject = {
        authorName: author,
        authorAvatar: avatar,
        body: comment
      }
      postComment(commentObject);
    };

    function postComment(comment){

      let individualBlog = $("#individual-blog");
      let url = individualBlog.attr('src');
      let commentUrl = url+"/comments"
      console.log(commentUrl);
      $.ajax({
        url: commentUrl,
        data: comment,
        type: "POST",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
        success: function(data) {
          console.log('Success');
          events.emit("getAllBlogs", 0);
          events.emit("changeView", "showBlogsView");
          // events.emit("changeView", "individualBlogView");
          }
      });
    }

    commentButton.click(function(){
      events.emit("createCommentButtonClicked", 0);
    });

    events.on("createCommentButtonClicked", function(){
      console.log("Creating comment...");
      gatherInput();
    });

    // setBlog(myBlog);

})();


// var createComment = (function(){
//
//    // Cache DOM
//    var createComment = $("#create-comment"),
//        currentAuthor = createComment.find("#current-user-name"),
//        currentAvatar = createComment.find("#current-user-avatar"),
//        commentBody   = createComment.find("textarea[name=comment-body]"),
//        commentButton = createComment.find("button[name=submit-comment]");
//
//
//     function gatherInput(){
//
//       let comment = commentBody.val();
//       let author = user.firstName + " " + user.surname;
//       let avatar = user.avatar;
//
//       let commentObject = {
//         authorName: author,
//         authorAvatar: avatar,
//         body: comment
//       }
//       postComment(commentObject);
//     };
//
//     function postComment(comment){
//
//       let individualBlog = $("#individual-blog");
//       let url = individualBlog.attr('src');
//       let commentUrl = url+"/comments"
//       console.log(commentUrl);
//       $.ajax({
//         url: commentUrl,
//         data: comment,
//         type: "POST",
//         beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
//         success: function(data) {
//           console.log('Success');
//           events.emit('changeView', 'showBlogsView');
//           events.emit('changeView', 'individualBlogView');
//           }
//       });
//     }
//
//     commentButton.click(function(){
//       events.emit("createCommentButtonClicked", 0);
//     });
//
//     events.on("createCommentButtonClicked", function(){
//       console.log("Creating comment...");
//       gatherInput();
//     });
//
//
// })();
