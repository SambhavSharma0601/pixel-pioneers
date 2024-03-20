import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const currentSeller = useSelector((state) => state.seller.currentSeller);

  return (
    <header className='shadow-md w-full z-50 text-white' style={{
      background: 'linear-gradient(135deg, #000428, #004e92)'
    }}>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-red-100'>Our</span>
            <span style={{color:"rgb(211,246,234)"}}>Catalogue</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentSeller ? (
              <div className='flex gap-3'>
                <p>{currentSeller.Seller_Email}</p>
              </div>
            ) : (
              <li className='hover:underline'>
                <Link to='/signin'>Sign in</Link>
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
