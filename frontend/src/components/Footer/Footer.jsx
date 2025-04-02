import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
 return (
   <div className='footer' id='footer'>
     <hr />
     <div className='footer-content'>
       <div className='footer-section-left'>
         <img src={assets.logo} alt='' />
         <p>
           {' '}
           TLO FOOD CHAIN (Top Level Organisation) has been crafting handcrafted momos since 2022. We cater to HORECA distributors, QSR chains, B2B brands, and B2C customers, delivering high-quality products. Operating under the registered name TLO FOOD CHAIN, we are GST-compliant (GST No. 07AJHPB2058B1ZU). For inquiries, contact us at 8130855711 (call/WhatsApp) or email info@tlofoodchain.com. We focus on quality, innovation and expanding our reach.
         </p>
         <div className='footer-social-icons'>
           <img src={assets.facebook_icon} alt='' />
           <img src={assets.twitter_icon} alt='' />
           <img src={assets.linkedin_icon} alt='' />
         </div>
       </div>
       <div className='footer-content-center'>
         <h2>Company</h2>
         <ul>
           <li>Home</li>
           <li>About us</li>
           <li>Delivery</li>
           <li>Privacy Policy</li>
         </ul>
       </div>
       <div className='footer-content-right'>
         <h2>GET IN TOUCH</h2>
         <ul>
           <li>8130855711 </li>
           <li>Info@tlofoodchain.com</li>
         </ul>
       </div>
     </div>
     <hr />
     <p className='footer-copyright'>
       Copyright 2024 @ TLOfoodChain.com - All Right Reserved.
       Powered  by @ MarketMinds Digital Solutions
     </p>
   </div>
 );
}

export default Footer;
