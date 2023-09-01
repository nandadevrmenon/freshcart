import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const socials = [
    { icon: <FaFacebook />, link: 'https://www.facebook.com/segun.oluwatyy' },
    { icon: <FaTwitter />, link: 'https://www.twitter.com/freshcart' },
    { icon: <FaInstagram />, link: 'https://www.instagram.com/_nandadev_/' },
    { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/nandadevrmenon/' },
    { icon: <FaGithub />, link: 'https://github.com/nandadevrmenon/freshcart' },
  ];

  const navs = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Login', path: '/login' },
    // { name: 'Cart', path: '/contact' },
  ];

  const footerStyle = {
    backgroundColor: '#44af69',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '3rem',
  };

  const iconStyle = {
    color: '#FFFFFF',
    margin: '0.5rem',
  };

  const columnStyle = {
    flexBasis: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: 'white',
    margin: '0.5rem',
    transition: 'color 0.3s ease-in-out',
  };

  return (
    <footer style={footerStyle}>
      <div style={columnStyle}>
        <h2>FreshCart</h2>
        <div>
          {socials.map((social) => (
            <a href={social.link} key={social.link}>
              <span style={iconStyle}>{social.icon}</span>
            </a>
          ))}
        </div>
      </div>
      <div style={columnStyle}>
        <h2>Navigation</h2>
        <div>
          {navs.map((nav) => (
            <a href={nav.path} key={nav.path} style={navLinkStyle}>
              {nav.name}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h2>About</h2>
        <p>
          Freshcart is an online grocery store that delivers fresh and organic
          products to your doorstep. We offer a wide range of fruits,
          vegetables, dairy, meat, and more. Order now and enjoy the convenience
          and quality of Freshcart.
        </p>
        <div>© 2023 Freshcart. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
