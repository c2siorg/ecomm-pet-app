import React, { useState } from 'react';
import { Card, Icon, Image, Button, Label, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

function ItemCard({ cardItem, isAuthenticated, loggedInUserId, cart, handleAddToCart, handleRemoveFromCart }) {
  const [item, setStateItem] = useState(cardItem);
  const imageUrl = item.imageUrl || 'https://via.placeholder.com/150';
  const baseUrl = process.env.REACT_APP_RESOURCE_SERVER_URL;
  const { httpRequest } = useAuthContext();

  //  define userid and subscription request config
  var subscription = {
    userId: loggedInUserId,
    itemId: item.id
  }

  const handleLikeClick = async () => {
    if (item.isSubscribed) {
      // define delete request config
      const deleteRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*,http://localhost:3000"
        },
        method: "DELETE",
        url: baseUrl + '/subscriptions/' + item.id,
        withCredentials: false
      };

      httpRequest(deleteRequestConfig)
        .then((response) => {
          console.log(response);
          setStateItem((prevState) => ({ ...prevState, isSubscribed: false }));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // define post request config
      const postRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*,http://localhost:3000"
        },
        method: "POST",
        url: baseUrl + '/subscriptions',
        data: subscription,
        withCredentials: false
      };

      httpRequest(postRequestConfig)
        .then((response) => {
          console.log(response);
          setStateItem((prevState) => ({ ...prevState, isSubscribed: true }));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //function to handle Add to card button click
  const handleAddToCartClick = async () => {
    console.log("Add to cart button clicked for item: " + item.id);
    handleAddToCart(item);
  };

  // function to handle Remove from Cart button click
  const handleRemoveFromCartClick = async () => {
    console.log("Remove from cart button clicked for item: " + item.id);
    handleRemoveFromCart(item.id);
  };

  //write a inline component to retun the like button if the user is authenticated
  const Operators = () => {
    if (isAuthenticated) {
      return (
        <>
          <Grid.Column>
            {item.isSubscribed ? (
              <Button onClick={handleLikeClick}>
                <Icon name='thumbs up' />
                Following
              </Button>
            ) : (
              <Button onClick={handleLikeClick}>
                <Icon name='thumbs up outline' />
                Follow
              </Button>
            )}
          </Grid.Column>
          <Grid.Column>
            {cart.find((cartItem) => cartItem.id === item.id) ? (
              <Button color='yellow' floated='green' onClick={handleRemoveFromCartClick}>
                <Icon name='cart arrow down' />
                Remove
              </Button>
            ) : (
              <Button primary floated='right' onClick={handleAddToCartClick}>
                <Icon name='cart plus' />
                Add to Cart
              </Button>
            )}
          </Grid.Column>
        </>
      );
    }
  };

  return (
    <Card>
      <Image src={imageUrl} wrapped ui={false} size="small" />
      <Card.Content>
        <Card.Header>{item.title}</Card.Header>
        <Card.Meta>{item.id}</Card.Meta>
        <Card.Description>{item.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>Includes: {item.includes}</p>
        <p>Intended For: {item.intendedFor}</p>
        <p>Color: {item.color}</p>
        <p>Material: {item.material}</p>
      </Card.Content>
      <Card.Content extra>
        <Card.Header color='orange' as='h3'>${item.price}</Card.Header>
        <Grid columns={2}>
          <Operators />
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default ItemCard;
