
var BlogsAPI = (function(){

  function requestBlogs(){

      let blogs = $.get("/api/v1/blogs");
      blogs.fail(function(err){
        console.log(err);
      });
      blogs.done(function(data){;
        if(data.response==='Success'){
          renderBlogs(data.blogs);
        }
      });
  };

  function renderBlogs(blogs){
      console.log(blogs);
      // Cache DOM
      let $blogs = $('#blogs');
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
        "<button class=visit-button href=/api/v1/blogs/"
        +
        blogs[i]._id
        +
        ">visit</button>"
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
        $("div .visit-button").addClass('btn');
        $("div .visit-button").addClass('btn-primary');
      };
      showIndividualBlog();
  };

  return {
    request: requestBlogs
  };
})();

$(".navbar-brand").click(function(){
    events.emit("getAllBlogs", 0);
});

events.on("getAllBlogs", function(){
  BlogsAPI.request();
});


function showIndividualBlog(){

  let visitButtons = $(".visit-button");
  let visitPages = $(".blogs");
  console.log(visitPages);
  visitPages.on('click', function(event){
    console.log($(this).attr('href').split('/')[4]);
  });
  visitButtons.on('click', function(event) {
    console.log($(this).attr('href').split('/')[4]);
    // requestBlog("5a3198aa36efd3360a244d1d");
    events.emit("changeView", "individualBlogView");
    events.emit("loadIndividualBlog", $(this).attr('href').split('/')[4]);
    // events.emit("generateBlog", $(this).attr('href'));
  });
  // for (var i = 0; i < visitButtons.length;i++) {
    // visitButtons[i].addEventListener('click', function(){
    //    console.log(visitButtons);
    //
    // });
  // }
  console.log(visitButtons);
}
