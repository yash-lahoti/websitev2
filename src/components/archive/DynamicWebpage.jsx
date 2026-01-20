import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const DynamicWebpage = ({ article, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      {/* Modal Container */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-10 max-w-4xl w-full relative overflow-y-auto max-h-[85vh] mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Accessible Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Article Header */}
        <div className="mb-8">
          <h2 id="modal-title" className="text-4xl text-gray-900 font-bold mb-2">{article.header?.title}</h2>
          <h3 className="text-lg font-semibold text-gray-500 mb-1">{article.header?.subtitle}</h3>
          <p className="text-sm text-gray-500">{article.header?.author} - {article.header?.date}</p>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h3 className="text-xl text-quart font-semibold">Main Content</h3>
          <p className="text-gray-700 mt-2">{article.mainContent?.description}</p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            {article.mainContent?.takeaways?.map((point, idx) => (
              <li key={idx} className="text-gray-600">{point}</li>
            ))}
          </ul>
        </div>

        {/* Statistics */}
        {article.statistics && (
          <div className="mb-8">
            <h3 className="text-xl text-quart font-semibold">Statistics</h3>
            {article.statistics.map((stat, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-gray-700">
                  <strong>{stat.title}:</strong> {stat.value} - {stat.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs for Content Sections */}
        {article.contentSections && (
          <div className="mb-8">
            <h3 className="text-xl text-quart font-semibold mb-3">Content Sections</h3>
            <div className="flex space-x-4 border-b border-gray-300 mb-4 pb-2">
              {article.contentSections.map((section, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 font-semibold transition ${
                    selectedTab === idx ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
                  }`}
                  onClick={() => setSelectedTab(idx)}
                >
                  {section.heading}
                </button>
              ))}
            </div>
            <div className="p-5 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
              {article.contentSections[selectedTab]?.paragraphs.map((para, idx) => (
                <ReactMarkdown key={idx} className="text-gray-600 mb-3">{para}</ReactMarkdown>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {article.references && (
          <div className="mb-8">
            <h3 className="text-xl text-quart font-semibold">References</h3>
            <ul className="list-disc list-inside mt-4 space-y-2">
              {article.references.map((ref, idx) => (
                <li key={idx}>
                  <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {ref.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Image Gallery */}
        {article.images && article.images.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl text-quart font-semibold mb-3">Project Figures</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {article.images.map((image, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={image.url}
                    alt={image.alt || `Image ${idx + 1}`}
                    className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-105"
                  />
                  {image.alt && (
                    <p className="mt-2 text-sm text-gray-500 text-center">{image.alt}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DynamicWebpage;
