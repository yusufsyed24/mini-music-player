new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Sun Sathiyaan 💔",
          artist: "ABCD2 ",
          cover: "https://iili.io/2eGzfbj.jpg",
          source: "mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=UNs50T6EYwE&list=RDUNs50T6EYwE&start_radio=1",
          favorited: false
        },
        {
          name: "Tera Ghata ",
          artist: "Gajendra Verma",
          cover: "img/tera_ghata.jpg",
          source: "mp3/Tera-Ghata.mp3",
          url: "https://youtu.be/0KNk-Joi-NM?si=HQt-MT3l5gAuVTpZ",
          favorited: true
        },

        {
          name: "Coca Cola 🥤",
          artist: "Tony Kakkar",
          cover: "img/Coca_cola.jpg",
          source: "mp3/Cocacolatu.mp3",
          url: "https://youtu.be/_cPHiwPqbqo?si=0oMYRzND8dMtgcK-",
          favorited: false
        },

        {
          name: "Shaky 🔥",
          artist: "Sanju Rathod",
          cover: "img/Shaky.jpg",
          source: "mp3/Shaky.mp3",
          url: "https://youtu.be/sUf2PtEZris?si=L9nueSTbfn9MNJGo",
          favorited: false
        },
        {
          name: "Senorita 💃🏼",
          artist: "Farhan Akhtar",
          cover: "img/senorita.jpg",
          source: "mp3/Senorita.mp3",
          url: "https://youtu.be/yDv0WSgXJVg?si=gqEIPh1h1StgIUDb",
          favorited: true
        },
        {
          name: "Gulabi Aankhen 🌹👀",
          artist: "Sanam",
          cover: "img/Gulabi_Ankhen.jpg",
          source: "mp3/Gulabi-Aankhen.mp3",
          url: "https://youtu.be/hgi2MYAFgE8?si=vPVtztbFG4k-WcU7",
          favorited: false
        },
        {
          name: "Dynamite",
          artist: "BTS",
          cover: "7.jpeg",
          source: "mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=gdZLi9oWNZg&ab_channel=HYBELABELS",
          favorited: true
        },
        {
          name: "DNA",
          artist: "BTS",
          cover: "img/8.jpeg",
          source: "mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Butter",
          artist: "BTS",
          cover: "img/9.jpeg",
          source: "mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=WMweEpGlu_U&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Test",
          artist: "BTS",
          cover: "img/9.jpeg",
          source: "mp3/10.mp3",
          url: "https://www.youtube.com/watch?v=WMweEpGlu_U&ab_channel=HYBELABELS",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
