const urlPrefix = 'https://jsonplaceholder.typicode.com/';

// prefix önune eklenen

const requestUrl =  urlPrefix + 'posts';
const requestUsersUrl = urlPrefix +'users';

let posts = [];
let users = [];

fetch(requestUrl)
    .then(response => response.json())
    .then(json => {
        posts = json
       
     fetch(requestUsersUrl)
        .then(response => response.json())
        .then(json => {
            users = json;
        renderPosts();
        }).catch(err => {
             showLoadError();
         });
});
  
function renderPosts() {
    for(const post of posts) {
        //   console.log(post.id);
    }
}
    //  function showloadError() {
    //      alert("404")
    //  }

    // setTimeout(()=> {
    //     console.log("merhaba");

    // }, 500)

async function loadData(callback) {
    posts = await fetch(requestUrl).then(x => x.json());
    users = await fetch(requestUsersUrl).then(x => x.json());


    // render()

    callback.apply();
}


// birden fazla fetch yazıcaksan  callback kullan;


const container = document.querySelector(".container");
function render() {
    // yükleniyor
    container.innerHTML  = "";

    for(let i = 0; i < 20; i++ ) {
        const currPost = posts[i];
        const writer = users.find(x => x.id === currPost.userId)
        container.innerHTML += `
        <div class= "post">
            <h3><a postId="${currPost.id}" href="/${currPost.id}">${currPost.title}</a></h3>
            <h4> User: ${writer.name}</h4>
        </div>
        <hr>
        `;
    }
    bindPostsClikcs();
}

function renderDetailPage(postDetail, postComments) {
    const comments = postComments.map(x => `<div class="comment"><h5>${x.name}</h5><p>${x.body}</p></div>`);
    container.innerHTML = `
    <h1>${postDetail.title}</h1>
    <p>${postDetail.body}</p>
    <div class ="comments">${comments.join("")}</div>
    `;
}

async function loadDetailPage(postId) {
    const postDetail = await fetch(urlPrefix + "posts/" + postId).then(x => x.json());
   const postComments = await fetch(`${urlPrefix}posts/${postId}/comments`);
    renderDetailPage(postDetail, postComments);
}


function handleHomePageClicks(e){
    e.preventDefault();
    loadDetailPage(this.dataset.postid);
   
}

function bindPostsClikcs() {
    document.querySelectorAll(".posts h3 a")
    .forEach(x => x.addEventListener("click", handleHomePageClicks))

}

loadData(function() {
    // console.log("hepsini yükledim");
    render()
})