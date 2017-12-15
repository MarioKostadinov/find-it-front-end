var logout = (function(){

    // Cache DOM
    var logoutButton = $("#nav-logout-button"),
        signInButton = $("#nav-register-button"),
        registerButton = $("#nav-login-button"),
        createBlogButton= $("#user-create-blog"),
        editProfileButton = $("#user-edit-profile"),
        navAuthorName = $("#nav-author-name");
        showBlogs = $("#view-individual-blogs");

    function logout(){
      logoutButton.hide();
      navAuthorName.hide();
      signInButton.show();
      registerButton.show();
      editProfileButton.hide();
      createBlogButton.hide();
      showBlogs.hide();
    };

    logoutButton.click(function(){
      events.emit("changeView", "showBlogsView");
      events.emit("getAllBlogs", 0);
      events.emit("logoutUser", 0);
    });
    events.on("logoutUser", logout);
})();
