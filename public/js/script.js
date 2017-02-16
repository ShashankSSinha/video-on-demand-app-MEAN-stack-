const app = angular.module('videoApp', ['ngMaterial', 'ngStorage']);

app.controller('videoController', ['$scope', '$http', '$sce', '$sessionStorage', '$location',
    ($scope, $http, $sce, $sessionStorage, $location) => {

    $scope.genSessionToken = length => {
        let token = '_';
        const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for(let i=0; i < length; i++) {
            token += charset.charAt(Math.floor(Math.random() * charset.length));    
        }
        return token;
    };

    if($sessionStorage.sessionToken) {
        console.log(`Old session present: sessionToken = ${$sessionStorage.sessionToken}`);
    } else {
        $sessionStorage.sessionToken = $scope.genSessionToken(10);
        console.log(`New session created: sessionToken = ${$sessionStorage.sessionToken}`);
    }

  	$http.get('https://demo2697834.mockable.io/movies').then(response => {
        $scope.videos = response.data.entries;
    });

    $scope.getViewed = () => {
        const sessionToken = $sessionStorage.sessionToken;

        $http.get($location.protocol() + '://'+ $location.host() + ':' +  $location.port() + '/viewed', {params: {sessionToken}}).then(response => {
            $scope.viewedVideos = response.data;
        });    
    };

    $scope.getViewed();

    $scope.playVideo = url => {
    	$scope.playUrl =  $sce.trustAsResourceUrl(url);
    	$('video').get(0).load();
    	$('video').get(0).webkitRequestFullScreen();
    	$('video').get(0).addEventListener('ended', () => {
        	$('video').get(0).webkitExitFullScreen();
            $scope.getViewed();
        });
    };

    $('video').get(0).addEventListener('webkitfullscreenchange', () => {
        if (!document.webkitIsFullScreen){
            $('video').get(0).pause();
            $scope.getViewed();
        }
    });

    $scope.saveVideo = video => {
        const sessionToken = $sessionStorage.sessionToken;

        $http.post($location.protocol() + '://'+ $location.host() + ':' +  $location.port() + '/save', {video, sessionToken}).then(response => {
            console.log('video-saved-for-current-session');
        });
    };

    $scope.clearHistory = () => {
        const sessionToken = $sessionStorage.sessionToken;

        $http.delete($location.protocol() + '://'+ $location.host() + ':' +  $location.port() + '/clear', {params: {sessionToken}}).then(response => {
            console.log('watched-video-history-cleared');
            $scope.getViewed();
        });    
    };

    const KeyCodes = {
        RETURNKEY : 13,
        ESCAPE : 27,
        LEFTARROW : 37,
        RIGHTARROW : 39
    };

    $scope.onKeydown = function(video, $event) {
        const e = $event;
        let $target = $(e.target);
        $target.removeClass('focus');

        switch (e.keyCode) {
            case KeyCodes.ESCAPE:
                $target.blur();
                break;
            case KeyCodes.LEFTARROW:
                e.preventDefault();
                $target = $target.prev();
                $target.focus();
                $target.addClass('focus');
                break;
            case KeyCodes.RIGHTARROW:
                e.preventDefault();
                $target = $target.next();
                $target.focus();
                $target.addClass('focus');
                break; 
            case KeyCodes.RETURNKEY:
                $scope.playVideo(video.contents[0].url);
                $scope.saveVideo(video);
                break;    
        }
    };
}]);
