import React from 'react';
import './index.less'


const Home: React.FC = () => {
  return (
    <div>
      <h1>首页</h1>
      <p className='custom-text'>欢迎来到首页</p>
      <div className='custom-div'>自定义文本</div>
    </div>
  );
};

export default Home;