import React from "react";

const videos = [
  {
    id: 1,
    title: "React Tutorial for Beginners",
    channel: "CodeWithHemant",
    views: "1.2M views",
    time: "2 days ago",
    thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
  },
  {
    id: 2,
    title: "Learn Tailwind CSS in 10 Minutes",
    channel: "Tailwind Mastery",
    views: "845K views",
    time: "1 week ago",
    thumbnail: "https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg",
  },
  // Add more videos as needed...
];

function Homepage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-lg p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">YouTube</h2>
        <ul className="space-y-3 text-gray-700 font-medium">
          <li>Home</li>
          <li>Shorts</li>
          <li>Subscriptions</li>
          <hr />
          <li>Library</li>
          <li>History</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Nav */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-semibold">YouTube Clone</h1>
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded-md w-1/2"
          />
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </header>

        {/* Video Feed */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-sm">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="font-semibold text-sm">{video.title}</h3>
                <p className="text-xs text-gray-500">{video.channel}</p>
                <p className="text-xs text-gray-500">
                  {video.views} • {video.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
