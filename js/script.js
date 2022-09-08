//Targets the div where profile information will appear
const overview = document.querySelector(".overview");
//GitHub Username
const username = "Becky-K"
//Targets the ul
const reposList = document.querySelector("ul");
//Selects section where repos appear
const repoSection = document.querySelector(".repos")
//Selects to section where the repo information appears
const repoData = document.querySelector(".repo-data")
//Back to repo button
const returnButton = document.querySelector("button");
//Input search bar
const filterInput = document.querySelector("input");



//function to fetch data from github
const userInfoFetch = async function(){
    const result = await fetch(`https://api.github.com/users/${username}`);
    const data = await result.json();
    displayUserInfo(data);
};

userInfoFetch();

//function to display user data and repos
const displayUserInfo = function(data){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`
  ;
  overview.append(userInfo);
  reposFetch()

};

//Async function to fetch repos from GH profile
const reposFetch = async function(){
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
    const repos = await response.json(); 
    repoDisplay(repos) 
};

//function to display each repo
const repoDisplay = function(repos){
    filterInput.classList.remove("hide");
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `${repo.name}`;
        reposList.append(li);
    }
};

//Event listener for click on titles of repos
reposList.addEventListener("click", function (e) {
    if (e.target.matches("li")){
        const repoName = e.target.innerText
        repoInfo(repoName);
    };
});

//function for fetching specific repo info
const repoInfo = async function(repoName){
    const specificRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const specificRepoInfo = await specificRepo.json();
    console.log(specificRepoInfo);
    //Fetch languages
    const fetchLanguages = await fetch(specificRepoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //Languages array and loop
    const languages = [];
    for (const lang in languageData){
        languages.push(lang);
    };
    repoInfoDisplay(specificRepoInfo, languages);
};

//Displays div with repo info
const repoInfoDisplay = function (specificRepoInfo, languages){
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${specificRepoInfo.name}</h3>
    <p>Description: ${specificRepoInfo.description}</p>
    <p>Default Branch: ${specificRepoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${specificRepoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    returnButton.classList.remove("hide");
};

//Click event for return button
returnButton.addEventListener("click", function(){
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    returnButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
    const inputValue = filterInput.value;
    const allRepos = document.querySelectorAll(".repo");
    const lowerCaseInput = inputValue.toLowerCase();
    for (repo of allRepos){
        const lcRepoTitle = repo.innerText.toLowerCase();
        if (lcRepoTitle.includes(lowerCaseInput)){
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        };
    }
});

