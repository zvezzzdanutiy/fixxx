import React, { useEffect } from 'react';
import axios from 'axios';

const TelegramAuthHandler = ({ onAuthSuccess }) => {
  useEffect(() => {
    const handleTelegramAuth = async () => {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.isWebAppInitialized()) {
        const initData = window.Telegram.WebApp.initData;
        const authData = initData.user ? initData.user.id : null;

        try {
          const response = await axios.post('/auth', { authData });

          if (response.status === 200) {
            onAuthSuccess();
          } else {
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
        }
      }
    };

    handleTelegramAuth();
  }, [onAuthSuccess]);

  return null;
};

export default TelegramAuthHandler;
