const namebox = document.getElementById("name-box");
namebox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = namebox.innerText;
    e.preventDefault();
    if (val !== "Your name") {
      window.localStorage.setItem("name", val);
      window.location.replace("/");
      return;
    }
    alert("Enter your name");
  }
});
