import React, { useEffect, useState } from 'react'
import Responsive_navbar from '../components/Navbar'
import Grid from '../components/Grid'
import { useSearchParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';

const Home = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [data,setData] = useState([]);
    const [totalPages,setTotalPages] = useState(1)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults]=useState(1)

    const [searchParams,setSearchParams] = useSearchParams();
    const category = searchParams.get('category') || 'general';
   
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    
    
    
    const getData = async () => {
        setLoading(true);
        fetch(`http://localhost:8080/api/getnews/?category=${category}&query=${searchQuery}`).then((res)=>res.json()).then((res)=>{
           console.log(res);
           setPage(res.currentPage);
           setTotalPages(res.totalPages);
           setTotalResults(res.totalResults);
           setData(res.news)
           setLoading(false);
        }).catch((err)=>{
            setError(true)
            setLoading(false);
            console.log(err);
        })
    }

    useEffect(()=>{getData()},[page,category,searchQuery])

  return (
    <div>
   <Responsive_navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
   {
    loading?( <Container style={{display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"25px"
    }}><Spinner  animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>  </Container>):error?(<h4>Someting went wrong....</h4>): <Grid data={data} totalResults={totalResults} />
   }
  
    </div>
  )
}

export default Home
