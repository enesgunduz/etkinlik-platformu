import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Parametreleri almak için useParams kullanıyoruz
import { doc, getDoc } from 'firebase/firestore';
import { eventsCollectionRef } from '../firebase';

const EventDetails = () => {
  const { id } = useParams(); // URL'den etkinlik ID'sini alıyoruz
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(eventsCollectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvent(docSnap.data());
      } else {
        console.log("Etkinlik bulunamadı!");
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div>Yükleniyor...</div>;

  return (
    <div className="container">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Tarih:</strong> {event.date}</p>
      <p><strong>Konum:</strong> {event.location}</p>
    </div>
  );
};

export default EventDetails;
