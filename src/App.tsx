import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap'
import NavBar from './components/NavBar';
import HeroArea from './components/HeroArea';
import { Image } from './dtos/image';
import Grid from '@mui/material/Grid';
import { Card, CardActionArea, CardContent, CardMedia, ImageList, ImageListItem, Typography } from '@mui/material';

function App() {

  const [filter, setFilter] = useState("all");
  const [allImages, setAllImages] = useState<Image[]>([]);
  
  const getGridColumns = () => {
    if (window.innerWidth <= 700) { return 1; }
    else { return 2; }
  }
  const [gridColumns, setGridColumns] = useState(getGridColumns());
  
  const handleChangeFilter = () => {
    console.log('Filter changed to:', filter);
  }

  useEffect(() => {
    fetch("https://images-api.nasa.gov/search?q=''", {
        method: "GET"
    }).then(resp => {
      resp.json().then(lis => {
        console.log(lis.collection.items);
        setAllImages(lis.collection.items);
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
  
  return (
    <div className="App d-flex flex-column">
      <NavBar filter={filter} setFilter={setFilter} />
      <HeroArea />
      <div id="body" className="align-self-center">
        <ImageList className="mt-3" variant="masonry" cols={gridColumns} gap={8}>
          {allImages.map((image: any) => (
            <ImageListItem key={image.href}>
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
                </CardActionArea>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default App;
