let stringsJSON = 
{
  "name": "Sip + Stirred",
  "splash": {
    "title": "We'll be here soon",
    "body": "Join the pre-launch party and be the first to know when we're ready",
    "button": "Join the pre-launch"
  },
  "modal" : {
    "title": "Sip + Stirred launch party",
    "body": "Enter your email for an exclusive invite to our Sip + Stirred launch events taking place all aorund the lower mainlands.",
    "footer": "Already registered? Just login with your previous email to see if any new events showed"
  },
}

let youtubeJSON =
{
  "current" : {
    "title" : "Today's",
    "url" : "https://www.youtube.com/embed/q-gYcvipozY"
  },
  "previous" : [
    {
      "title" : "Bellini",
      "url" : "https://www.youtube.com/embed/yfpz9TgKNls"
    },
    {
      "title" : "Bloody Mary",
      "url" : "https://www.youtube.com/embed/wwOtn1oxPIM"
    },
    {
      "title" : "Old Fashioned",
      "url" : "https://www.youtube.com/embed/joqDgv35w1Y"
    }
  ]
}

let userJSON = 
{
  "email" : "Email",
  "areas" : [
    {
      "name": "Burnaby",
      "locations" : [
        {
          "name": "Great Bear Pub",
          "date": "Nov 15",
          "time": "Kingsway St",
          "inviteStatus": true
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "FF Public House",
          "date": "March 4",
          "time": "Bonsor Ave",
          "inviteStatus": true
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "Oliver Twist",
          "date": "July 28",
          "time": "Edmunds St",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        }
      ]
    },
    {
      "name": "Vancouver",
      "locations" : [
        {
          "name": "Doolin's Irish",
          "date": "Feb 27",
          "time": "Nelson St",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "The Morrissey",
          "date": "Aug 21",
          "time": "Granville St",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "Black Frog",
          "date": "May 4",
          "time": "Cambie St",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        }
      ]
    },
    {
      "name": "Surrey",
      "locations" : [
        {
          "name": "Sammy J's",
          "date": "June 12",
          "time": "Croydon Dr",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "Big Ridge",
          "date": "Sept 30",
          "time": "152 St",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "Green Timbers",
          "date": "April 18",
          "time": "148 St",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        }
      ]
    }
  ]
}

var app = angular.module("controllers", []);

var email;

app.controller("homeController", function ($scope, $uibModal, $sce) {
  $scope.splash = stringsJSON.splash;
  $scope.previousVideos = youtubeJSON.previous;
  $scope.youtubeURL = $sce.trustAsResourceUrl(youtubeJSON.current.url);

  $scope.joinEvent = function() {
    var modalInstance = $uibModal.open({
      templateUrl: "views/emailModal.template.html",
      controller: "emailModalController",
      size: "m"
    });
  }

  $scope.changeVideo = function(url) {
    $scope.youtubeURL = $sce.trustAsResourceUrl(url);
  }
});

app.controller("emailModalController", function ($scope, $location, $uibModalInstance) {
  $scope.modal = stringsJSON.modal;
  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  $scope.submitEmail = function(emailString, valid) {
    if(!valid || emailString == "" || emailString == null) {
      alert("Invalid email");
      return;
    }
    email = emailString;
    console.log(email);
    $uibModalInstance.dismiss();
    $location.path("/selectLocation");
  }
});

app.controller("locationController", function ($scope) {
  $scope.toggle = false;
  $scope.areaToggle = false;
  $scope.areas = userJSON.areas;
  $scope.selectedArea = "Select Location";
  $scope.toggleDropDown = function() {
    $scope.toggle = !$scope.toggle;
  }
  $scope.clickDropDownItem = function(area) {
    $scope.locations = area.locations;
    $scope.selectedArea = area.name;
  }
  $scope.requestInvite = function(bool) {
    if(!bool) {
      alert("A detailed invitation has been sent. Please check your Email. We hope to see you there :)");
    }
  }
});
