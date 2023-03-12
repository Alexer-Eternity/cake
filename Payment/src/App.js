import './App.css';

function App() {
  return (
      <div className ="grid-container ">
            <div className="payment"  >
                {payment()}
            </div>
          <div className="cart">
                {checkout()}
          </div>
      </div>

  );
}
var total= 0;
//create payment and delivery form
function payment() {
    return (
        <div>
            <h2>支付输送信息</h2>
            <div className="form">
              <label>
                    姓名:</label> <input type="text" name="name" />
                </div>
<div className="form">
                <label>
                    地址:                 </label>
            <input type="text" name="address" /></div>
            <div className="form">
                    <label>
                        电话: </label> <input type="number" name="phone" />
                </div>
            <div className="form">

                <label>
                    电子邮件: </label> <input type="email" name="email" />

            </div>
            <div className="form">

            <label>
                    卡号:  </label><input type="number" name="cardNumber" />
            </div>
            <div className="form">
                <label>
                    到期日: </label> <input type="month" name="expiry" />
            </div>
            <div className="form">
                <label>
                    CVV:</label> <input type="number" name="cvv" />
            </div>
            <button onClick={submit}>提交</button>


        </div>
    )
}
function submit() {
    let products = JSON.parse(localStorage.getItem("products"));
    let cartProducts = JSON.parse(localStorage.getItem("CartProducts"));
    let name = document.getElementsByName("name")[0].value;
    let address = document.getElementsByName("address")[0].value;
    let email = document.getElementsByName("email")[0].value;

    let orderedProduct = products.find(product => product.name === cartProducts[0]);

    let order = {
        "product": {
            "id": orderedProduct.id,
            "name": orderedProduct.name,
            "price": orderedProduct.price,
            "thumbnail": orderedProduct.thumbnail,
           
        },
        "user": {
            "name": name,
            "mail": email
        },
        "address": address,
        "qty": cartProducts.length,
        "deliveryDate": new Date().toISOString(),
        "updateTime": new Date().toISOString(),
        "createdTime": new Date().toISOString()
    };
    fetch("http://api.cake.shhzet.com/api/Order/Add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        }
    )
        .then(response => response.json())
        .then(data => {
            if (data && data !== "") {
                console.log(data);
                alert("Order successful!");
            } else {
                throw new Error("Invalid data returned from API");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Error placing order!");
        });
}

function checkout() {
    return (
 <div>
     <h1>您的订单</h1>
    {show()}
    <span className="name">共计 </span> <span className="price"> {totalPrice()+"元"}</span>

 </div>

    )

}

function show() {
    let products = JSON.parse(localStorage.getItem("CartProducts"));

    if (products == null) {
        return <div>There is no product in the cart</div>

      } else{
        return (
            <div>
                {products.map((product) => {
                    total+=findPrice(product);
                    return (
                        <div>

                            <span className="name">{product}</span> <span className="price">{findPrice(product)+"元"}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function findPrice(product) {
    let products = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == product) {
            return products[i].price;
        }
    }
}
//function for caculating the total price of products
function totalPrice() {

    return total;

}


export default App;
