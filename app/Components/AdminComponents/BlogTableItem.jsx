import { assets } from '@/app/Assets/assets';
import React from 'react';
import Image from 'next/image';

const BlogTableItem = React.memo(({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  const blogDate = new Date(date); // Minor change in naming convention for clarity

  const handleDeleteClick = () => {
    deleteBlog(mongoId);
  };

  return (
    <tr className='bg-white border-b'>
      <th
        scope='row'
        className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
      >
        <Image
          width={40}
          height={40}
          src={authorImg || assets.profile_icon} // Simplified ternary operation
          alt={author ? `Profile picture of ${author}` : 'Default profile icon'}
          onError={(e) => (e.target.src = assets.profile_icon)} // Error handling for image load failure
        />
        <p>{author || 'No author'}</p> {/* Simplified conditional rendering */}
      </th>
      <td className='px-6 py-4'>
        {title || 'No title'}
      </td>
      <td className='px-6 py-4'>
        {blogDate.toDateString()}
      </td>
      <td
        onClick={handleDeleteClick}
        className='px-6 py-4 cursor-pointer text-red-600 hover:underline'
        role="button"
        aria-label={`Delete blog titled ${title}`}
      >
        x
      </td>
    </tr>
  );
});

export default BlogTableItem;