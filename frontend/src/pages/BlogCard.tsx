const BlogCard = ({ blog }: any) => {
  console.log("Blog :", blog);
  return (
    <div className="relative flex flex-col mt-6 bg-lime-100 shadow-md rounded-xl w-96">
    <div className="p-6">
      <h5 className="block  text-xl font-semibold leading-snug tracking-normal text-lime-800">
        {blog.title}
      </h5>
     
    </div>
    <div className="flex justify-between items-center p-6 pt-0 bg-lime-700 rounded-b-xl">
    <p className="block text-base font-light leading-relaxed text-white">
        {blog.body}
      </p>
    </div>
  </div>
  
  
  );
};

export default BlogCard;
