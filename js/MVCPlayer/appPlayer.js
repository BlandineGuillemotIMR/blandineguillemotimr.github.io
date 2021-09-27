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
    this. getAllAudios = function(){
        return this.audiofilesData;
    }
}


// ============== View =========================
function AudiosView() {
    this.init = function() {
        this.renderAudioListModule();
    }
    this.renderAudioListModule = function() {
        //get all audios and assign to audios 
        var audios = AudiosApp.getAudios();// cache #audio-list DOM 
        var $audioDivUI = document.getElementById('audio-list');// clear HTML from the DOM 
        var $audioListUI = document.createElement('ul');
        $audioDivUI.replaceChildren($audioListUI);
        $audioListUI.innerHTML = '';
        for (var i = 0, len = audios.length; i < len; i++) {
            var $li = document.createElement('li');
            $li.setAttribute('class', 'audio-list-item');
            $li.setAttribute('data-index', i);
            $li.innerHTML = audios[i]['aname']+', '+audios[i]['length'];
            $audioListUI.append($li);
        }
    }
}


//================ Controller ==================
function AudiosCtrl (AudiosView, AudioModel) {
    this.audiosView = AudiosView;
    this.audioModel = AudioModel;

    this.init = function() {
        this.AudiosView.init();
    }
    this.getAudios = function() {
        return this.AudioModel.getAllAudios();
    }
}


const AudiosView = new AudiosView();
const AudioModel = new AudioModel();
const AudiosApp = new AudiosCtrl(AudiosView,AudioModel);


window.addEventListener("DOMContentLoaded",function(){AudiosApp.init()});