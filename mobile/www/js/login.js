app.controller('loginController', function ($scope, $state, $filter, $q, userService) {
  $scope.showReg = true;
  $scope.showUserName = false;
  $scope.showPasswordConfirm = false;
  $scope.showLoginButton = true;
  $scope.showRegButton = false;
  $scope.showCancel = false;
  $scope.isAuthenticated = true;
  $scope.placeHolder = "Email";

  userService.get('133333333333333333333337').then(function (response) {
    if (!response) {
      userService.post({
        _id: "133333333333333333333337",
        username: "SnakkBot",
        email: "bot@snakk.com",
        password: "2017",
        avatar: "assets/defaultimages/snakk-bot.jpg",
        status: "offline"
      });
    }
  });

  $scope.loginButtonClicked = function () {
    $scope.login($scope.email, $scope.password).then(function(validated) {
      /*if(userService.active.status === "online"){
       $scope.placeHolder = "You are already logged in";
       }else {*/
      if (validated) {
        userService.active.status = "online";
        userService.updateUser(userService.active);
        localStorage['user'] = userService.active._id;
        $state.transitionTo('chat');
        //}
      } else {
        $scope.password = "";
      }
    });
  };

  $scope.registerButtonClicked = function () {
    $scope.isAuthenticated = true;
    if ($scope.username && $scope.email && $scope.password && $scope.confirm) {
      $scope.register($scope.email, $scope.password, $scope.confirm).then(function(validated) {
        if (validated) {
          var user = {
            email: $filter('lowercase')($scope.email), username: $scope.username,
            password: $scope.password, avatar: "assets/defaultimages/defaultProfile.png", status: "offline", warnings: 0
          };
          userService.post(user).then(function (response) {
            $scope.email = $scope.email.toLowerCase();
            shownElements();
          });
        }
      });
    }
  };

  $scope.registerClicked = function () {
    shownElements();
  };

  $scope.cancelClicked = function () {
    shownElements();
  };

  var shownElements = function () {
    $scope.showReg = !$scope.showReg;
    $scope.showLoginButton = !$scope.showLoginButton;
    $scope.showRegButton = !$scope.showRegButton;
    $scope.showPasswordConfirm = !$scope.showPasswordConfirm;
    $scope.showUserName = !$scope.showUserName;
    $scope.showCancel = !$scope.showCancel;
  };

  $scope.login = function (inputEmail, inputPassword) {
    return $q(function(resolve) {
      userService.getUsers().then(function (response) {
        var users = response;
        for (var i = 0; i < users.length; i++) {
          if (inputEmail === users[i].email && inputPassword === users[i].password) {
            $scope.isAuthenticated = true;
            userService.active = users[i];
            resolve(true);
            return;
          }
        }
        resolve(false);
      });
    });
  };

  $scope.register = function (inputEmail, inputPassword, passwordConfirm) {
    return $q(function(resolve) {
      if (inputPassword === passwordConfirm) {
        userService.getUsers().then(function (response) {
          var users = response;
          for (var i = 0; i < users.length; i++) {
            if (inputEmail === users[i].email) {
              $scope.isAuthenticated = false;
              $scope.email = "";
              $scope.placeHolder = "User exists";
              resolve(false);
              return;
            }
          }
          resolve(true);
        });
      } else {
        $scope.isAuthenticated = false;
        resolve(false);
      }
    });
  };
});