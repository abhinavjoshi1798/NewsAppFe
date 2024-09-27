import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Grid({data,totalResults}) {
    console.log("data in grid",data);

    const titleStyle = {
        display: '-webkit-box',
        WebkitLineClamp: 2, // Max 2 lines
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
      };
    
      const descriptionStyle = {
        display: '-webkit-box',
        WebkitLineClamp: 5, // Max 5 lines
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
      };
    

  return (
   
    <Container style={{ marginTop: '20px' }}>
    <Row className='gap-1' style={{ display: 'flex', justifyContent: 'center' }}>
      {data?.map((el, index) => (
        <Col
          key={index}
          xs={10}
          md={5}
          lg={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'top',
            border: '1px solid gray',
          }}
        >
          <div className="p-2 border bg-light" style={{ width: '100%' }}>
            {/* Title with 2-line clamp */}
            <p style={titleStyle}>
              <i>{el?.title}</i>
            </p>

            {/* Image if available */}
            {el.image !== 'None' && (
              <img
                src={el.image}
                alt="News"
                style={{ maxWidth: '80%', display: 'flex', margin: 'auto' }}
              />
            )}

            {/* Description with 5-line clamp */}
            <p style={descriptionStyle}>{el?.description}</p>
            <button onClick={() => window.location.href = el.url}>Know More</button>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
  );
}

export default Grid;