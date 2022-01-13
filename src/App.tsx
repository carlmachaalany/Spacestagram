import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap'
import NavBar from './components/NavBar';
import HeroArea from './components/HeroArea';
import { Image } from './dtos/image';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, IconButton, ImageList, ImageListItem, LinearProgress, Typography } from '@mui/material';
import { Animated } from 'react-animated-css';
import {Favorite as FavoriteIcon, Share as ShareIcon} from '@mui/icons-material';

function App() {

  const [filter, setFilter] = useState("all");
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [likedIndeces, setLikedIndeces] = useState<number[]>(localStorage.getItem("likedIndeces") ? JSON.parse(localStorage.getItem("likedIndeces") || "") : []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [likedImages, setLikedImages] = useState<Image[]>([]);
  const [displayedImages, setDisplayedImages] = useState<Image[]>([]);
  
  const getGridColumns = () => {
    if (window.innerWidth <= 700) { return 1; }
    else { return 2; }
  }
  const [gridColumns, setGridColumns] = useState(getGridColumns());
  
  const handleChangeFilter = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log('Filter changed to:', filter);
    setDisplayedImages(filter === 'all' ? allImages : allImages.filter((image, index) => likedIndeces.includes(index)))
    console.log('New displayed images:', displayedImages);
  }

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetch("https://images-api.nasa.gov/search?q=''", {
        method: "GET"
    }).then(resp => {
      resp.json().then(lis => {
        console.log(lis.collection.items.map((image: any) => { return {...image, liked: false}}));
        setAllImages(lis.collection.items.map((image: any) => { return {...image, liked: false}}));
        setDisplayedImages(lis.collection.items.map((image: any) => { return {...image, liked: false}}));
        setIsLoading(false);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 700) { setGridColumns(1); }
      else { setGridColumns(2); }
    })
  }, []);

  useEffect(() => {
    handleChangeFilter();
  }, [filter]);

  const handleLike = (e: any, index: number) => {
    console.log("liked a pic");
    console.log("old likes ", likedIndeces);
    e.target.classList.toggle('liked');
    let newLikedIndeces;
    if (likedIndeces.includes(index)) {
      newLikedIndeces = likedIndeces.filter(i => i !== index);
    } else {
      newLikedIndeces =[...likedIndeces, index];
    }
    setLikedIndeces(newLikedIndeces);
    console.log("new likes ", likedIndeces);
    localStorage.setItem("likedIndeces", JSON.stringify(newLikedIndeces));
  }
  
  return (
    <div className="App d-flex flex-column">
      <NavBar filter={filter} setFilter={setFilter} />
      <HeroArea />
      <h1 style={{fontSize: '2rem'}} className="mt-3"><strong>FEED</strong></h1>
      <hr className="m-0 align-self-center" style={{width: "80%", borderTop: "3px solid #bbb"}}></hr>
      {isLoading ?
        <CircularProgress className="align-self-center" />
      :
        <div className="align-self-center justify-self-center" style={{width: "80%"}}>
          <ImageList className="mt-3" variant="masonry" cols={gridColumns} gap={8}>
            {displayedImages.map((image: any, index: number) => {
              return (
                <Animated key={image.href} animationIn="zoomIn" animationInDuration={1000} animationOut="fadeOut" isVisible={true}>
                  <ImageListItem>
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
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {image.data[0].title}
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
                </Animated>
              )
            })}
          </ImageList>
        </div>
      }
    </div>
  );
}

export default App;
