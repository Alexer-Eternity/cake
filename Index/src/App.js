import './App.css';

function App() {
  return (
      <div>
        <h1
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'}}
        >蛋糕店</h1>

        <div className="grid-container">
            {show()}

          </div>
            <button id = "checkout" onClick={checkout}>结账</button>
      </div>

  );
}
//create a array of products objects with price, picture and name
const products = [
    {
        name: "蛋糕1",
        price: 20,
        picture: "https://i.pinimg.com/600x/0e/11/1d/0e111d11dd274641805cdb52381b4b78.jpg"
    },
    {
        name: "蛋糕2",
        price: 20,
        picture: "https://i.pinimg.com/736x/ba/2f/ab/ba2fabaee801d760b40bc5ec8fb7b22f.jpg"
    },
    {
        name: "蛋糕3",
        price: 20,
        picture: "https://i.pinimg.com/236x/6a/ed/0e/6aed0e681f0d2e5a23a4a0a30eca3d27.jpg"
    },
    {
        name: "蛋糕4",
        price: 20,
        picture: "https://i.pinimg.com/236x/82/07/2b/82072b758c211de941d1bfbd48c4fb94--christmas-baking-christmas-treats.jpg"
    },
    {
        name: "蛋糕5",
        price: 20,
        picture: "https://i.pinimg.com/236x/6a/ed/0e/6aed0e681f0d2e5a23a4a0a30eca3d27.jpg"
    }

    ]
function show() {
    return products.map((product) => {
        return (
            <div className="grid-item">
                <img src={product.picture} width = "100" height = "100" alt="cake" />

                <div className={"NP"}>{product.name+"   "+ product.price+"元"} <input type="checkbox" id={product.name} /></div>

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
