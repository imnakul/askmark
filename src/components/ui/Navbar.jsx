function Navbar({ QR, setQR }) {
   return (
      <div className='navbar bg-white/5 shadow-sm max-w-7xl w-full mx-auto rounded-md flex items-center justify-between'>
         <div className='flex items-center gap-2'>
            <img src='/logo.jpg' alt='logo' className='size-12' />
            <span
               className='font-bold text-black dark:text-white text-xl'
               onClick={() => {
                  router.push('/')
               }}
            >
               AskMark
            </span>
         </div>

         <div className='flex items-center gap-4 justify-center px-2 py-1'>
            <div className='avatar'>
               <div className='ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2'>
                  <img src='https://img.daisyui.com/images/profile/demo/spiderperson@192.webp' />
               </div>
            </div>
            <button onClick={() => setQR(!QR)} className=''>
               <img
                  src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnplZnJ5ZWZmc3ZlaWg2bGU5eGZ0N2JzMDVoczk3bnNqMjJ0MXd6NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif'
                  className='size-10 cursor-pointer'
               />
            </button>
         </div>
      </div>
   )
}
export default Navbar
