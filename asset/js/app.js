const IP = "localhost"; //ex_ip
const form = document.getElementById("form");
const input = document.getElementById("text-input");
const username = window.localStorage.getItem("name");
if (!username) window.location.replace("/login.html");
const socket = io.connect("ws://" + IP + ":8080", {
  query: "username=" + username,
});

input.onkeypress = () => {
  socket.emit("typing", username);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
socket.on("message", (msg) => {
  console.log(msg.id);
  addMessage(msg);
});

document.getElementById("send").onclick = () => {
  const input = document.querySelector("input");
  const text = input.value;
  input.value = "";
  addMessage({ user: "", msg: text });
  socket.send({ msg: text });
};

const addMessage = (msg) => {
  const liMess = document.createElement("li");
  const userDisp = msg.user ? `<b>${msg.user}:</b>` : "";
  liMess.innerHTML = `${userDisp} ${msg.msg}`;
  if (msg.user === "") liMess.classList = "self";
  document.getElementById("chat-box").appendChild(liMess);
};
