import { useContext,useState,useRef } from "react";
import { db,storage  } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./styles/CreateEvent.css"; 
import avatar from "../assets/default-avatar.jpg";
import { AuthContext } from "../components/AuthProvider";



const CreateEvent = () => {
  
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Resmi Firebase Storage'a yükle
  const uploadImage = async (file) => {
    if (!file) return null;
    
    const storageRef = ref(storage, `event-images/${user.uid}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !location ) return alert("Tüm alanları doldurun!");
  
    setIsSubmitting(true);

    try {
      console.log(user)
      const userPhotoURL = user.photoURL || avatar;

      const imageUrl = image ? await uploadImage(image) : null;

      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
        location,
        imageUrl,
        participants: [], // Katılım listesi başlangıçta boş
        creator: { // Daha tutarlı bir yapı
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: userPhotoURL || avatar,
        },
        createdAt: new Date(),
      });
  
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setImage(null);
      setPreview("");
      alert("Etkinlik başarıyla oluşturuldu!");
    } catch (error) {
      console.error("Etkinlik oluşturma hatası:", error);
    }
    finally {
      setIsSubmitting(false);
    }
    
  };
  

  
  return (
    <div className="event-creation-form">
      <h2 className="">Etkinlik Oluştur</h2>
      <form onSubmit={handleSubmit}>
      <div className="image-upload-section">
          <label htmlFor="event-image" className="image-upload-label">
            {preview ? (
              <img src={preview} alt="Önizleme" className="image-preview" />
            ) : (
              <div className="image-placeholder">
                <span>+</span>
                <p>Kapak Resmi Ekle</p>
              </div>
            )}
          </label>
          <input
            id="event-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="image-input"
          />
        </div>

        <input
          type="text"
          placeholder="Etkinlik Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=""
        />
         <input
          type="text"
          placeholder="Ankara"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className=""
        />
        <textarea
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=""
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className=""
        />
       <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Kaydediliyor..." : "Etkinliği Kaydet"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
