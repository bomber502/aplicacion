// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const { width, height } = canvas;
const xCenter = width / 2; // centre de l'écran en x
const yStart = 50; // positionde la première hélice en y
const xMax = 80; // largeur des helices
const yMax = 50; // espace entre les helices
let angle = 0;
const speed = 0.02; // vitesse de rotation
const tAnglePI = [
  0,
  Math.PI / 6,
  Math.PI / 3,
  Math.PI / 2,
  2 * Math.PI / 3,
  5 * Math.PI / 6,
  Math.PI,
  7 * Math.PI / 6,
  4 * Math.PI / 3,
  -Math.PI / 2,
  5 * Math.PI / 3,
  11 * Math.PI / 6,
];
const tPI = [...tAnglePI, ...tAnglePI];
function render() {
  ctx.clearRect(0, 0, width, height);
  const tPositions = [];
  for (let i = 0; i < tPI.length; i++) {
    const positions = adn(tPI[i], (i * yMax));
    tPositions.push(positions);
  }
  angle += speed;
  requestAnimationFrame(render);
}
/**
 *
 * @param {*} startPhase phase de début en x
 * @param {*} yPos position de l'helice en y
 */
function adn(startPhase, yPos, colorLink = '#FFFFFF') {
  const angleSin = Math.sin(angle + startPhase);
  const angleCos = Math.cos(angle + startPhase);
  const xPos1 = angleSin * xMax;
  const xPos2 = -angleSin * xMax;
  const yPos1 = angleCos * 10 + yPos;
  const yPos2 = -angleCos * 10 + yPos;
  // Création des liens entre les cercles
  ctx.beginPath();
  ctx.strokeStyle = colorLink;
  ctx.lineWidth = 3;
  ctx.moveTo(xPos1 + xCenter, yPos1 + yStart);
  ctx.lineTo(xPos2 + xCenter, yPos2 + yStart);
  ctx.stroke();
  // On fait passer le cercle le plus loin derrière
  if (angleCos < 0) {
    drawADN(xPos1, yPos1, angleCos, 11342935);
    drawADN(xPos2, yPos2, -angleCos, 1668818);
  } else {
    drawADN(xPos2, yPos2, -angleCos, 1668818);
    drawADN(xPos1, yPos1, angleCos, 11342935);
  }
  return {
    xPos1, yPos1, xPos2, yPos2,
  };
}
/**
 * @param {*} xAngle position en x du cercle
 * @param {*} yAngle position en y du cercle
 * @param {*} radius largeur du cercle
 * @param {*} color couleur du cercle
 */
function drawADN(xPos, yPos, radius, color) {
  ctx.fillStyle = `#${(color).toString(16)}`;
  ctx.beginPath();
  ctx.arc(
    xPos + xCenter,
    yPos + yStart,
    10 + (radius * 3),
    0,
    2 * Math.PI,
  );
  ctx.closePath();
  ctx.fill();
}

render();

