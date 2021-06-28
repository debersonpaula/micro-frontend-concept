import React from 'react';
import { hot } from 'react-hot-loader';

function Header() {
  const menu = [
    { label: 'Home', link: '/home' },
    { label: 'About', link: '/about' },
  ];

  const path = window.location.pathname;

  return (
    <div>
      {menu.map((item, index) => (
        <a
          key={index}
          href={item.link}
          style={{
            textDecoration: path.search(item.link) > -1 ? 'underline' : 'none',
            color: 'blue',
            border: '1px solid black',
            padding: 8,
            margin: 4,
          }}
        >
          {item.label}
        </a>
      ))}
      <hr />
    </div>
  );
}

export default hot(module)(Header);
