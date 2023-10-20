import { useState, useCallback , useEffect,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const[num,setNum]=useState(false)
  const[chara,setChara]= useState(false)
  const[pass,setPass]= useState("")

  const passwordref=useRef(null)

  const passGen = useCallback(()=>{
    let password= ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(num){
      str+= "01234567898"
    }
    if(chara){
      str+="@#{}"
    }

    for(let i = 1;i<=length;i++){
      let char =Math.floor (Math.random()*str.length+1)
      password += str.charAt(char)
    }

    setPass(password)


  },[length,num,chara,setPass])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(pass)
  },
  [pass])
 
   useEffect(()=>{
    passGen()
   },[length,num,chara,passGen])

  
  return (
    <>
      <div ><h1>test</h1>

      <input type="text"
       value={pass}
        placeholder='{password}' 
        ref={ passwordref}
        />
      <button
      onClick={copyPasswordToClipboard}>copy</button>
      </div>
      <input type="range" min={8} max={100} value={length}  
      onChange={(e)=>{setLength(e.target.value)}}/>
      <label>length:{length}</label>

      

      <input type="checkbox"
      defaultChecked={num}
      id="num1"
      onChange={() => setNum((prev) => !prev)}
      />
      <label htmlFor='num1'> Number</label>

      
      <input type="checkbox"
      defaultChecked={chara}
      id="char1"
      onChange={() => setChara((prev) => !prev)}
      />
      <label htmlFor='chara1'> character</label>
      

    </>
  )
}

export default App
