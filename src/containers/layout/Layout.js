import React from "react";
import TopBar from "../topBar";
import Player from "../player";
import {Container} from "@material-ui/core";
import CategorySlider from "../../components/TopChart/CategorySlider";

export default function Layout({ children }) {
    return (
        <div>
            <TopBar />
            <Container maxWidth="md">
              {/* <TopChart data={topChart} getMore={getMore} /> */}
              <CategorySlider/>
            </Container>
            <div id="app-main-content">
                {children}
                <Player />
            </div>
        </div>
    );
}
