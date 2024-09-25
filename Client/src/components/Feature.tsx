import React from 'react';
import { BookOpen, Users, ChevronRight } from 'lucide-react';

const FeaturedCourses: React.FC = () => {
  const courses = [
    { title: "Web Development Bootcamp", students: "5,000+", duration: "12 weeks" },
    { title: "Data Science Fundamentals", students: "3,500+", duration: "10 weeks" },
    { title: "UX/UI Design Masterclass", students: "2,800+", duration: "8 weeks" },
    { title: "Machine Learning A-Z", students: "4,200+", duration: "14 weeks" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Featured Courses</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Learn from the Best
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our expert-led courses are designed to help you succeed in today's fast-paced world.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {courses.map((course, index) => (
              <div key={index} className="relative">
                <div className="absolute h-16 w-16 flex items-center justify-center rounded-md bg-blue-500 text-white">
                  <BookOpen className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="ml-20">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{course.title}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    <Users className="h-5 w-5 inline mr-1" /> {course.students} students
                  </p>
                  <p className="mt-1 text-base text-gray-500">
                    <ChevronRight className="h-5 w-5 inline mr-1" /> {course.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
