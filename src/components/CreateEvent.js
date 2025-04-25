import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateEvent = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !location ) return alert("Tüm alanları doldurun!");
  
    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
        location,
        participants: [], // Katılım listesi başlangıçta boş
        createdBy: user.displayName,
        profile:user.photoURL,
        createdAt: new Date(),
      });
  
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      alert("Etkinlik başarıyla oluşturuldu!");
    } catch (error) {
      console.error("Etkinlik oluşturma hatası:", error);
    }
  };
  

  
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Etkinlik Oluştur</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Etkinlik Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
         <input
          type="text"
          placeholder="Ankara"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Etkinliği Kaydet
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
