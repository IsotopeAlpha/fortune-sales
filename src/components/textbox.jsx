import React from 'react'

export default function MyTextbox(props) {
  return (
    <div>
        <div className='font-bold'>{props.label}</div>
        <input disabled={props.disabled} type={props.type} placeholder={props.placeholder} className={`bg-[#f8f5f0] placeholder-black ${props.width} h-[40px] px-2 rounded-[4px]`} onChange={props.onChange} defaultValue={props.defaultValue}/>
    </div>
  )
}
