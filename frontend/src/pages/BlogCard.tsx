


const BlogCard = ({blog}:any) => {

    console.log("Blog :",blog)
  return (


<div className="relative flex flex-col mt-6 text-gray-700 bg-gradient-to-br from-lime-600 to-green-100 shadow-md rounded-xl w-96">
  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {blog.title}
    </h5>
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
     {blog.body}
    </p>
  </div>
  <div className="p-6 pt-0">
  </div>
</div>



    
/* <div className="bg-white p-8 rounded-md max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl shadow-lg">
      <h2 className="text-2xl text-lime-800 font-bold mb-4 font-bold tracking-wider">
        {blog.title}
      </h2>
      <p className="text-lime-800">
        {blog.body}
      </p>
    </div> */

  )
}

export default BlogCard;
