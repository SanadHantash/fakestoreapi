// class Product{
// constructor(title,image,price){
//     this.image = image;
//     this.title = title;
//     this.price = price;
// }
// }

// function getdata() {
//     fetch('https://fakestoreapi.com/products')
//     .then(res=>res.json())
//     .then(product=>{
//         const productinfo = product.map(item => new Product (item.title,item.image,item.price));
//         let cards = document.getElementById('card');
//     productinfo.map(product=>{
//             let card = document.createElement('div');
//             card.innerHTML=
//             ` <div class="card" style="width: 18rem;">
//                 <img src="${product.image}"  style="max-width:40px;">
//                 <div class="card-body ">
//                     <h5>${product.title}</h5>
//                     <p>${product.price}</p>
//                     `;
//                     cards.appendChild(card);
//     })
//     })
// }

// getdata();
//json-server
//post
let post = document.getElementById("post");

post.addEventListener("click",(e)=>{
    e.preventDefault();
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    const mypost = {
        title: title,
        content: content
    };
    fetch('http://localhost:3000/posts',{
        method:'POST',
    headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(mypost)
    }).then(response => response.json()) .then(data => console.log(data))
    
    
})

//get
class Post{
    constructor(id,title,content){
        this.id = id;
        this.title = title;
        this.content = content;
    }
    }
    
    function getdata() {
        fetch('http://localhost:3000/posts')
        .then(res=>res.json())
        .then(post=>{
            const postinfo = post.map(item => new Post (item.id,item.title,item.content));
            let cards = document.getElementById('card');
            postinfo.map(post=>{
                let card = document.createElement('div');
                card.innerHTML=`
                    <div class="card" style="width: 18rem;">
                    <div class="card-body ">
                        <h5>${post.title}</h5>
                        <p>${post.content}</p>
                        <span>
                        <button class="btn btn-outline-success update"  onclick="updatePost(${post.id})">update</button>
                        <button type="button" class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
                        `;
                        cards.appendChild(card);
        })
        })
    }
    
    getdata();
//Update
    function updatePost(postId) {

    const updatedTitle = prompt('Enter the Title:', '');
    const updatedContent = prompt('Enter the updated content:', '');

    if (updatedContent !== null) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:updatedTitle,
                content: updatedContent }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(updatedPost => {
                console.log("Post updated:", updatedPost);

                const postElement = document.getElementById(`post_${postId}`);
                if (postElement) {
                    const contentElement = postElement.querySelector('p');
                    if (contentElement) {
                        contentElement.textContent = updatedPost.content;
                    }
                }
            })
            .catch(error => console.error("Error updating post:", error));
    }
}

//Delete
    function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(deletedPost => {
            console.log("Post deleted:", deletedPost);
            // Optionally, remove the post element from the UI
            const postElement = document.getElementById(`post_${postId}`);
            if (postElement) {
                postElement.remove();
            }
        })
        .catch(error => console.error("Error deleting post:", error));
}

