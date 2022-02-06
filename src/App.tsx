import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap'
import NavBar from './components/NavBar';
import HeroArea from './components/HeroArea';
import { Image } from './dtos/image';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {Animated} from 'react-animated-css';
// import ReactPlaceholder from 'react-placeholder';
// import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';
// import "react-placeholder/lib/reactPlaceholder.css";
// import 'react-loading-skeleton/dist/skeleton.css';
// import Skeleton from '@mui/material/Skeleton';

function App() {

  const [filter, setFilter] = useState("all");
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [likedIndeces, setLikedIndeces] = useState<number[]>(localStorage.getItem("likedIndeces") ? JSON.parse(localStorage.getItem("likedIndeces") || "") : []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayedImages, setDisplayedImages] = useState<Image[]>([]);
  const [scrollToTopDisplay, setScrollToTopDisplay] = useState("none");

  const getGridColumns = () => {
    if (window.innerWidth <= 700) { return 1; }
    else { return 2; }
  }
  const [gridColumns, setGridColumns] = useState(getGridColumns());
  
  const handleChangeFilter = () => {
    setIsLoading(true);
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      setDisplayedImages(filter === 'all' ? allImages : allImages.filter((image, index) => likedIndeces.includes(index)))
      setIsLoading(false);
    }, 600);
  }

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetch("https://images-api.nasa.gov/search?q=''", {
        method: "GET"
    }).then(resp => {
      resp.json().then(lis => {
        let allImages = lis.collection.items.map((image: any) => { return {...image, liked: false}});
        setAllImages(allImages);
        setDisplayedImages(allImages);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 700) { setGridColumns(1); }
      else { setGridColumns(2); }
    });
    
    document.addEventListener("scroll", e => {
        if (!document || !document.scrollingElement) {return};
        var scrolled = document.scrollingElement.scrollTop;
        if (scrolled >= 200) {
            setScrollToTopDisplay("block");
        } else {
            setScrollToTopDisplay("none");
        }
    }); 
  }, []);

  useEffect(() => {
    handleChangeFilter();
  }, [filter]);

  const handleLike = (e: any, index: number) => {
    e.target.classList.toggle('liked');
    let newLikedIndeces;
    if (likedIndeces.includes(index)) {
      newLikedIndeces = likedIndeces.filter(i => i !== index);
    } else {
      newLikedIndeces =[...likedIndeces, index];
    }
    setLikedIndeces(newLikedIndeces);
    localStorage.setItem("likedIndeces", JSON.stringify(newLikedIndeces));
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  // const GhostPlaceholder = () => (
  //   <div className='my-placeholder'>
  //     <RectShape color='gray' style={{width: 25, height: 100}} />
  //     <TextBlock rows={6} color='blue'/>
  //   </div>
  // );
  
  return (
    <>
    <div className="App d-flex flex-column">
      <NavBar filter={filter} setFilter={setFilter} />
      <HeroArea />
      <h1 style={{fontSize: '2rem'}} className="mt-3"><strong>Feed</strong></h1>
      <hr className="m-0 align-self-center" style={{width: "80%", borderTop: "3px solid #bbb"}}></hr>
      {isLoading ?
      <CircularProgress className="mt-2 align-self-center" />
      :
      <div className="align-self-center justify-self-center" style={{width: "80%"}}>
        <ImageList className="mt-3" variant="masonry" cols={gridColumns} gap={8}>
          {displayedImages.map((image: any, index: number) => {
            return (
              // <ReactPlaceholder type='textRow' rows={8} ready={!isLoading}>
              <ImageListItem key={index}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      style={{
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      image={image.links[0].href}
                      alt="green iguana"
                    />
                    <CardContent className="d-flex flex-column">
                      <Typography gutterBottom variant="h5" component="div">
                        {image.data[0].title}
                      </Typography>
                      <Typography variant="body1" component="div">
                        Date: {image.data[0].date_created?.split("T")[0] || "N/A"}
                      </Typography>
                      <Typography variant="body1" component="div">
                        Location: {image.data[0].location || "N/A"}
                      </Typography>
                      <Typography gutterBottom variant="body1" component="div">
                        Photographer: {image.data[0].photographer || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {image.data[0].description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton className={"like-button " + ((filter==='likes' || likedIndeces.includes(index)) ? "liked" : "")} onClick={(e) => handleLike(e, index)} aria-label="add to favorites">
                        {/* <button className={"like-button" + (likedIndeces.includes(index)? "liked" : "")}></button> */}
                      </IconButton>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </ImageListItem>
              // </ReactPlaceholder>
            )
          })}
        </ImageList>
      </div>
      }
      <span id="scrollToTopWrapper">
        <Animated animationIn="fadeIn" animationInDuration={1000} animationOut="fadeOut" isVisible={scrollToTopDisplay==="block"}>
          <Button id="scrollToTopButton" onClick={scrollToTop} sx={{display: scrollToTopDisplay}} variant="contained"><ArrowUpwardIcon></ArrowUpwardIcon></Button>
        </Animated>
      </span>
    </div>
    </>
  );
}

export default App;

