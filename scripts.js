// Get Main Variable
let searchInput = document.querySelector(".searchInput");
let button = document.querySelector(".searchButton");
let result = document.querySelector(".result");
let ul = document.querySelector("ul.repoList");

button.onclick = () => {
  getData();
};
// Get Data Function
function getData() {
  // The Input Value
  let inputValue = searchInput.value.trim();

  // Check If Input Value Is Empty Or Not
  if (!inputValue) {
    result.innerHTML = `<h3 class="msg">Input Field Can Not Be Empty</h3>`;
  } else {

    // The API URL
    let url = `https://api.github.com/users/${inputValue}/repos`;

    // Fetch Data From API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        // Check If There Is Data Or Not
        if (!data || data.length === 0) {
          result.innerHTML = `<h3 class="msg">Not Found Repositories</h3>`;
          return;
        }

        // Loop Through The Data
        data.forEach((repo) => {

          // Create List Item
          let li = document.createElement("li");

          // Create Main Div
          let mainDiv = document.createElement("div");
          mainDiv.className = "mainDiv";
          let mainDivText = document.createTextNode(repo.name);
          mainDiv.appendChild(mainDivText);

          // Create Visit Link
          let visit = document.createElement("a");
          let visitText = document.createTextNode("Visit");
          visit.appendChild(visitText);
          visit.href = `https://github.com/${inputValue}/${repo.name}`;
          visit.setAttribute("target", "_blank");

          // Create Stars Count
          let span = document.createElement("span");
          let spanText = document.createTextNode(repo.stargazers_count);
          let info = document.createElement("div");
          info.className = "info";

          // Append Elements To Page
          info.appendChild(span);
          info.appendChild(visit);
          span.appendChild(spanText);
          li.appendChild(mainDiv);
          li.appendChild(info);
          ul.appendChild(li);
        });
      });
  }
}
