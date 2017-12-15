var editProfile = (function(){

    //Cache DOM
    let mainElement = $("#edit-user-profile-view"),
        firstName   = mainElement.find("#edit-profile-firstName"),
        surname     = mainElement.find("#edit-profile-surname"),
        avatar      = mainElement.find("#edit-profile-avatar"),
        bigAvatar   = mainElement.find("#show-edit-profile-avatar"),
        update      = mainElement.find("button[name=updateProfile]"),
        deleteBtn   = $("#deleteButton");


        function showCurrentDetails(){
          firstName[0].value = user.firstName;
          surname[0].value = user.surname;
          avatar[0].value = user.avatar;
          bigAvatar.attr('src', user.avatar);
        }

        function gatherInput(){
          let input = {
            firstName: firstName.val(),
            surname: surname.val(),
            avatar: avatar.val()
          }
          sendUpdate(input);
        };

        function emitEvent(){
          return 0;
        }

        function sendUpdate(form){
          let url = "/api/v1/users/"+user.id;
          $.ajax({
            url: url,
            data: form,
            type: "PUT",
            beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', user.token);},
            success: function() {
               user.firstName = form.firstName;
               user.surname = form.surname;
               user.avatar = form.avatar;
               events.emit('updateUser', 'showBlogsView');
               alert("Successfully Updated Profile");
              }
          });

        };

        update.click(function(){
          events.emit("updateProfile", 0);
        });
        deleteBtn.click(function(){
          events.emit("deleteUser", 0);
        });


        events.on("updateProfile", gatherInput);
        events.on("editProfileData", showCurrentDetails);



})();
