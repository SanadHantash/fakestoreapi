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
                        <button class="btn btn-outline-success update" data-id = "${post.id}" type="submit">update</button>
                        <button type="button" class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
                        `;
                        cards.appendChild(card);
        })
        })
    }
    
    getdata();


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


// card.addEventListener("click", function (e) {
//     if (e.target.classList.contains("remove")) {
//         const postId = e.target.getAttribute("data-id");

//         fetch('http://localhost:3000/posts/${postId}', {
//             method: "DELETE",
//         })
//         .then(() => fetchPosts())
//         .catch((error) => console.error("Error:", error));
//     }});

