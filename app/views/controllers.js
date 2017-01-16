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
    "title" : "current title",
    "url" : "https://www.youtube.com/embed/pd3eV-SG23E?list=RDxO4bMgd3ZCY"
  },
  "previous" : [
    {
      "title" : "Belini",
      "url" : "https://www.youtube.com/embed/ADvuyBcB1J8?list=RDxO4bMgd3ZCY"
    },
    {
      "title" : "apple juice",
      "url" : "https://www.youtube.com/embed/xO4bMgd3ZCY?list=RDxO4bMgd3ZCY"
    },
    {
      "title" : "orange juice",
      "url" : "https://www.youtube.com/embed/EHiBVetMVYA?list=RDxO4bMgd3ZCY"
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
          "name": "burnaby1",
          "date": "date1",
          "time": "time 1",
          "inviteStatus": true
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "burnaby2",
          "date": "date2",
          "time": "time 2",
          "inviteStatus": true
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "burnaby3",
          "date": "date3",
          "time": "time 3",
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
          "name": "van1",
          "date": "date4",
          "time": "time 4",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "van2",
          "date": "date2",
          "time": "time 5",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "van3",
          "date": "date5",
          "time": "time 6",
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
          "name": "surrey1",
          "date": "date1",
          "time": "time 7",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "surrey2",
          "date": "date 2",
          "time": "time 8",
          "inviteStatus": false
          // "image": "image",
          // "endpoint": "url"
        },
        {
          "name": "surrey3",
          "date": "date 3",
          "time": "time 9",
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
    if(!valid) {
      alert("invalid email temperory alert to check, can change css of the input box to be red border");
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
      alert("invite sent- testing alert maybe create custom alert");
    }
  }
});
