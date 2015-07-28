/* global myPlaylist */
var app = angular.module('tutorial', []);
app.controller('PlaylistCtrl', PlaylistCtrl);

function PlaylistCtrl($scope, $http, $location) {
    $scope.path = $location.path().split('/');
    $scope.path.splice(0,1);
    $scope.currentSong = '';
    $scope.playlist = [];
    $scope.playlist_name = '';
    $scope.playlistSearch = '';
    $scope.currentPlaylist = [];
    $scope.list_playlist = {};
    $scope.mediaPath = 'media/music/';
    $scope.album = $scope.path[1];
    $scope.band = $scope.path[0];
    $scope.albumList;
    $scope.trackList;
    if($scope.band){
         $http.get($scope.mediaPath + $scope.band + '/list.json')
             .success(function(data){
                         $scope.albumList = data;
                         });
                     
    }
    $scope.changeAlbum = function(a) {  
        myPlaylist.setPlaylist(a);
    }

    //add song function
    $scope.addSong = function() {
        $scope.playlist.push($scope.currentSong);
        $scope.currentSong = '';
    }

    //remove song function
    $scope.removeSong = function(i) {
        $scope.playlist.splice(i,1);
    }

    //save the playlists
    $scope.savePlaylist =  function (n) {
        $scope.list_playlist[n] = {
            name: n, 
            playlist: $scope.playlist,
        }
        $scope.playlist = [];
    }
    
    $scope.currentList = function(n) {
        mute = document.querySelectorAll('.currentList');
        for(i = 0; i < mute.length; i++){
        mute[i].style.display = 'none'
        }
        elm = document.getElementById(n);
        elm.style.display = 'block';
    }

    $scope.expandPlaylist = function(name) {
        $http.get($scope.list_playlist[name].file)
        .success(function(data) {
            $scope.playlist = data.playlist;
        });
        $scope.currentList(name);
    }
    
//     $http.get('playlists.json')
//         .success(function(data){
//             data.forEach(function(playlistInfo) {
//                 $scope.list_playlist[playlistInfo.name] = {
//                     name:       playlistInfo.name,
//                     file:   playlistInfo.file, 
//                 }
//             })
//     });

    $scope.music = {};
 
    
    $(document).ready(function(){
        myPlaylist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_N",
            cssSelectorAncestor: "#jp_container_N"
        }, [
            {
                title:"met",
                artist:"stemage",
                mp3:"media/music/metroid_intro.mp3",
            },
            {
                title:"met",
                artist:"stemage",
                mp3:"media/music/metroid_intro.mp3",
            }
        ], {
            playlistOptions: {
                enableRemoveControls: true
            },
            swfPath: "../../dist/jplayer",
            supplied: "mp3",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            audioFullScreen: true
        });
        //$scope.changeAlbum($scope.album);
    });
    
    
}
