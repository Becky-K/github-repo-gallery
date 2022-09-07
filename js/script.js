//Targets the div where profile information will appear
const overview = document.querySelector(".overview");
//GitHub Username
const username = "Becky-K"
//Targets the ul
const reposList = document.querySelector("ul");


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
  reposDisplay()

};

//Async function to fetch repos from GH profile
const reposDisplay = async function(){
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
    const repos = await response.json(); 
    repoInfo(repos) 
};

//function to display each repo
const repoInfo = function(repos){
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `${repo.name}`;
        reposList.append(li);
    }
};

