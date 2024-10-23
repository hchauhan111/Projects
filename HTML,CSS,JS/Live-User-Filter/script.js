const filter = document.getElementById("filter");
const resultEl = document.getElementById("result");

resultEl.innerHTML = '<div class="loading-spinner"></div>';

fetch("https://randomuser.me/api/?results=50")
  .then((res) => res.json())
  .then((data) => {
    resultEl.innerHTML = "";
    const results = data.results;
    results.forEach((user) => {
      const li = document.createElement("li");
      li.innerHTML = `<img src="${user.picture.large}" alt="${user.name.first}">
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>`;
      resultEl.appendChild(li);
    });
  });

filter.addEventListener("input", filterUser);

function filterUser() {
  Array.from(resultEl.children).forEach((user) => {
    if (
      !user.textContent.toLowerCase().includes(this.value.toLowerCase().trim())
    ) {
      user.classList.add("hide");
      user.style.opacity = 0;
    } else {
      user.classList.remove("hide");
      user.style.opacity = 1;
    }
  });
}
