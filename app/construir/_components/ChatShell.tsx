"use client";
import { useState, useRef } from "react";

export default function ChatShell(){
 const [messages,setMessages]=useState([{role:"assistant",content:"VULCANO ONLINE"}])
 const [input,setInput]=useState("")
 const [status,setStatus]=useState("OK")
 const abortRef=useRef(null)

 async function send(){
  if(!input.trim())return
  const userMsg={role:"user",content:input}
  const next=[...messages,userMsg]

  setMessages(m=>[...m,userMsg,{role:"assistant",content:""}])
  setInput("")
  setStatus("RODANDO")

  abortRef.current?.abort?.()
  const ac=new AbortController()
  abortRef.current=ac

  const res=await fetch("/api/vulcano/chat",{
   method:"POST",
   headers:{ "content-type":"application/json" },
   body:JSON.stringify({messages:next}),
   signal:ac.signal
  })

  const reader=res.body.getReader()
  const dec=new TextDecoder()
  let buf=""

  while(true){
   const {value,done}=await reader.read()
   if(done)break
   buf+=dec.decode(value)
   setMessages(m=>{
    const copy=[...m]
    copy[copy.length-1]={role:"assistant",content:buf}
    return copy
   })
  }

  setStatus("OK")
 }

 return(
  <main className="p-6 max-w-3xl mx-auto">
   <h1 className="text-2xl font-bold mb-4">VULCANO</h1>
   <div className="mb-4 text-sm">STATUS: {status}</div>

   <div className="space-y-2 mb-4">
    {messages.map((m,i)=>(
     <div key={i} className="border p-2 rounded">
      <b>{m.role}</b>
      <div>{m.content}</div>
     </div>
    ))}
   </div>

   <div className="flex gap-2">
    <input
     className="border px-3 py-2 w-full"
     value={input}
     onChange={e=>setInput(e.target.value)}
     onKeyDown={e=>e.key==="Enter"&&send()}
    />
    <button onClick={send} className="border px-4">Enviar</button>
   </div>
  </main>
 )
}
