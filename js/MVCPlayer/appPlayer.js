// ============== Model =========================
function AudioModel() {
    this.audiofilesData = [
        {
            aname: "foret.mp3",
            length: "",
            type: "MP3",
        },
        {
            aname: "foret.wav",
            length: "",
            type: "WAV",
        },
        {
             aname: "test.mp3",
             length: "",
             type: "MP3",
        }
        ];
    this. getAllAudio = function(){
        return this.audiofilesData;
    }
}


// ============== View =========================
function AudioView() {
    this.init = function() {
        this.renderAudioListModule();
    }
    this.renderAudioListModule = function() {
        //get all audio and assign to audio 
        var audio = AudioApp.getAudio();// cache #audio-list DOM 
        var $audioDivUI = document.getElementById('audio-list');// clear HTML from the DOM 
        var $audioListUI = document.createElement('ul');
        $audioDivUI.replaceChildren($audioListUI);
        $audioListUI.innerHTML = '';
        for (var i = 0, len = audio.length; i < len; i++) {
            var $li = document.createElement('li');
            $li.setAttribute('class', 'audio-list-item');
            $li.setAttribute('data-index', i);
            $li.innerHTML = audio[i]['aname']+', '+audio[i]['length'];
            $audioListUI.append($li);
        }
    }
}


//================ Controller ==================
function AudioCtrl (AudioView, AudioModel) {
    this.audioView = AudioView;
    this.audioModel = AudioModel;

    this.init = function() {
        this.AudioView.init();
    }
    this.getAudio = function() {
        return this.AudioModel.getAllAudio();
    }
}


const AudioView = new AudioView();
const AudioModel = new AudioModel();
const AudioApp = new AudioCtrl(AudioView,AudioModel);


window.addEventListener("DOMContentLoaded",function(){AudioApp.init()});