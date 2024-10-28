import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

function NFT() {
  const [nfts] = useState([
    {
      id: 1,
      name: "Cool Cat #1234",
      image: "/placeholder/400/300",
      description: "A very cool cat NFT",
    },
    {
      id: 2,
      name: "Bored Ape #5678",
      image: "/placeholder/400/300",
      description: "A bored ape from the famous collection",
    },
    {
      id: 3,
      name: "Crypto Punk #9101",
      image: "/placeholder/400/300",
      description: "An iconic Crypto Punk",
    },
  ]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        My NFT Collection
      </Typography>
      <Grid container spacing={3}>
        {nfts.map((nft) => (
          <Grid item xs={12} sm={6} md={4} key={nft.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`/api${nft.image}`}
                alt={nft.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nft.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nft.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Details</Button>
                <Button size="small">Transfer</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NFT;
