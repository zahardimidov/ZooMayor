import { useState } from 'react'

export function PhotoCard({ id }: { id: number }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  return (
    <div className="cursor-pointer z-0 min-w-[160px] w-[160px] aspect-[1/1.6] text-center bg-white rounded-lg flex items-center justify-center">
      {!selectedImage ? (
        <>
          <input
            className="hidden"
            type="file"
            id={`photo_${id}`}
            onChange={(event) => {
              if (event.target.files) setSelectedImage(event.target.files[0])
            }}
          />
          <label
            htmlFor={`photo_${id}`}
            className="underline text-center w-full h-full flex items-center justify-center cursor-pointer text-black/50"
          >
            добавьте изображение...
          </label>
        </>
      ) : (
        <img className="w-full h-full" onClick={() => setSelectedImage(null)} src={URL.createObjectURL(selectedImage)} />
      )}
    </div>
  )
}
