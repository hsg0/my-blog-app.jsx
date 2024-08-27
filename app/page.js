'use client'

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/app/Components/Header';
import BlogList from './Components/BlogList';
import Footer from './Components/Footer';

export default function Home() {
  return (
    <>
      <ToastContainer theme='dark' />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
