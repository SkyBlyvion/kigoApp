// src/components/Account/SocialLinks.jsx
import React from 'react';
import { BsBehance, BsGithub, BsInstagram, BsLinkedin, BsMicrosoftTeams } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { FaSoundcloud } from 'react-icons/fa';

const SocialLinks = ({ socialLinks }) => {
  const socialIcons = {
    teams: <BsMicrosoftTeams />,
    linkedin: <BsLinkedin />,
    instagram: <BsInstagram />,
    behance: <BsBehance />,
    github: <BsGithub />,
    soundcloud: <FaSoundcloud />,
  };

  return (
    <div className="flex flex-row my-4 border-2 border-orange bg-gradient-to-b from-white to-white_2 px-2 py-2 rounded-xl shadow">
      <div>
        <p className="text-lg text-orange font-sans py-1">Réseaux :</p>
        <div className="flex flex-row space-x-4 items-center">
          {socialLinks.map(link => (
            link.value && (
              <a key={link.type} href={link.value} className="icon-large text-orange rounded-xl">
                {socialIcons[link.type.toLowerCase()] ?? <FiUser />}
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
