import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gray-600 flex flex-col items-center justify-center text-white p-5">
      
      <div className="relative animate-bounce duration-[2000ms]">
        <h1 className="text-[120px] md:text-[180px] font-bold text-[#eab308] drop-shadow-[0_10px_10px_rgba(234,179,8,0.3)]">
          404
        </h1>
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-2xl md:text-3xl font-medium tracking-wide">Kuch toh gadbad hai!</h2>
        <p className="text-gray-400">Please go back this page not for you.</p>

        <button 
          onClick={() => navigate('/login')} 
          className="px-8 py-3 bg-[#eab308] text-[#0a192f] font-bold rounded-md hover:bg-white transition-all duration-300 shadow-lg shadow-yellow-500/20 active:scale-95"
        >
          GO TO LOGIN
        </button>
      </div>
    </div>
  )
}

export default PageNotFound;