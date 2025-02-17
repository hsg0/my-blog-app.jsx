'use client';
import { assets } from '@/app/Assets/assets';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '@/app/Components/Footer';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: {
          id: params.id,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
      setError('Failed to load blog data.');
      toast.error('Failed to load blog data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchBlogData();
    }
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    data && (
      <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
          <div className='flex justify-between items-center'>
            <Link href='/'>
              <Image src={assets.logo} width={180} alt='Company Logo' className='w-[130px] sm:w-auto' />
            </Link>
            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
              Get Started <Image src={assets.arrow} alt='Arrow Icon' />
            </button>
          </div>
          <div className='text-center my-24'>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
            <Image
              className='mx-auto mt-6 border border-white rounded-full'
              src={data.authorImg}
              width={60}
              height={60}
              alt={`Profile picture of ${data.author}`}
            />
            <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
          </div>
        </div>
        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
          <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt={data.title} />
          

          <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}} ></div>



          <div className='my-24'>
            <p className='text-black font-semibold my-4'>Share this article on social media</p>
            <div className='flex'>
              <Image src={assets.facebook_icon} width={50} alt='Facebook Icon' />
              <Image src={assets.twitter_icon} width={50} alt='Twitter Icon' />
              <Image src={assets.googleplus_icon} width={50} alt='Google Plus Icon' />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default page;