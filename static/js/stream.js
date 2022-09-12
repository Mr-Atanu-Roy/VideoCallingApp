const APP_ID = "94b35c0c5d6249c3b458107d3b9d76d7";
const CHANNEL = sessionStorage.getItem("room");
const TOKEN = sessionStorage.getItem("token");

let username = sessionStorage.getItem("username");

let UID = sessionStorage.getItem("UID");

console.log(CHANNEL);

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let localTracks = [];
let remoteUsers = {};

let joinAndDisplayLocalStream = async () => {
  document.getElementById("CHANNEL").innerText = CHANNEL;

  client.on("user-published", handelUserJoined);
  client.on("user-left", handelUserLeft);

  try {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, UID);
  } catch (error) {
    console.error(error);
    window.open('/', '_self');
  }

  localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  let member = await createMember();

  let player = `
    <div class="video-container" id="user-container-${UID}">
        <div class="username" id="username"><span class="f-regular capitalize">${member.name}</span></div>
        <div class="video-player" id="user-${UID}">
        </div>
    </div>
    `;

  document.getElementById("video-streams").insertAdjacentHTML("beforeend", player);

  localTracks[1].play(`user-${UID}`);

  await client.publish([localTracks[0], localTracks[1]]);
};

//handel user joining
let handelUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user;
  await client.subscribe(user, mediaType);

  if (mediaType === "video") {
    let player = document.getElementById(`user-container-${user.uid}`);
    if (player != null) {
      player.remove();
    }

    let member = await getMember(user);

    player = `
    <div class="video-container" id="user-container-${user.uid}">
        <div class="username" id="username"><span class="f-regular capitalize">${member.name}</span></div>
        <div class="video-player" id="user-${user.uid}">
        </div>
    </div>
    `;

    document
      .getElementById("video-streams")
      .insertAdjacentHTML("beforeend", player);

    user.videoTrack.play(`user-${user.uid}`);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};

// handel user exit
let handelUserLeft = async (user) => {
  delete remoteUsers[user.uid];
  document.getElementById(`user-container-${user.uid}`).remove();
};

//hander user user end call
let leaveAndRemoveLocalStream = async () => {
  for (let i = 0; i < localTracks.length; i++) {
    localTracks[i].stop();
    localTracks[i].close();
  }
  await client.leave();
  sessionStorage.clear('room');
  sessionStorage.clear('token');
  sessionStorage.clear('UID');
  sessionStorage.clear('username');

  deleteMember();

  window.open("/", "_self");
};

//handel user mic
let toggleMic = async (e) => {
  if (localTracks[0].muted) {
    await localTracks[0].setMuted(false);
    document.getElementById("mic").style.background = "rgb(59, 63, 66)";
  } else {
    await localTracks[0].setMuted(true);
    document.getElementById("mic").style.background = "red";
  }
};

//handel user camera
let toggleCamera = async (e) => {
  if (localTracks[1].muted) {
    await localTracks[1].setMuted(false);
    document.getElementById("camera").style.background = "rgb(59, 63, 66)";
  } else {
    await localTracks[1].setMuted(true);
    document.getElementById("camera").style.background = "red";
  }
};

//handel room name copy
let roomNameCopy = async (e) => {
  // Copy the text inside the text field
  navigator.clipboard.writeText(CHANNEL);
  alert("Room ID Copied");
};

let createMember = async() => {
    let response = await fetch('/create_member/', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            'name':username,
            'room_name': CHANNEL,
            'UID': UID
        })
    });
    let member = await response.json();
    return member;
}

let getMember = async (user) => {
    let response = await fetch(`/get_member/?UID=${user.uid}&room_name=${CHANNEL}`);
    let member = await response.json();
    return member;
}

let deleteMember = async() => {
  let response = await fetch('/delete_member/', {
      method : 'POST',
      headers : {
          'Content-Type' : 'application/json',
      },
      body:JSON.stringify({
          'name':username,
          'room_name': CHANNEL,
          'UID': UID
      })
  });
  let member = await response.json();
  // return member;
}

joinAndDisplayLocalStream();

window.addEventListener('beforeunload', deleteMember);

document.getElementById("end-call").addEventListener("click",leaveAndRemoveLocalStream);
document.getElementById("camera").addEventListener("click", toggleCamera);
document.getElementById("mic").addEventListener("click", toggleMic);
document.getElementById("room-name-copy").addEventListener("click", roomNameCopy);