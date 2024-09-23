import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types"; 
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import "./styles/Artworks.css";

function Artworks() {
  const artworkIsValidate = useLoaderData();
  const [pagination, setPagination] = useState(1);
  const limit = 12;

  // CALCULATE TOTAL PAGES
  const totalPages = Math.ceil(artworkIsValidate.length / limit);

  // PAGINATION
  const paginate = (array, paginationFromState, limitArg) => {
    const offset = (paginationFromState - 1) * limitArg;
    return array.slice(offset, offset + limitArg);
  };
  
  // ARTWORKS ON THIS PAGE
  const paginatedArtworks = paginate(artworkIsValidate, pagination, limit);
  
  // CLICK TO CHANGE THE PAGE
  const handlePagination = (event, value) => {
    setPagination(value);
  };

  return (
    <div className="artworks-container">
      <div className="all-artworks">
      {paginatedArtworks.map((artwork, index) => (
        <ArtworkCardWithAnimation key={artwork.id_artwork} artwork={artwork} index={index} />
      ))}
    </div>
    <div>
    {artworkIsValidate.length > limit ? <Stack spacing={2} className='pagination'>
        <Pagination count={totalPages} color="primary" page={pagination} onChange={handlePagination}/>
      </Stack>: <div/>}
      </div> 
    </div>
  );
}



function ArtworkCardWithAnimation({ artwork, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Triggers when 10% of the element is visible
  });

  return (
    <div>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="artwork-card-container"
    >
      <Link to={`/oeuvre/${artwork.id_artwork}`}>
        <ArtworkCard artwork={artwork} />
      </Link>
    </motion.div>
</div>
);



}

ArtworkCardWithAnimation.propTypes = {
  artwork: PropTypes.shape({
    id_artwork: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Artworks;
