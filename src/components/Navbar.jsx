import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ResponsiveNavbar({searchQuery,setSearchQuery}) {
  // Get the current search params from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  

  // Function to handle setting the category parameter
  const handleCategoryChange = (category) => {
    setSearchParams({ category });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSearchParams({ query });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand onClick={() => handleCategoryChange('general')} >News</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Handle category change by updating URL search params */}
            <Nav.Link onClick={() => handleCategoryChange('business')}>Business</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('entertainment')}>Entertainment</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('sports')}>Sports</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('technology')}>Technology</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('politics')}>Politics</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('health')}>Health</Nav.Link>
            <Nav.Link onClick={() => handleCategoryChange('science')}>Science</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
           
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResponsiveNavbar;
