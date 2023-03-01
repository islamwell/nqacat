import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { changeURL } from "../../store/slices/playerSlice";
import Image from "../Image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import categoryStructure from "../../data/category-strcture";
import { useHistory } from "react-router-dom";
import { navigateToCategory } from "../../helpers/navigateToCategory";


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(0),
    },
  },
  paper: {
    padding: theme.spacing(2),
    minWidth: 850,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  image: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: 15,
    width: 150,
    height: 150,

    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 100,
    },
  },

  title: {
    color: theme.palette.primary.dark,
  },

  item: {
    cursor: "pointer",
    width: 150,
    fontSize: theme.typography.fontSize,
    padding: theme.spacing(0),
    [theme.breakpoints.down("xs")]: {
      width: 10,
    },
  },

  catLink: {
    cursor: "pointer",
    color: theme.palette.primary.dark,
    padding: theme.spacing(0),
    [theme.breakpoints.down("xs")]: {
      width: 10,
    },
  },
}));



export default function CategorySlider({ data, getMore }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState({});
  const [currSubCategory, setCurrSubCategory] = useState({});
  const [history, setHistory] = useState([{id: 0, name: "Home"}]);
  const browserHistory = useHistory();

  const handlePlay = (item) => {
    dispatch(
      changeURL({
        name: item.name,
        link: item.link,
        id: item.id,
        image: item.image,
        categoryId: item.categoryId || item.category_id,
        currentPlayingPosition: "topChart",
      })
    );
  };

  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],
    autoplaySpeed: 2000,
    cssEase: "linear",
    
  };

  useEffect(() => {
    if(currCategory.subCategories){
      setSubCategories(currCategory.subCategories);
      if (history.indexOf(currCategory) === -1){
        var hist = [{id: 0, name: "Home"}];
        hist.push(currCategory);
        setHistory(hist); 
      }
    } else{
      setSubCategories([]);
    }
  }, [currCategory])

  var subCatOnClick = (item) => {
    console.log("inside on click")

    if(item == currSubCategory){
      return
    }
    if(item.subCategories){
      setCurrSubCategory(item);
      setSubCategories(item.subCategories);
      if (history.indexOf(item) === -1){
        var hist = history; 
        hist.push(item);
        setHistory(hist);
      }
    } else{ 
      //DO ROUTING
      //setSubCategories([]);
      handleSelectCategory(item);
    }
  }

  var handleHistoryClick = (item) => {
    if(item.id === 0){
      setCurrCategory({})
      setSubCategories([])
      setCurrSubCategory({})
      setHistory([history[0]])
    } else{
      setHistory(history.slice(0,history.indexOf(item)+1))
      if(item.subCategories){
        setSubCategories(item.subCategories)
      }
    }
  }

  const handleSelectCategory = ({ id }) => {
    navigateToCategory(id, browserHistory);
  };

  

  return (
    <div className={classes.root}>
      <Box className={classes.title} mb={3} ml={1} fontSize="h4.fontSize" fontWeight="fontWeightBold">
        Categories
      </Box>
      <div onClick={getMore}>
        <Slider 
          
        {...settings}>
          {
            categoryStructure.map((item) => (
              <div className={classes.item} key={item.id}>
                <Box>
                  <Image onClick={() => setCurrCategory(item)} src={item.image} className={classes.image}/>
                </Box>
                <Box textAlign="center" textOverflow="ellipsis" overflow="hidden" py={1} fontSize={12}>
                  {item.name}
                </Box>
              </div>
            ))
          }
          </Slider>
          </div>
      {
        subCategories.length > 0 ?
        <>
        <Box className={classes.title} mb={3} ml={1} fontSize="h4.fontSize" fontWeight="fontWeightBold">
          {
            history.map((item, idx) => (
              <span key={`history-${item.id}`}>
                {idx !== 0 ? ">" : ""}
                <a>
                    <Button onClick = {() => handleHistoryClick(item)} className={classes.catLink}>
                      {item.name}
                    </Button>
                </a> 
              </span>
            ))
          }
        </Box>
      <div >
        <Slider 
          
        {...settings}>
          {
            subCategories.map((item) => (
              <div className={classes.item} key={item.id}>
                <Box>
                  <Image  onClick={() => subCatOnClick(item)} src={item.image} className={classes.image}/>
                </Box>
                <Box textAlign="center" textOverflow="ellipsis" overflow="hidden" py={1} fontSize={12}>
                  {item.name}
                </Box>
              </div>
            ))
          }
          
          </Slider>
          </div>
        </> : <></>
      }
      
    </div>

  );
}
