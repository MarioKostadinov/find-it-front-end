//==================
// Register module
//==================
let Register = (function(){

    // Cache DOM
    let $register_module    = $('#register-module'),
        $firstName          = $register_module.find('input[name=firstName]'),
        $surname            = $register_module.find('input[name=surname]'),
        $email              = $register_module.find('input[name=email]'),
        $password           = $register_module.find('input[name=password]'),
        $confirmPassword    = $register_module.find('input[name=password-confirm]'),
        $month              = $register_module.find('select[name=month]'),
        $day                = $register_module.find('input[name=day]'),
        $year               = $register_module.find('input[name=year]'),
        $avatar               = $register_module.find('input[name=avatar]'),
        $registerButton     = $register_module.find('button[name=register]');

    function collectFormData(){

      let firstName       = $firstName.val();
      let surname         = $surname.val();
      let email           = $email.val();
      let password        = $password.val();
      let confirmPassword = $confirmPassword.val();
      let month           = $month.val();
      let day             = $day.val();
      let year            = $year.val();
      let avatar          = $avatar.val();

      let formDataObject = {
        firstName       : firstName,
        surname         : surname,
        email           : email,
        password        : password,
        confirmPassword : confirmPassword,
        month           : month,
        day             : day,
        year            : year,
        avatar          : avatar
      };
      events.emit('collectedFormData', formDataObject);
    };

    function validateForm(form){

      let valid = 0;

      if(form.firstName === ""){
        events.emit("emptyRegisterInput", "firstName");
      } else{
        valid++;
      }
      if(form.surname === ""){
        events.emit("emptyRegisterInput", "surname");
      } else {
        valid++;
      }
      if(form.email === ""){
        events.emit("emptyRegisterInput", "email");
      } else {
        valid++;
      }
      if(form.password === ""){
        events.emit("emptyRegisterInput", "password");
      } else if(form.password.length<6){
        events.emit("passwordTooShort", "password");
      } else {
        valid++;
      }
      if(form.confirmPassword === ""){
        events.emit("emptyRegisterInput", "confirmPassword");
      } else if(form.confirmPassword.length<6){
        events.emit("passwordTooShort", "confirmPassword")
      } else {
        valid++;
      }
      if(form.day === ""){
        events.emit("emptyRegisterInput", "day");
      } else {
        valid++;
      }
      if(form.year === ""){
        events.emit("emptyRegisterInput", "year");
      } else if(form.year >2017 || form.year < 1900) {
        events.emit("invalidYear", 0);
      } else{
        valid++;
      }
      let test_valid = true;
      if (test_valid){
        events.emit("validRegisterForm", form);
        console.log("Valid Form!");
      } else {
        events.emit("invalidRegisterForm", form);
        console.log("Invalid Form!");
      }
    };

    function displayEmptyInputError(input){
      console.log(input);
    };

    function sendFormToServer(form){
      let request = $.post("/api/v1/users", form);
      request.fail(function(err){
        console.log(err);
      });
      request.done(function(api){
        if(api.auth===true){
          events.emit('successfulRegisteredUser', api);
        } else {
          events.emit('unsuccessfulRegisteredUser', api);
        }
      });
    };

    events.on("successfulRegisteredUser", function(data){
      user.update(data);
    });
    events.on("successfulRegisteredUser", renderLogInPage);

    $registerButton.click(function(){
      events.emit("RegisterButtonClicked", 0);
    });

    // events.on("emptyRegisterInput", displayEmptyInputError);
    events.on('RegisterButtonClicked', collectFormData);
    events.on('collectedFormData', validateForm);
    events.on('validRegisterForm', sendFormToServer);

    return {
      registerButton: $registerButton
    };
})();
