let currntsong=new Audio();
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
       if (element.href.endsWith(".mp3")) {
    const splitPath = element.href.includes("/songs/") 
        ? element.href.split("/songs/")[1] 
        : element.href.split("/").pop(); // Fallback: Extract the file name only
    songs.push(splitPath);
}


    }
    return songs
}

const playMusic=(track)=>{
//let audio=new Audio("/songs/"+track)
currntsong.src="/songs/"+track;
currntsong.play()
play.src="pause.svg"
}





async function main() {
    
    let songs = await getSongs();
    console.log(songs);
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + ` <li><img class="invert" src="music.svg" alt="">
                            <div class="info"  >
                                <div> ${song.replaceAll("20%", " ")}</div>
                                </div> 
                                <div >
                                priyanshu
                                </div>
                                </div>
                                <div class="playnow">
                                <span>playnow</span> 
                              <img class="invert" src= "play.svg" alt="">
                            </div>
                          </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim()) 
        })

    })
  play.addEventListener("click",()=>{
    if(currntsong.paused)
    {
        currntsong.play()
        play.src="pause.svg";
    }
    else
    {
        currntsong.pause()
        play.src="play.svg";
    }
  })


}
main()
