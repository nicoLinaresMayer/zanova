export default function ProductGallery({
  images,
}: {
  images: string[];
}) {
  return (
    <div className="min-h-[70vh] bg-neutral-100 flex items-center justify-center">
      <img
        src={images[0]}
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
  );
}
