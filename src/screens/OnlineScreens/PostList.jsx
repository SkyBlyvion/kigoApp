import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserData } from '../../redux/user/userSelector';
import { fetchUser } from '../../redux/user/userSlice';

const PostList = () => {


  return (
    <>
      <h1>PostList</h1>
      <div>PostList</div><br/>
      <p>Post: Article constitué d’un texte enrichi ( éditeur WYSIWYG - What you see is what you get ) 
        et de plusieurs images.</p><br/>
      <p>Catégories de post: Label permettant de donner une catégorie unique à un post en 
        vue de trier l’affichage.</p><br/>
    </>
  )
}

export default PostList