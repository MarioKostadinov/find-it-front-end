var createBlog = (function(){


    // Cache DOM
    let $blogForm = $("#createBlog"),
        $title    = $blogForm.find("input[name=title]"),
        $body     = $blogForm.find("textarea[name=body]"),
        $thumbnail= $blogForm.find("input[name=thumbnail]"),
        $topic    = $blogForm.find("select[name=topic]"),
        $submit   = $blogForm.find("button[name=create-blog-button]");

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

        valid = 0;
        // validation code goes here
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

        if (valid === 3) {

          sendFormToServer(form);
        }
    };

    function sendFormToServer(form){
      let url = "/api/v1/blogs";
      $.ajax({
        url: url,
        data: form,
        type: "POST",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
        success: function() {
           events.emit('changeView', 'showBlogsView');
             events.emit("getAllBlogs", 0);
           alert("Successfully Create Blog");
          }
      });
      // let request = $.post("/api/v1/blogs", form);
      // request.fail(function(err){
      //   console.log(err);
      // });
      // request.done(function(api){
      //   console.log(api.response);
      //   if(api.response==='Successfully Created Blog'){
      //     console.log("Success");
      //     events.emit('successfulBlogCreated', api.blog);
      //   } else{
      //     console.log("Fail");
      //     events.emit('unsuccessfulRegisteredUser', api.blog);
      //   }
      // });
    };


    events.on("createBlogClicked", collectFormData);

    $submit.click(function(){
      events.emit("createBlogClicked", 0);
    });

    // console.log($blogForm,$title,$body,$thumbnail,$topic,$submit);





})();
