import {React,useState} from "react";
import { Box, IconButton } from "@material-ui/core";
import Image from "../Image";
import { makeStyles } from "@material-ui/core/styles";
import { changeURL } from "../../store/slices/playerSlice";
import { changeCache } from "../../store/slices/componentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { addToDowanloadingQueue } from "../../store/slices/downloadSlice";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 10,
    maxHeight: 400,
    overflowY: "scroll",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5),
    },

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },

  itemContainer: {
    cursor: "pointer",
    display: "flex",
    width: "100%",
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
}));

function Cache() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cache } = useSelector((state) => state.component);
  const history = useHistory();
  const handlePlay = (name, link, id, image, categoryId) => {
    dispatch(changeURL({ name, link, id, image, categoryId,currentPlayingPosition: "home" }));
};
  const handleCache = (name, link, id, image, categoryId) => {
    dispatch(changeCache({ name, link, id, image, categoryId,currentPlayingPosition: "home" }));
    handleDownload(name, link, id, image, categoryId)
  };

const [isDownloaded, setIsDownloaded] = useState(false);
const { downloadingIds } = useSelector((state) => state.download);
const handleDownload = async (name, link, id, image, categoryId) => {
  if (isDownloaded) {
    try {
      const cache = await caches.open("audio_cache");
      const res = await cache.delete(new Request(link));
      if (res) setIsDownloaded(false);
    } catch (error) {}
  } else {
    dispatch(
      addToDowanloadingQueue({ name: name, id: id, link: link, progress: 0 })
    );
  }
};

  return (
    <div className="favorite-container">
      {cache.length === 0 && (
                <Box display="flex" justifyContent="center" alignItems="center" my={10}>
                    No cached...
                </Box>
            )}
      {cache
      .slice(0)
      .reverse()
      .map((item, key) => (
        <Box
          className={classes.itemContainer}
          display="flex"
          alignItems="center"
          paddingTop={1}
          paddingBottom={1}
          key={key}
        >
          <Image src={item.image} className={classes.image} />

          <Box
            onClick={() => {
              if(item.link!=="category-link"){
                return handlePlay(item.name, item.link, item.id, item.image, item.categoryId)
                }}}
            className="fav-name-container"
            marginLeft={2}
            fontWeight="fontWeightMedium"
            fontSize="body2.fontSize"
          >
            
     <p onClick={()=>{
       if(item.link==="category-link"){history.push("/category/"+item.id)}
     }}>       {item.name}</p>
         
          </Box>
          <IconButton  onClick={()=>handleCache(item.name, item.link, item.id, item.image, item.categoryId)} className="fav-icon-container" size="small">
            <CheckCircleIcon className="check-cache-icon" />        
          </IconButton>
        </Box>
      ))}
    </div>
  );
}

export default Cache;
