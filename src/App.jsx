import { use, useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length,setLength]=useState(8);
  const [noAllow,setnoAllow]=useState(false);
  const [charAllow,setcharAllow]=useState(false);
  const [Password,setPassword]=useState(""); 

  const pawdref=useRef(null);
  const pwdGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (noAllow) {
      str+="0123456789"
    }
    if (charAllow) {
      str+="!@#$%^&*(){}[]~`"
    }
    for (let i = 1; i<=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
    }

    setPassword(pass)
  },[length,noAllow,charAllow,setPassword])

  const copypwdToclipboard=useCallback(()=>{
    pawdref.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    pwdGenerator()
  },[noAllow,charAllow,length,setPassword])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3 py-3'>Password Generator</h1>
      <div className='flex items-center rounded-lg overflow-hidden mb-4'>
  <input
    type="text"
    value={Password}
    className='w-full py-2 px-4 border-none outline-none my-5'
    placeholder='password'
    readOnly
    ref={pawdref}
  />
  <button onClick={copypwdToclipboard} className='bg-blue-700 text-white px-4 py-2 shrink-0'>
    copy
  </button>
</div>
<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
    <input 
    type="range"
    min={6}
    max={20}
    value={length}
    className='cursor-pointer'
    onChange={(e)=>{setLength(e.target.value)}}
    />
    <label>Length : {length}</label>
  </div>
  <div className='flex items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked={noAllow}
    id='numberInput'
    onChange={()=>{setnoAllow((prev)=>!prev)}} />
    <label htmlFor="">Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
    <input type="checkbox"
    defaultChecked={charAllow}
    id='charInput'
    onChange={()=>{setcharAllow((prev)=>!prev)}} />
    <label htmlFor="">Characters</label>
    </div>
    
</div>

     </div> 
    </>
  )
}

export default App
