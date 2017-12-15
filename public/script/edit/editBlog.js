var editBlog = (function(){


    // Cache DOM
    let $blogForm = $("#editBlog"),
        $title    = $blogForm.find("input[name=title]"),
        $body     = $blogForm.find("textarea[name=body]"),
        $thumbnail= $blogForm.find("input[name=thumbnail]"),
        $topic    = $blogForm.find("select[name=topic]"),
        $submit   = $blogForm.find("button[name=edit-blog-button]");

    let blog_Id;

        events.on("loadEditBlog", requestBlog);

        function requestBlog(blogId) {
          blog_Id = blogId;
          console.log("Loading blog");
          let url = "/api/v1/blogs/"+blogId;
          $.ajax({
            url: url,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
            success: function(data) {

              setBlog(data.blog[0]);
              }
          });
        }

        function setBlog(blog) {
            $title[0].value = blog.title;
            $body[0].value = blog.body;
            $thumbnail[0].value = blog.thumbnail;
        }

    function collectFormData(){

      let title       = $title.val();
      let body        = $body.val();
      let thumbnail   = $thumbnail.val();
      let topic       = $topic.val();

      let formDataObject = {
        title        : title,
        body         : body,
        thumbnail    : thumbnail,
        topic        : topic,
        authorId     : user.id,
        firstName    : user.firstName,
        surname      : user.surname,
      };
      console.log(formDataObject);

      validateForm(formDataObject);
    };

    function validateForm(form){
      console.log("Validating...");
        valid = 3;
        if (form.title === "") {
          events.emit("invalidBlogForm", "title");
        } else {
          valid++;
        }
        if (form.body === ""){
          events.emit("invalidBlogForm", "body");
        }else {
          valid++;
        }
        if (form.thumbnail === ""){
          events.emit("invalidBlogForm", "thumbnail");
        } else {
          valid++;
        }


        sendFormToServer(form);

    };

    function sendFormToServer(form){
      console.log("Sending to update...");
      let url = "/api/v1/blogs/"+blog_Id;
      $.ajax({
        url: url,
        data: form,
        type: "PUT",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
        success: function() {
           events.emit('changeView', 'userBlogsView');
           alert("Successfully Updated Blog");
          }
      });
    };

    events.on("editBlogButton", collectFormData);
    $submit.click(function(){
      events.emit("editBlogButton", 0);
    });
})();
