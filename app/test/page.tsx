'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ImageUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileMeta {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string; // Optional property for the file URL
  index: number;
  status: string;
}

interface Room {
  name: string;
}

export default function Home() {
  const [filesInput, setFilesInput] = useState<
    { file: File; meta: FileMeta }[]
  >([]);
  const [rooms, setRooms] = useState<Room[]>([
    { name: 'Room 101' },
    { name: 'Room 102' },
    { name: 'Room 103' },
  ]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file, index) => ({
        file, // Store the actual File object
        meta: {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          index: filesInput.length + index, // Correctly assigning the index based on the length of the current array and the position in the loop
          url: URL.createObjectURL(file),
          status: 'pending',
        },
      }));
      setFilesInput((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    filesInput.forEach(({ file }) => {
      // Append the actual File object
      formData.append('files', file);
    });
    formData.append('rooms', JSON.stringify(rooms));

    try {
      const result = await fetch('http://localhost:8000/image/array', {
        method: 'POST',
        body: formData,
      });

      const json = await result.json();

      console.log(json);
      if (json.data) {
        // Handle successful uploads
        const { successful, failed } = json.data;

        // Update the status of successful uploads
        setFilesInput((prevFiles) =>
          prevFiles.map((fileData) => {
            const isSuccess = successful.some(
              (fileResult: any) =>
                fileResult.displayName === fileData.meta.name &&
                fileResult.index === fileData.meta.index,
            );
            const isFailed = failed.some(
              (fileResult: any) =>
                fileResult.fileName === fileData.meta.name &&
                fileResult.index === fileData.meta.index,
            );
            return {
              ...fileData,
              meta: {
                ...fileData.meta,
                status: isSuccess
                  ? 'success'
                  : isFailed
                  ? 'failed'
                  : fileData.meta.status,
              },
            };
          }),
        );
      }
    } catch (error) {
      // Handle all files as failed if there's an error with the fetch
      setFilesInput((prevFiles) =>
        prevFiles.map((fileData) => ({
          ...fileData,
          meta: { ...fileData.meta, status: 'failed' },
        })),
      );
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <Button
          size="lg"
          className="bg-[#3A1B05] hover:bg-[#cf8d5d]"
          onClick={uploadImage}
        >
          Upload{' '}
        </Button>{' '}
        <input type="file" multiple onChange={handleFileUpload} />
        <div className="mt-4 ">
          {filesInput.length > 0 && (
            <ul>
              {filesInput.map(({ meta }, index) => (
                <li
                  className={`h-28 w-28 border-2 ${
                    meta.status === 'pending'
                      ? 'border-yellow-400'
                      : meta.status === 'success'
                      ? 'border-green-400'
                      : meta.status === 'failed'
                      ? 'border-red-400'
                      : ''
                  }`}
                  key={meta.index} // Use meta.index as the unique key
                >
                  {meta?.url ? (
                    <Image
                      src={meta?.url}
                      height={600}
                      width={600}
                      alt={meta?.name}
                    />
                  ) : (
                    <ImageUp className="w-12 h-12" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
