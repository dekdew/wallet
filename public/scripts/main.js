var $loginMsg = $('.loginMsg'),
  $login = $('.login'),
  $signupMsg = $('.signupMsg'),
  $signup = $('.signup'),
  $frontboxl = $('.frontbox-l');
  $frontboxs = $('.frontbox-s');

$('#switch1-l').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontboxl.addClass("moving-l");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

$('#switch2-l').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontboxl.removeClass("moving-l");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

$('#switch1-s').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontboxs.addClass("moving-s");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})

$('#switch2-s').on('click', function() {
  $loginMsg.toggleClass("visibility");
  $frontboxs.removeClass("moving-s");
  $signupMsg.toggleClass("visibility");

  $signup.toggleClass('hide');
  $login.toggleClass('hide');
})
