import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Demo Video</h3>
            <p className="text-gray-300">
              Watch how KidSafe helps schools and parents keep children safe
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Video content coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
