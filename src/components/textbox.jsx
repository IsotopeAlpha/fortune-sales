import React from 'react'

export default function MyTextbox(props) {
  return (
    <div className='flex flex-col gap-2 w-full'>
        <label className='text-sm font-semibold text-gray-700'>{props.label}</label>
        <input 
          disabled={props.disabled} 
          type={props.type} 
          placeholder={props.placeholder} 
          className={`${props.width || 'w-full'} h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed`}
          onChange={props.onChange} 
          defaultValue={props.defaultValue}
        />
    </div>
  )
}
