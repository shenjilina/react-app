import React from 'react';
import { Link } from 'react-router';
import './index.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/about">关于我们</Link>
        </li>
        <li>
          <Link to="/contact">联系我们</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;