var viewController = (function(){

    // Cache Views
    let createBlogView = $("#createBlog"),
        showBlogsView  = $("#allblogs"),
        userEditView = $("#edit-user-profile-view"),
        userBlogsView = $("#userBlogs"),
        individualBlogView = $("#individual-blog"),
        editBlogView  = $("#editBlog");

    // Cache Buttons that change Views
    let logoButton = $(".navbar-brand"),
        createNewBlogButton = $("#user-create-blog"),
        editProfileButton = $("#user-edit-profile"),
        logoutButton = $("#nav-logout-button"),
        userBlogsButton = $("#view-individual-blogs");
        popularButton = $("#popular-nav");


    let views = [
      {
        name: "createBlogView",
        data: createBlogView
      },
      {
        name: "showBlogsView",
        data: showBlogsView
      },
      {
        name: "edinProfileView",
        data: userEditView
      },
      {
        name: "userBlogsView",
        data: userBlogsView
      },
      {
        name: "editBlogView",
        data: editBlogView
      },
      {
        name: "individualBlogView",
        data: individualBlogView
      }
    ];

    logoButton.click(function(){
      events.emit("changeView", "showBlogsView");
    });
    createNewBlogButton.click(function(){
      events.emit("changeView", "createBlogView");
    });
    editProfileButton.click(function(){
      events.emit("changeView", "edinProfileView");
      events.emit("editProfileData", 0);
    });
    userBlogsButton.click(function(){
      events.emit("changeView", "userBlogsView");
    });
    popularButton.click(function(){
      events.emit("changeView", "showBlogsView");
      events.emit("getAllBlogs", 0);
    });
    logoutButton.click(function(){
      events.emit("changeView", "showBlogsView");
    });

    events.on("changeView", loadCorrectView);
    // events.on("updateUser", loadCorrectView);


    function loadCorrectView(view){
        views.forEach(function(singleView){
            if(singleView.name !== view){
              singleView.data.hide();
            } else {
              singleView.data.show();
            }
        });
    };


})();
