const AreYouSureModal = ({ toggle, action }) => {
  const execAction = () => {
    action();
    toggle();
  }
  return (
    <div style={{ background: 'rgba(0,0,0,.6)' }} className='fixed h-screen w-full xs:p-2 md:p-20 flex justify-center items-center top-0'>
      <div className='xs:w-full md:w-2/4 xs:h-full md:h-fit bg-white rounded-md'>
        <div className='text-center text-xl font-bold p-5 pb-2'>Are you sure?</div>
        <div className='flex w-full justify-end p-4'>
          <button onClick={toggle} className="px-3 py-2 mt-3 rounded-md bg-red-400 text-white border-2 transition-all font-bold w-1/2 mr-2">No</button>
          <button onClick={execAction} className="px-3 py-2 mt-3 rounded-md text-white border-2 bg-black transition-all font-bold w-1/2 ml-2">Yes</button>
        </div>
      </div>
    </div>
  )
}

export default AreYouSureModal