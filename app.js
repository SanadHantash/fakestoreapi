class Product{
constructor(title,image,price){
    this.image = image;
    this.title = title;
    this.price = price;
}
}

function getdata() {
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(product=>{
        const productinfo = product.map(item => new Product (item.title,item.image,item.price));
        let cards = document.getElementById('card');
    productinfo.map(product=>{
            let card = document.createElement('div');
            card.innerHTML=
               ` <div class="card" style="width: 18rem;">
                <img src="${product.image}"  style="max-width:40px;">
                <div class="card-body ">
                    <h5>${product.title}</h5>
                    <p>${product.price}</p>
                    <span>
                    <img class="edit" src="media/icons8-edit-30.png">
                    <img class="trash" src="media/icons8-trash-24.png">
                    </span>
                    
                    `;
                    cards.appendChild(card);
    })
    })
}

getdata();

