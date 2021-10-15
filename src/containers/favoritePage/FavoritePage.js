import React from 'react'
import Favorite from "./components/Favorite/Favorite";
import Cache from "./components/Cache/Cache";
import Grid from "@material-ui/core/Grid";
import { Box, Container, useTheme } from "@material-ui/core";


function FavoritePage() {
    return (
        <div className="fav-redirect-container">
                <Grid item xs={12} md={4}>
                  <Box
                    className={classes.title}
                    mb={3}
                    fontSize="h4.fontSize"
                    fontWeight="fontWeightBold"
                  >
                    Favorites
                  </Box>
                  <Favorite style={{overflow:"visible",maxHeight:"auto"}} />
                </Grid>
                <Grid  item xs={12} md={4}>
                  <Box
                    className={classes.title}
                    mb={3}
                    fontSize="h4.fontSize"
                    fontWeight="fontWeightBold"
                  >
                    Cached
                  </Box>
                  <Cache />
                </Grid>
              </div>
    )
}

export default FavoritePage
