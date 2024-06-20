import React from 'react';
import CustomInput from '../CustomInput';


const SocialLinkInput = ({ contact, index, handleSocialLinkChange, removeSocialLink }) => {
  return (
    <div key={index} className='mb-4 flex'>
      <CustomInput
        state={contact.value}
        label={`Votre ${contact.type.label.charAt(0).toUpperCase() + contact.type.label.slice(1)}`}
        type="text"
        callable={(event) => handleSocialLinkChange(index, event.target.value)}
      />
      <button type="button" onClick={() => removeSocialLink(index)} className='ml-2 bg-red-500 text-white p-2 rounded'>
        Supprimer
      </button>
    </div>
  );
};

export default SocialLinkInput;
