// HomePage.jsx
import React from 'react';
import './HomePage.css';

function HomePage() {
    const handleShopClick = () => {
        alert('Please log in first.');
    };

    return (
        <div className="HomePage">
            <nav className="navbar">
                <div className="navbar-left">
                    <a href="/login"><button className="login-button" type="submit">Login</button></a>
                </div>
                <div className="navbar-right">
                    <a href="#">About</a>
                    <a href="#" onClick={handleShopClick}>Shop</a>
                    <a href="#">Contact us</a>
                </div>
            </nav>
            <h1>Welcome to Our Website!</h1>
            <p>Content of your homepage goes here...</p>
        </div>
    );
}

export default HomePage;


// // HomePage.jsx
// import React from 'react';
// import { useHistory } from 'react-router-dom'; // Import useHistory hook
// import './HomePage.css';

// function HomePage() {
//     const history = useHistory(); // Initialize useHistory

//     const handleShopClick = () => {
//         // Redirect to the login page when the login button is clicked
//         history.push('/login');
//     };

//     return (
//         <div className="HomePage">
//             <nav className="navbar">
//                 <div className="navbar-left">
//                     {/* Use onClick event to call handleShopClick function
//                     <button className="login-button" onClick={handleShopClick}>Login</button> */}
//                     <a href="/login"><button className="login-button" type="submit">Login</button></a>
//                 </div>
//                 <div className="navbar-right">
//                     <a href="#">About</a>
//                     <a href="#" onClick={handleShopClick}>Shop</a>
//                     <a href="#">Contact us</a>
//                 </div>
//             </nav>
//             <h1>Welcome to Our Website!</h1>
//             <p>Content of your homepage goes here...</p>
//         </div>
//     );
// }

// export default HomePage;

