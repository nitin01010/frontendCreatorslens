import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Swipper = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [posts, setPosts] = useState([]); // State to hold API data

  // Fetch the data from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://api.creatorslens.in/api/v1/blogs/getAllPosts");
        setPosts(response.data.posts); // Assuming posts contain images
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="h-[200px] md:h-[300px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper rounded-xl"
      >
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <SwiperSlide key={index}>
              <img src={post.imageUrl} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>Loading...</SwiperSlide>
        )}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Swipper;
