import React from "react";
import { useState, useEffect } from "react";
import "./styles/Eventcard.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot, collection ,arrayUnion } from "firebase/firestore";

const EventCard = ({ event,user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleJoinEvent = async (eventId) => {
    const eventRef = doc(db, "events", eventId);

    const participant = {
      uid: user.uid,
      photoURL: user.photoURL,
    };
    
    try {
      await updateDoc(eventRef, {
        participants: arrayUnion(participant),
      });

      alert("Etkinliğe katıldınız!");
    } catch (error) {
      console.error("Katılma hatası:", error);
    }
  };

  return (
    <div className="event-card">
      <h6 className="title">
        <Link to={`/event/${event.url}`} className="button">
          {event.title}
        </Link>
      </h6>
      <div className="event-details">
        <p>Tarih: {event.date}</p>
        <p>Konum: {event.location}</p>
      </div>
      <button onClick={() => handleJoinEvent(event.id)} className="event-button">
        Katıl
      </button>
      <div className="participant-list">

      {event.participants.map((e,id) => <img key={id} alt="person" src={e.photoURL} className="person-img"/> )}
      </div>
      
      <br />
      <br />
    </div> 
  );
};

export default EventCard;
