import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const str: string = 'ABC'
  const handleStr = <T,>(params: T) => {
    console.log(params)
  }
  const htmlstr = '<p><b style="color:red">woshi123</b></p>'

  const list = ['123', '456', '789']
  return (
    <>
      <p data-index={str} className={`${str}-1`} onClick={() => handleStr(str)}>{str}</p>
      <p dangerouslySetInnerHTML={{ __html: htmlstr }}></p>
      <ul>
        {
          list.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </>
  )
}

export default App
