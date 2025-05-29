import React from 'react';

const ContactCard: React.FC = () => {
  return (
    <div style={styles.cardContainer}>
      <h2 style={styles.header}>Contacto</h2>
      <div style={styles.infoItem}>
        <span style={styles.icon}>📍</span>
        <div>
          <p style={styles.label}>UBICACIÓN</p>
          <p style={styles.text}> Medellín, Antioquia</p>
        </div>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.icon}>📞</span>
        <div>
          <p style={styles.label}>CELULAR</p>
          <p style={styles.text}>3136173078</p>
        </div>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.icon}>📧</span>
        <div>
          <p style={styles.label}>E-MAIL</p>
          <p style={styles.text}>imperium.sound@gmail.com</p>
        </div>
      </div>
      <div style={styles.infoItem}>
        <span style={styles.icon}>⏰</span>
        <div>
          <p style={styles.label}>HORARIO</p>
          <p style={styles.text}>Lun - Vier 9:00 AM a 5:00 PM</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    background:'linear-gradient(135deg,#140c34,#381c74)',
    borderRadius: '3em',
    padding: '2.4em',
    maxWidth: '100em',
    color: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  header: {
    textAlign: 'center' as 'center',
    marginBottom: '1.5em',
    fontSize: '3em',
    fontWeight: 'bold' as 'bold',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1em',
  },
  icon: {
    fontSize: '1.5em',
    marginRight: '0.75em',
  },
  label: {
    fontSize: '2em',
    fontWeight: 'bold' as 'bold',
    marginBottom: '0.3em',
  },
  text: {
    fontSize: '1.2em',
    margin: 0,
  },
  
};

export default ContactCard; 