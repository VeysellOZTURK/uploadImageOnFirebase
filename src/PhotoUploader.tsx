import  { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const MAX_FILE_SIZE_MB = 5;

interface PhotoUploaderProps {
  onUploadComplete: (url: string) => void;
}

const PhotoUploader = ({ onUploadComplete }: PhotoUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      alert("Dosya seçilemedi.");
      return;
    }
    const selectedFile = files[0];

    if (!selectedFile) {
      alert("Lütfen bir dosya seçin.");
      return;
    }

    // Dosya türü kontrolü
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      alert("Sadece jpg, png, jpeg veya webp formatında fotoğraflar yüklenebilir.");
      return;
    }

    // Dosya boyut kontrolü
    if (selectedFile.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      alert(`Dosya boyutu ${MAX_FILE_SIZE_MB} MB'den büyük olamaz.`);
      return;
    }
    alert("Dosya seçildi: " + selectedFile.name);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Lütfen önce bir dosya seçin.");
        return;
      }
  
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file); // Yükleme işlemi
      const url = await getDownloadURL(storageRef); // Yüklenen dosyanın URL'sini alın
      console.log("Dosya başarıyla yüklendi:", url);
      onUploadComplete(url); // URL'yi üst bileşene gönder
    } catch (error) {
      if (error instanceof Error) {
        console.error("Yükleme sırasında bir hata oluştu:", error.message);
      } else {
        console.error("Yükleme sırasında bir hata oluştu:", error);
      }
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", width: "100%" }}>
      <h3>Fotoğraf Yükle</h3>
      <input type="file" accept="image/jpeg,image/png,image/jpg,image/webp" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Yükle
      </button>
    </div>
  );
};

export default PhotoUploader;
