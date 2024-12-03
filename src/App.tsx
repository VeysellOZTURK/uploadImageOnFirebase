import  { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import PhotoPreviewer from "./PhotoPreviewer";


const App = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadComplete = (url: string) => {
    setImageUrl(url); // Yüklenen fotoğrafın URL'sini al
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
      <div style={{ width: "45%", marginRight: "40px" }}>
        <PhotoUploader onUploadComplete={handleUploadComplete} />
      </div>
      <div style={{ width: "45%" }}>
        <PhotoPreviewer imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default App;