events.on("deleteBlog", function(blogId){

    console.log(blogId);
    let url = "/api/v1/blogs/"+blogId;
    $.ajax({
      url: url,
      type: "DELETE",
      beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
      success: function(data) {
         events.emit("changeView", "showBlogsView");
         events.emit("logoutUser", 0);
         events.emit("getAllBlogs", 0);
         alert("Successfully Deleted the Blog!");
        }
    });

});
