import { assets } from '@/app/Assets/assets';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className='flex flex-col bg-slate-100'>
      <div className='px-2 sm:pl-14 py-3 border border-black'>
        <Image src={assets.logo} alt='Logo' width={120} />
      </div>
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
        <div className='w-[50%] sm:w-[80%] absolute right-0'>
          <Link href='/admin/addProduct' className='sidebar-link'>
            <Image src={assets.add_icon} alt='Add Blog Icon' width={28} />
            <p>Add blogs</p>
          </Link>
          <Link href='/admin/blogList' className='sidebar-link mt-5'>
            <Image src={assets.blog_icon} alt='Blog List Icon' width={28} />
            <p>Blog lists</p>
          </Link>
          <Link href='/admin/subscriptions' className='sidebar-link mt-5'>
            <Image src={assets.email_icon} alt='Subscriptions Icon' width={28} />
            <p>Subscriptions</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;