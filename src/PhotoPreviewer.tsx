
interface PhotoPreviewerProps {
  imageUrl: string | null;
}

const PhotoPreviewer = ({ imageUrl }: PhotoPreviewerProps) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", width: "100%" }}>
      <h3>Yüklenen Fotoğraf</h3>
      {imageUrl ? (
        <img src={imageUrl} alt="Yüklenen Fotoğraf" style={{ width: "100%" }} />
      ) : (
        <p>Henüz bir fotoğraf yüklenmedi.</p>
      )}
    </div>
  );
};

export default PhotoPreviewer;
