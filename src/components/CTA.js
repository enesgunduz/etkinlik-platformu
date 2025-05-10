import React from 'react';
import './styles/CTA.css';

const CTA = () => {
  return (
    <section className="cta">
      <div className="container">
        <h2>Topluluğumuza Katılmaya Hazır mısınız?</h2>
        <p>Binlerce etkinlik ve ilgi alanlarını paylaşan insanlarla tanışmak için şimdi kaydolun.</p>
        <button className="btn btn-primary" style={{padding: '15px 40px', fontSize: '18px'}}>Ücretsiz Kayıt Ol</button>
      </div>
    </section>
  );
};

export default CTA;