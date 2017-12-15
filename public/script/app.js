var user = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMzE5ODYyMzZlZmQzMzYwYTI0NGQxYyIsImlhdCI6MTUxMzIwOTMzMSwiZXhwIjoxNTEzMjk1NzMxfQ.c9U3p4rmseZayxcoN87w0pEU5RcE4KQOIkxV1z_nXwE",
  firstName: "Mario",
  surname: "Kostadinov",
  id: "5a31986236efd3360a244d1c",
  avatar: "https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?auto=format&fit=crop&w=3067&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  update: function(user){
    this.token = user.token;
    this.firstName = user.firstName;
    this.surname = user.surname;
    this.id = user.id;
    this.avatar = user.avatar;
  }
};

function renderLogInPage(){
    let navRegisterButton = $("#nav-register-button");
    let navLoginButton = $("#nav-login-button");
    let navLogoutButton = $("#nav-logout-button");
    let navNameDiv = $("#nav-author-name");
    let navName = $("#nav-author-name span");
    let createBlog = $("#user-create-blog");
    let editProfile = $("#user-edit-profile");
    let createBlogPage = $("#createBlog");
    let profileView = $("#edit-user-profile-view");
    let userBlogs = $("#view-individual-blogs");

    navRegisterButton.hide();
    navLoginButton.hide();
    navLogoutButton.show();
    navNameDiv.show();
    navName.text(user.firstName + " " + user.surname);
    createBlog.show();
    editProfile.show();
    profileView.hide();
    userBlogs.show();
    events.emit("changeView", "showBlogsView");
    events.emit("getAllBlogs", 0);
};
events.on("logUserIn", function(data){
  user.update(data);
});
events.on("logUserIn", renderLogInPage);
// events.on("updatedUser", renderLogInPage);
events.on("updateUser", renderLogInPage);
