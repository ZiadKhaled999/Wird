import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { User, Clock } from 'lucide-react';

interface PostPreviewProps {
  verseText: string;
  reference: string;
  username: string;
  postTime: string;
  postUrl?: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  verseText,
  reference,
  username,
  postTime,
  postUrl,
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="w-full h-60 bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                fill="currentColor"
                d="M39.4,-65.3C53.5,-60.1,68.8,-53.1,76.1,-41.2C83.4,-29.2,82.8,-12.1,79.1,3.2C75.5,18.5,68.8,32.1,60.3,45C51.8,58,41.5,70.3,28.5,74.8C15.4,79.3,-0.4,76,-15.6,71.5C-30.8,67,-45.4,61.4,-55.6,51.5C-65.7,41.5,-71.4,27.2,-73.6,12.5C-75.7,-2.2,-74.3,-17.4,-69.6,-32.7C-64.8,-48,-56.7,-63.4,-44.4,-69.8C-32.1,-76.3,-15.5,-73.8,-0.7,-72.6C14.1,-71.4,25.3,-70.6,39.4,-65.3Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <p className="text-3xl mb-4 leading-relaxed font-amiri text-right" dir="rtl">
              {verseText}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {reference}
            </p>
          </div>
        </div>
      </div>
      <CardFooter className="bg-neutral-50 dark:bg-neutral-800/70 p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
              <User className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {username}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {postTime}
              </p>
            </div>
          </div>
          {postUrl && (
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-500 hover:text-secondary-600 flex items-center text-sm"
            >
              <span>View Post</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostPreview;
