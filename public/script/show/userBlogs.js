var userBlogs = (function(){

  // Cache DOM
  let userBlogsButton = $("#view-individual-blogs");
  let allBlogs = [];
  function requestBlogs(){
    let url = "/api/v1/users/"+user.id+'/blogs';
    $.ajax({
      url: url,
      type: "GET",
      beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
      success: function(data) {
         renderBlogs(data.blogs);
        }
    });
  }


  function renderBlogs(blogs){
      console.log(blogs);
      // Cache DOM
      let $blogs = $('#uBlogs');
      $blogs.empty();
      for(var i = 0; i < blogs.length; i++){
        var template =
        "<div class=blogs "+"href=/api/v1/"+blogs[i]._id+">"
        +
        "<img class=blogImg src=" +blogs[i].thumbnail + ">"
        +
        "<div class=row>"
        +
        "<div class=col>"
        +
        "<h2>"
        +
        blogs[i].title
        +
        "</h2>"
        +
        "</div><div class=col>"
        +
        "<button class=edit-button href=/api/v1/blogs/"
        +
        blogs[i]._id
        +
        ">edit</button>"
        +
        "<button class=delete-button href=/api/v1/blogs/"
        +
        blogs[i]._id
        +
        ">delete</button>"
        +
        "</div>"
        +
        "</div>"
        +
        "<h4>"
        +
        blogs[i].authorName
        +
        "</h4>"
        +
        "</div>";
        $blogs.append(template);
        $("div .blogImg").addClass('img-responsive');
        $("div .blogs").addClass('col');
        $("div .edit-button").addClass('btn');
        $("div .edit-button").addClass('btn-primary');
        $("div .delete-button").addClass('btn');
        $("div .delete-button").addClass('btn-primary');
      };
      showEditBlogs();
  };

  function showEditBlogs(){

    let editButtons = $(".edit-button");
    let deleteButtons = $(".delete-button");

    editButtons.on('click', function(event) {
      events.emit("loadEditBlog", $(this).attr('href').split('/')[4]);
      events.emit("changeView", "editBlogView");
    });
    deleteButtons.on('click', function(event) {
      events.emit("getAllBlogs", 0);
      events.emit("changeView", "showBlogsView");
      events.emit("deleteBlog", $(this).attr('href').split('/')[4]);
    });
}
  events.on("showUserBlogs", requestBlogs);


  userBlogsButton.click(function(){
    events.emit("showUserBlogs", 0);
  });




})();
