const About = () => {
  return (
    <div className="p-6 max-w-2xl">
      <div className="text-3xl tracking-wide font-semibold text-blue-400 mb-4">
        About this project
      </div>
      <p className="text-gray-600 leading-relaxed mb-3">
        A small shopping cart demo built with React, TypeScript and Tailwind
        CSS. Product data comes from the{" "}
        <a
          href="https://dummyjson.com"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          DummyJSON
        </a>{" "}
        API.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        <li>Search and browse products fetched live from an external API</li>
        <li>Cart state managed with React Context + localStorage persistence</li>
        <li>
          Product data fetching/caching handled with TanStack Query, including
          per-item caching for the cart drawer to avoid redundant requests
        </li>
      </ul>
    </div>
  );
};

export default About;
