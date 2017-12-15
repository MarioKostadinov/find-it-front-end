events.on("deleteUser", function(){


    let url = "/api/v1/users/"+user.id;
    $.ajax({
      url: url,
      type: "DELETE",
      beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
      success: function(data) {
         events.emit("changeView", "showBlogsView");
         events.emit("getAllBlogs", 0);
         alert("Successfully Deleted User!");
        }
    });
});
