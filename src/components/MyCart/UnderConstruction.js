import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

function UnderConstruction() {
  return (
    <Container textAlign='center'>
      <Header icon>
        <Icon name='wrench' />
        Under Construction
      </Header>
      <p>
        This page is currently under construction. Please check back soon for updates.
      </p>
    </Container>
  );
}

export default UnderConstruction;
