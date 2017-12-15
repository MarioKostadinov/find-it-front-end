//====================
// Login Form Module
//====================

let Login = (function(){

    // Cache DOM
    let $login      = $('#login-module'),
        $email      = $login.find("input[name=email]"),
        $password   = $('#login-password'),
        $button     = $('#login-button');

    let loginButton = $("#nav-register-button");

    function collectFormData(){

        let email     = $email.val();
        let password  = $password.val();

        let formDataObject = {
          email           : email,
          password        : password,
        };
        validateForm(formDataObject);
      };

    function validateForm(form){

        console.log("validating...");
        let valid = 0;
        if (form.email === ""){
          events.emit("emptyLoginInput", "email");
        } else {
          valid++;
        }
        if (form.password === ""){
          events.emit("emptyLoginInput", "password")
        } else {
          valid++;
        }

        // Send form to server
        if (valid===2){
          sendFormToServer(form);
        } else {
          console.log("invalid");
        }
    };

    function sendFormToServer(form){
      console.log("sending");
      console.log(form);
      let request = $.post("/api/v1/login", form);
      request.fail(function(err){
        console.log(err);
        events.emit("unsuccessfulLogin", 0);
      });
      request.done(function(data){
        console.log("recieved request");
        console.log(data);
        if(data.auth===true){
          events.emit('logUserIn', data);
        } else {
          events.emit('unsuccessfulLogin', data);
        }
      });

    }


    $button.click(function(){
      events.emit("loginButtonClicked", 0);
    });

    loginButton.click(function(){
      events.emit("loginButtonPressed", 0);
    });

    events.on("loginButtonPressed", function(){
      console.log("Button PRessed");
    });


    events.on("loginButtonClicked", collectFormData);


})();
