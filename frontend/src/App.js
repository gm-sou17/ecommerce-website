import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './componentes/Header';
import Footer from './componentes/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { FiMoon, FiSun } from 'react-icons/fi';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [cartProductCount,setCartProductCount] = useState(0)
  const [theme, setTheme] = useState(() => window.localStorage.getItem('gtsou-theme') || 'light')
  const isAuthPage = ['/login', '/sign-up', '/forgot-password'].includes(location.pathname)

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('gtsou-theme', theme)
  }, [theme])

  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
            fetchUserAddToCart,
            theme,
            toggleTheme
      }}>
        <ToastContainer 
          position='top-center'
        />
        {isAuthPage && (
          <button
            type='button'
            className='auth-theme-toggle'
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        )}
        
        {!isAuthPage && <Header/>}
        <main className={`min-h-[calc(100vh-120px)] ${isAuthPage ? '' : 'pt-16'}`}>
          <Outlet/>
        </main>
        {!isAuthPage && <Footer/>}
      </Context.Provider>
    </>
  );
}

export default App;