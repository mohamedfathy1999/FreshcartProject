import React from 'react';
import style from './Footer.module.css';
import imge from '../../assets/img/Amazon_Pay_logo.svg.png';
import imge2 from '../../assets/img/American-Express-PNG-Image.png';
import imge3 from '../../assets/img/png-clipart-logo-debit-mastercard-graphics-debit-card-mastercard-text-orange.png';
import imge4 from '../../assets/img/paypal_PNG5.png';
import imge5 from '../../assets/img/appstore-btn.svg';
import imge6 from '../../assets/img/googleplay-btn.svg';
import imge7 from '../../assets/img/visa.svg';

export default function Footer() {
  return <>
  
   
  <footer className="bg-gray-200 pt-12 pb-4">
      <div className="flex justify-center items-center w-11/12 mx-auto">
        <div className="p-9 w-full">
          <h3 className="text-2xl font-bold mb-2">Get the FreshCart app</h3>
          <p className="mb-6 text-gray-600"> We will send you a link, open it on your phone to download the app.</p>
          <form className="flex items-center mb-4">
            <input type="email" className="flex-grow p-2 border border-gray-300 rounded-md"  placeholder="Email..." />
            <button type="submit" className="bg-green-500 hover:bg-green-900 text-white px-6 py-2 ml-2 rounded-md"> Share App Link</button>
          </form>
          <div className="flex justify-between items-center border-y-2 py-8 mt-4">
            <div className="flex items-center">
              <strong className="mr-4 text-gray-700">Payment Partners</strong>
              <div className="flex space-x-4">
                <img src={imge} alt="Amazon Pay" className="h-6" />
                <img src={imge2} alt="American Express" className="h-6" />
                <img src={imge3} alt="MasterCard" className="h-6" />
                <img src={imge4} alt="PayPal" className="h-6" />
                <img src={imge7} alt="Visa" className="h-6 w-full" />
              </div>
            </div>
            <div className="flex items-center">
              <strong className="mr-4 text-gray-700">Get deliveries with FreshCart</strong>
              <div className="flex space-x-4">
                <img src={imge5} alt="App Store" className="h-12 w-full" />
                <img src={imge6} alt="Google Play" className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  
  
  </>
   
  
}
