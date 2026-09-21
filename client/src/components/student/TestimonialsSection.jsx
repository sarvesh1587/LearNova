import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">What Our Students Say.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 max-w-5xl">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-xs text-left border border-gray-500/30 rounded-lg bg-white shadow-[0px_12px_15px_0px] shadow-black/5 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-500/10">
              <img
                className="h-9 w-9 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-sm font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-xs text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>

            {/* Body */}
            <div className="px-4 py-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-3.5 w-3.5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-3 leading-relaxed">
                {testimonial.feedback}
              </p>
            </div>
            <a href="#" className="text-blue-500 underline px-5 pb-6">
              Read More...
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
