import './App.css';
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
    var products = [];

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
    ).then((response) => {
            return response.json();
        }
    ).then((data) => {


            for (let i = 0; i < data.models.length; i++) {

                products.push({
                    thumbnail: data.models[i].thumbnail,
                    name: data.models[i].name,
                    price: data.models[i].price,
                    category: data.models[i].category

                })

            }
            console.log(products);

        }
    ).catch((error) => {
            console.log(error);
        }
    );
    console.log(products);

     return products.forEach((product) => {
                    return (
                        <div className="grid-item">

                        <div className={product.category}>
                            <img src={product.thumbnail} width="100" height="100" alt="cake"/>

                            <p className={"NP"}>{product.name + "   " + product.price + "元"} <input type="checkbox" id={product.name}/></p>
                        </div>
                        </div>

                    )
                })

}

function checkout() {
    let products = [];
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    checkboxes.forEach((checkbox) => {
        products.push(checkbox.id);
    })
    localStorage.setItem("products", JSON.stringify(products));


    window.location.href = "/payment"
}

export default App;
