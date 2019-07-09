/* Media Player controls using HTML5's Media API
 * Modified for Bootstrap by Nanna Ellegaard 2019
 <div class="control-layer">
    <div class="media-controls">
      <div class="progress">
        <div class="progress-bar" role="progressbar" id="progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="sr-only">0%</span></div>
      </div>
      <button type="button" id="play-pause-button" class="play" title="Start" aria-label="Start" onclick="togglePlayPause();"><span class="glyphicon glyphicon-play" aria-hidden="true"></button>
      <button type="button" id="stop-button" class="stop" title="Stop" aria-label="Stop" onclick="stopPlayer();"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
      <button type="button" id="" class="play" title="Start" aria-label="Tilbage" onclick="jumpSecs('-', 10);"><span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span></button>
      <button type="button" id="replay-button" class="replay" title="Replay" aria-label="Replay" onclick="replayMedia();"><span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></button>
      <input id="vol-control" type="range" min="0" max="100" step="1" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0.5" oninput="setVolume(this.value)" onchange="setVolume(this.value)" title="Volume: 50%" class="volume" aria-label="Volume">
      <button type="button" id="mute-button" class="mute" title="Unmute" aria-label="Slå lyd til/fra" onclick="toggleMute();"><span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span></button>
      <button type="button" id="subtitle-button" class="fullscreen" title="Undertekster" aria-label="Undertekster" onclick="handleFullscreen();"><span class="glyphicon glyphicon-font" aria-hidden="true"></button>
      <button type="button" id="fullscreen-button" class="fullscreen" title="Fuld skærm" aria-label="Fuld skærm" onclick="handleFullscreen();"><span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></button>
    </div>
  </div>
</div>
 */

var video,
  videoContainer,
  playPauseBtn,
  muteBtn,
  volumeBtn,
  progressBar,
  // subtitles,
  // subtitlesMenu,
  fullScreen,
  updateProgressBar,
  changeButtonType,
  canPlayVideo,
  resetPlayer,
  upperCaseFirst;

var initialisevideo = function() {
  // Get player id
  video = document.getElementById('video');

  // Get handles to each of the buttons and other elements
  playPauseBtn = document.getElementById('play-pause-button');
  muteBtn = document.getElementById('mute-button');
  volumeBtn = document.getElementById('vol-control');
  //subtitles = document.getElementById('subtitle-button');
  progressBar = document.getElementById('progress-bar');
  fullScreen = document.getElementById('fullscreen-button');
  videoContainer = document.getElementById('videocontainer');

  // If no video element exists, break out of the function
  if (!video) {
    return;
  }

  // Hide the browser's default controls
  video.controls = false;

  // Add a listener for the timeupdate event so we can update the progress bar
  video.addEventListener('timeupdate', updateProgressBar, false);

  // Add a listener for the play and pause events so the buttons state can be updated
  video.addEventListener('play', function() {
    // Change the button to be a pause button
    changeButtonType(playPauseBtn, 'pause');
  }, false);

  video.addEventListener('pause', function() {
    // If paused, change the button to be a play button
    changeButtonType(playPauseBtn, 'play');
  }, false);

  video.addEventListener('ended', function() {
    this.pause();
  }, false);

  // Initially turn off subtitles
  // for (var i = 0; i < video.textTracks.length; i++) {
  //   video.textTracks[i].mode = 'hidden';
  // }

  // If there are no subtitles, disable the button
  // if (video.textTracks.length === 0) {
  //   subtitles.disabled = true;
  // }

  // Creates and returns a menu item for the subtitles language menu
  // var subtitleMenuButtons = [];
  // var createMenuItem = function (id, lang, label) {
  //   var listItem = document.createElement('li');
  //   var button = listItem.appendChild(document.createElement('button'));
  //   button.setAttribute('id', id);
  //   button.className = 'subtitles-button';
  //   if (lang.length > 0) button.setAttribute('lang', lang);
  //   button.value = label;
  //   button.setAttribute('data-state', 'inactive');
  //   button.appendChild(document.createTextNode(label));
  //   button.addEventListener('click', function (e) {
  //     // Set all buttons to inactive
  //     subtitleMenuButtons.map(function (v, i, a) {
  //       subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
  //     });
  //     // Find the language to activate
  //     var lang = this.getAttribute('lang');
  //     for (var i = 0; i < video.textTracks.length; i++) {
  //       // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
  //       if (video.textTracks[i].language == lang) {
  //         video.textTracks[i].mode = 'showing';
  //         this.setAttribute('data-state', 'active');
  //       } else {
  //         video.textTracks[i].mode = 'hidden';
  //       }
  //     }
  //     subtitlesMenu.style.display = 'none';
  //   });
  //   subtitleMenuButtons.push(button);
  //   return listItem;
  // }
  // Go through each one and build a small clickable list, and when each item is clicked on, set its mode to be "showing" and the others to be "hidden"

  // if (video.textTracks) {
  //   var df = document.createDocumentFragment();
  //   subtitlesMenu = df.appendChild(document.createElement('ul'));
  //   subtitlesMenu.className = 'subtitles-menu';
  //   subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
  //   for (var x = 0; x < video.textTracks.length; x++) {
  //     subtitlesMenu.appendChild(createMenuItem('subtitles-' + video.textTracks[x].language, video.textTracks[x].language, video.textTracks[x].label));
  //   }
  //   videoContainer.appendChild(subtitlesMenu);
  // }

  // Display subtitles menu if any
  // subtitles.addEventListener('click', function (e) {
  //   if (subtitlesMenu) {
  //     subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
  //   }
  // });
};

var togglePlayPause = function() {
  // If the video is currently paused or has ended
  if (video.paused || video.ended) {
    // Change the button to be a pause button
    changeButtonType(playPauseBtn, 'pause');
    // Play the media
    video.play();
  }
  // Otherwise it must currently be playing
  else {
    // Change the button to be a play button
    changeButtonType(playPauseBtn, 'play');
    // Pause the media
    video.pause();
  }
};

// Stop the current media from playing, and return it to the start position
var stopPlayer = function() {
  video.pause();
  video.currentTime = 0;
};

// Changes the volume on the media player using a slider
var setVolume = function(v) {
  video.muted = false;
  var vol = v / 100;
  video.volume = vol;
  volumeBtn.title = 'Volume: ' + v + '%'
  volumeBtn.setAttribute("aria-valuenow", vol);
};

// Toggles the media player's mute and unmute status
var toggleMute = function() {
  if (video.muted) {
    // Change the cutton to be a mute button
    changeButtonType(muteBtn, 'volume-up');
    muteBtn.title = 'Unmute';
    // Unmute the media player
    video.muted = false;
  } else {
    // Change the button to be an unmute button
    changeButtonType(muteBtn, 'volume-off');
    muteBtn.title = 'Mute';
    // Mute the media player
    video.muted = true;
  }
};

// Replays the media currently loaded in the player
var replayMedia = function() {
  resetPlayer();
  video.play();
};

// Parse and format total video duration
var getDuration = function(duration) {
  if (video.duration) {
    var minutes = parseInt(video.duration / 60, 10);
    var seconds = Math.round(video.duration % 60);
    return minutes + ':' + seconds + ' min.';
  }
}

// Jumps backwards or forwards any number of seconds
var jumpSecs = function(dir, sec) {
  // run as jumpSecs('+', 10)
  var seekToTime;
  if (dir == '-') {
    // Backwards
    seekToTime = video.currentTime - sec;
  } else {
    // Else forwards
    seekToTime = video.currentTime + sec;
  }
  if (seekToTime < 0 || seekToTime > video.duration) {
    return;
  }
  video.currentTime = seekToTime;
};

// Update the progress bar
var updateProgressBar = function() {
  // Work out how much of the media has played via the duration and currentTime parameters
  var percentage = Math.floor((100 / video.duration) * video.currentTime);
  // Update the progress bar with current values
  progressBar.value = percentage;
  progressBar.style.width = percentage + '%';
  progressBar.setAttribute("aria-valuenow", percentage);
  progressBar.title = percentage + '% af ' + getDuration();
  var track = progressBar.querySelector('.progress-track');
  track.innerHTML = percentage + '% af ' + getDuration();
  if (percentage > 50) {
    track.style.color = "#fff";
  } else {
    track.style.color = "#252525";
  }
  var sronly = progressBar.querySelector('.sr-only');
  if (sronly) {
    sronly.innerHTML = percentage + '% af ' + getDuration();
  }
};

// Updates a button's title, innerHTML and CSS class to a certain value
var changeButtonType = function(btn, value) {
  btn.title = upperCaseFirst(value);
  btn.className = value;
  btn.setAttribute("aria-label", upperCaseFirst(value));
  // All available glyphicons
  var span = btn.querySelector('.glyphicon');
  // remove glyphicons before adding new
  Array.prototype.slice.call(span.classList).forEach(function(className) {
    if (className.startsWith('glyphicon-')) {
      span.classList.remove(className);
    }
  });
  span.classList.add("glyphicon-" + value);
};

// Loads a video item into the media player
var loadVideo = function() {
  for (var i = 0; i < arguments.length; i++) {
    var file = arguments[i].split('.');
    var ext = file[file.length - 1];
    // Check if this media can be played
    if (canPlayVideo(ext)) {
      // Reset the player, change the source file and load it
      resetPlayer();
      video.src = arguments[i];
      video.load();
      break;
    }
  }
};

// Checks if the browser can play this particular type of file or not
var canPlayVideo = function(ext) {
  var ableToPlay = video.canPlayType('video/' + ext);
  if (ableToPlay == '') {
    //Eempty string: The specified media type definitely cannot be played.
    return false;
  } else {
    return true;
  }
};

// Resets the media player
var resetPlayer = function() {
  // Reset the progress bar to 0
  progressBar.value = 0;
  // Move the media back to the start
  video.currentTime = 0;
  // Check if button is play or pause
  togglePlayPause();
};

// Fullscreen for various browsers
var handleFullscreen = function() {
  if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitEnterFullScreen) {
    video.webkitEnterFullScreen();
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen()
  }
};

// Make attributes values first letter uppercase because it looks nice
var upperCaseFirst = function(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

// Initialize the player when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  'use strict';
  // Polyfill for IE11:
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
    };
  }
  // Does the browser actually support the video element?
  var supportsVideo = !!document.createElement('video').canPlayType;
  if (supportsVideo) {
    initialisevideo();
  }
}, false);
