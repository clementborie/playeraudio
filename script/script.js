class Player
{
    constructor(_element)
    {
        this.element = _element
        this.audioElement = musics[currentMusic].audio
        this.playElement = this.element.querySelector('.js-play')
        this.pauseElement = this.element.querySelector('.js-pause')
        this.muteElement = this.element.querySelector('.js-mute')
        this.unmuteElement = this.element.querySelector('.js-unmute')
        this.nextMusic = this.element.querySelector('.js-button-forward')
        this.previousMusic = this.element.querySelector('.js-button-backward')
        this.titleSong = this.element.querySelector('.js-song-title')
        this.nameArtist = this.element.querySelector('.js-artist-name')
        this.imageArtist = this.element.querySelector('.js-images')
        this.setPlayPause()
        this.timeLineUpdate()
        this.setMute()
        this.setSwitchMusic()
        this.setTextUpdate()

        // this.setTimer()
        // this.timerElement = this.element.querySelector('.js-timer')
        // this.setVolume()
        // this.setSeekBar()
    }
// Time line //

    // setTimer()
    // {
    //     let update = setInterval ('timerElement', () => 
    //     {
    //         let mins = Math.floor(this.audio.currentTime / 60);
    //         let secs = Math.floor(this.audio.currentTime % 60);
    //             if (secs < 10) {
    //                 secs = '0' + String(secs)
    //             }
    //             timer.innerHTML = mins + ':' + secs;
    //     })
       
    // }

    // var update = setInterval(function() {
    //     var mins = Math.floor(audio.currentTime / 60);
    //     var secs = Math.floor(audio.currentTime % 60);
    //     if (secs < 10) {
    //       secs = '0' + String(secs);
    //     }
    //     timer.innerHTML = mins + ':' + secs;
    //   }, 10);
    // }



    timeLineUpdate()
    {
        let maxSvgOffSet = 801
        let svgOffSet
        this.audioElement.addEventListener('timeupdate', () =>
        {
            svgOffSet = this.audioElement.currentTime * maxSvgOffSet / this.audioElement.duration

            document.querySelector('.time-line').style.strokeDashoffset = 1000 - svgOffSet

        })
    }

    setSeekBar()
    {
        const volumeBarElement = this.element.querySelector('.js-volume-bar')
        const volumeBarFillElement = seekBarElement.querySelector('.js-volume-bar-fill')

        


    }
// Pause play button //
    setPlayPause()
    {

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space'){
                if (this.playElement.classList.contains('dispNone')) {
                    this.audioElement.pause()
                    this.pauseElement.classList.add('dispNone')
                    this.playElement.classList.remove('dispNone')
                } else {
                    this.audioElement.play()
                    this.playElement.classList.add('dispNone')
                    this.pauseElement.classList.remove('dispNone')
                }
            }
        })
        // Play

        this.playElement.addEventListener('click', () =>
        {
            this.audioElement.play()
            this.playElement.classList.add('dispNone')
            this.pauseElement.classList.remove('dispNone')
        })
    

        // Pause

        this.pauseElement.addEventListener('click', () =>
        {
            this.audioElement.pause()
            this.pauseElement.classList.add('dispNone')
            this.playElement.classList.remove('dispNone')

            
        })
    }
    
    setMute()
    {   

        this.muteElement.addEventListener('click', () =>
        {
            this.audioElement.muted = false
            this.muteElement.classList.add('dispNone')
            this.unmuteElement.classList.remove('dispNone')
        })

        this.unmuteElement.addEventListener('click', () =>
        {
            this.audioElement.muted = true
            this.muteElement.classList.remove('dispNone')
            this.unmuteElement.classList.add('dispNone')
        })
    }

    setSwitchMusic()
    {
        this.nextMusic.addEventListener('click', () =>
        {
            this.audioElement.pause()
            this.audioElement.currentTime = 0
            if (currentMusic == musics.length - 1) {
                currentMusic = 0
            }
            else {
                currentMusic++
            }
            this.audioElement = musics[currentMusic].audio
            this.audioElement.play()
            this.setTextUpdate()
            this.timeLineUpdate()
        })
        
        this.previousMusic.addEventListener('click', () =>
        {
            this.audioElement.pause()
            this.audioElement.currentTime = 0
            if (currentMusic == 0) {
                currentMusic = musics.length - 1
            }
            else {
                currentMusic--
            }
            this.audioElement = musics[currentMusic].audio
            this.audioElement.play()
            this.setTextUpdate()
            this.timeLineUpdate()
        })
    }

    setTextUpdate()
    {
        this.titleSong.innerHTML = musics[currentMusic].title
        this.nameArtist.innerHTML = musics[currentMusic].artist
        console.log(this.imageArtist)
        this.imageArtist.setAttribute('src',musics[currentMusic].imageUrl)
    }

}

class Music
{
    constructor(title, artist, url, imageUrl)
    {
        this.title = title
        this.artist = artist
        this.audio = new Audio()
        this.audio.src = url
        this.imageUrl = imageUrl
    }

}

let currentMusic = 0
let musics = []

musics.push(new Music('Territory', 'The blaze', 'audio/Theblaze.mp3', 'images/artist-1.png'))
musics.push(new Music('Hit the road Jack', 'Ray Charles', 'audio/hit-the-road-jack.mp3', 'images/artist-2.png'))
musics.push(new Music('Mama', 'Swing', 'audio/mama.mp3', 'images/artist-3.png'))
musics.push(new Music('Where is my mind', 'The pixies', 'audio/where-is-my-mind.mp3', 'images/artist-4.png'))
musics.push(new Music('I need a dollar', 'Aloe Blacc', 'audio/i-need-a-dollar.mp3', 'images/artist-5.png'))

console.log(musics)




let player = new Player(document.querySelector('.container'))


console.log(player.audioElement.currentTime)

