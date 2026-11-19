const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxDpOy99iPsIUk_luw50hdG2B-Bb9KmtvlvjPiETdoyE49xwl0zPyD2QH4zeykkiNCX/exec";

document.getElementById("surveyForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const btn = document.getElementById("submitBtn");
  const successMsg = document.getElementById("successMsg");
  const errorMsg = document.getElementById("errorMsg");

  successMsg.style.display = "none";
  errorMsg.style.display = "none";

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => { data[key] = value; });
  data["timestamp"] = new Date().toLocaleString("ar-EG");

  btn.disabled = true;
  btn.textContent = "Sending... ⏳";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    successMsg.style.display = "block";
    this.reset();
  } catch (err) {
    errorMsg.style.display = "block";
  } finally {
    btn.disabled = false;
    btn.textContent = "Submit — إرسال ✅";
  }
});