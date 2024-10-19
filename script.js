const url = "https://api.github.com/users/";
const get = (element) => document.getElementById(`${element}`);

const input = get("input");
const btn = get("btn");

btn.addEventListener("click", () => {
  if (input.value !== "") {
    getUserData(url + input.value);
    getUserRepos(url + input.value + "/repos");
  }
});
input.addEventListener("keydown",(e) => {
    console.log(e.key)
    if (e.key === "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
        getUserRepos(url + input.value + "/repos");
      }
    }
  },false);

async function getUserData(gitUrl) {
  try {
    let response = await fetch(gitUrl);
    let data = await response.json();
    updateProfile(data);

  } catch (error) {
    console.log(`this is ${error}`);
  }
}

function updateProfile(data) {
    console.log(data);
  const userImage = get("userImage");
  const name = get("name");
  const userName = get("username");
  const repos = get("repos");
  const followers = get("followers");
  const following = get("following");
  const profileBio = get("profileBio");

  userImage.src = data?.avatar_url;
  name.innerText = data?.name;
  userName.innerText = `@${data?.login}`;
  userName.href = data?.html_url;
  profileBio.innerText = data?.bio === null ? "This Profile has no Bio" : data?.bio;
  repos.innerText = data?.public_repos;
  repos.href = data?.repos_url;
  followers.innerText = data?.followers;
  followers.href = data?.followers_url;
  following.innerText = data?.following;
  following.href = data?.following_url;
}

async function getUserRepos(gitUrl) {
  try {
    let response = await fetch(gitUrl);
    let data = await response.json();
    updateRepos(data);
  } catch (error) {
    console.log(`this is ${error}`);
  }
}

function updateRepos(data){
    console.log(data);
    let repoContainer = get("repoContainer");
    repoContainer.innerHTML = "";
    data.forEach((repo) => {
        let repoDiv = document.createElement("div");
        repoDiv.className = "repo";
        repoDiv.innerText = repo.name;
        repoDiv.addEventListener("click",function(){
            window.open(repo.html_url,"_blank");
        })
        repoContainer.append(repoDiv);
    })
}

 getUserData(url + "shomik-das");
// getUserRepos(url + "shomik-das" + "/repos");
