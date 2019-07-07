import React from 'react';

const ImgList = props => {
	const images = props.data;
	return (
		<ul className="img-list">
			{images.map(img => (
        <li className="img-wrap" key={img.id}>
          <img src={img.urls.thumb} alt={img.id}/>
        </li>
      ))}
		</ul>
	);
};

export default ImgList;

/**
 * Recibe un objecto image en result. El mismo que lo mapea 
 * e itera en cada uno para mostrar la imagen. 
 */