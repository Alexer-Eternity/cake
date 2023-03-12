import './App.css';
import React, { useState, useEffect } from 'react';

//specify products to be an array

function App() {

    return (
        <div>
            <h1
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >蛋糕店</h1>

            <div className="grid-container">
                {show()}

            </div>
            <button id="checkout" onClick={checkout}>结账</button>
        </div>

    );
}



function show() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(
            "http://api.cake.shhzet.com/api/Product/GetList",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "pageIndex": 0,
                    "pageSize": 0
                })
            }
        )
            .then(response => response.json())
            .then(data => {
                const newProducts = data.models.map(model => ({
                    thumbnail: model.thumbnail,
                    name: model.name,
                    price: model.price,
                    category: model.category
                }));

                setProducts(newProducts);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
//store the list of products in to localstorage
    localStorage.setItem("products", JSON.stringify(products));

return (
        <div className="grid-container">
            {products.map(product => (
                <div key={product.name} className="grid-item">
                    <div className={product.category}>
                        <img src={product.thumbnail} width="100" height="100" alt="cake" />
                        <p className={"NP"}>
                            {product.name + "   " + product.price + "元"}
                            <input type="checkbox" id={product.name} />
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

}


function checkout() {
    let products = [];
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    checkboxes.forEach((checkbox) => {
        products.push(checkbox.id);
    })
    localStorage.setItem("CartProducts", JSON.stringify(products));


    window.location.href = "/payment"
}

export default App;
