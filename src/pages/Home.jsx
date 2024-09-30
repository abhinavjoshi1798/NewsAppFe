import React, { useEffect, useState } from 'react';
import Responsive_navbar from '../components/Navbar';
import Grid from '../components/Grid';
import { useSearchParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [fetchFlag, setFetchFlag] = useState(false);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'general';
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  // Fetch data function
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/getnews/?category=${category}&query=${searchQuery}&page=${page}`
      );
      const res = await response.json();
      setLoading(false);
      setTotalPages(res.totalPages);
      console.log(res)

      if (page === 1) {
        setData(res.news); // Set new data for the first page
      } else {
        setData((prevData) => [...prevData, ...res.news]); // Append data for scrolling
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error(err);
    }
  };

  // Fetch data when page changes or fetchFlag is set
  useEffect(() => {
    console.log("inside useEffect having getData()" )
    console.log("fetchFlag",fetchFlag )
    if (fetchFlag || page > 1) {
      getData()
      setFetchFlag(false);
    }
  }, [page, fetchFlag]);

  // Reset page and fetch new data when category or search query changes
  useEffect(() => {
    setData([]); // Clear current data
    setPage(1); // Reset page to 1
    setFetchFlag(true); // Trigger data fetch with new category/search
  }, [category, searchQuery]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      console.log("just before increasing the page")
      if (!loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
        console.log("just after increasing the page")
      }
    }
  };

  console.log("page",page)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loading, totalPages]);

  return (
    <div>
      <Responsive_navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {error ? (
        <h4>Something went wrong....</h4>
      ) : (
        <>
          <Grid data={data} />
          {loading && (
            <Container
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '25px',
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
