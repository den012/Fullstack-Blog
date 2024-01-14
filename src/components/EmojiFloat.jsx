import React from 'react';
import { useEffect } from 'react';
import anime from 'animejs';
import './Emoji.css';

const EmojiFloat = () => {
  useEffect(() => {
    const emojiContainer = document.querySelector('.emoji-container');

    function createEmoji() {
      const emoji = document.createElement('div');
      emoji.innerHTML = getRandomEmoji();
      emoji.classList.add('emoji');
      emoji.style.left = `${Math.random() * 100}%`;
      emoji.style.transform = `rotate(${Math.random() * 20}deg)`;
      emojiContainer.appendChild(emoji);

      setTimeout(() => {
        emoji.classList.add('show-emoji');
    }, 100);

      anime({
        targets: emoji,
        translateY: -1000, 
        duration: 4000,
        easing: 'linear',
        complete: () => {
          emoji.remove();
        },
      });
    }

    function getRandomEmoji() {
      const emojis = [
        '😀', '😃', '😄', '😂', '🤣', '😊', '😇', '🙂',
        '😍', '😘', '😗', '😚', '😋', '😛', '😜', '😝', 
        '🤤', '😎', '🤩', '😹', '😻', '😼', '🦄', '🐵', 
        '🙈', '🙉', '🙊', '❤️',  '💙', '💜', '💕', '💞', 
        '💓', '💗',  '💖', '💘', '💝', '💬', '👍', '🔄', 
        '📷', '📱', '🌐', '🔗',
      ];

      return emojis[Math.floor(Math.random() * emojis.length)];
    }

    const animationInterval = setInterval(createEmoji, 600);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="emoji-container"></div>
  )
};

export default EmojiFloat;