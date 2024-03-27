const BlogCard = ({ blog }: any) => {
  console.log("Blog :", blog);
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
      <div className="p-6 pt-0"></div>
    </div>
  );
};

export default BlogCard;
