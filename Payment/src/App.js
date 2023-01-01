import './App.css';

function App() {
    console.log(productsA);
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
const productsA = [
    {
        name: "蛋糕1",
        price: 20,
        picture: "https://images.unsplash.com/photo-1612200394603-3c8d8b0f8c1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "蛋糕2",
        price: 20,
        picture: "https://images.unsplash.com/photo-1612200394603-3c8d8b0f8c1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "蛋糕3",
        price: 20,
        picture: "https://images.unsplash.com/photo-1612200394603-3c8d8b0f8c1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "蛋糕4",
        price: 20,
        picture: "https://images.unsplash.com/photo-1612200394603-3c8d8b0f8c1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "蛋糕5",
        price: 20,
        picture: "https://images.unsplash.com/photo-1612200394603-3c8d8b0f8c1f?ixid"
    }

]
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
                <input type="Submit" value="提交" />
        </div>
    )
}
//checkout
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
    let products = JSON.parse(localStorage.getItem("products"));
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

function findPrice(name) {
    for (let i = 0; i < productsA.length; i++) {
        if (productsA[i].name === name) {
            return productsA[i].price;
        }
    }
}
//function for caculating the total price of products
function totalPrice() {

    return total;

}


export default App;
