import  { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Navbar from './Navbar';

function Addblog() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        getAllBlogs();
    }, []);

    const getAllBlogs = () => {
        const accessToken = localStorage.getItem("accessToken");
        fetch("http://localhost:8080/api/blog/getAll", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Response : ", data);
            setBlogData(data);
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
    }

    return (
       <>
        <Navbar/>
        <div className="  p-6 ">
    <h2 className="text-2xl text-lime-800 font-bold mb-4 font-bold tracking-wider text-center">
        All Blogs
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {(blogData === undefined || blogData.length === 0) ? (
            <div>No blogs</div>
        ) : (
            blogData.map((blog, id) => (
                <BlogCard blog={blog} key={id} />
            ))
        )}
    </div>
</div>
       
        </>
    );
}

export default Addblog;
