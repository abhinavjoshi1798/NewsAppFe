import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Grid({data}) {
    

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
            // border: '1px solid gray',
          }}
        >
          <div className="p-3 m-1" style={{ width: '100%', boxShadow:"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" , borderRadius:"15px", }}>
            {/* Title with 2-line clamp */}
            <p style={titleStyle}>
              <i>{el?.title}</i>
            </p>

            {/* Image if available */}
            {el.image !== 'None' && (
              <img
              src={el.image ? el.image : el.urlToImage}
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