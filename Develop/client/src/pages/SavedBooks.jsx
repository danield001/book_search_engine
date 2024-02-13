import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/query';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, REMOVE_BOOK } from '../utils/query';



const SavedBooks = () => {
  // Define state variables to hold user data and loading state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMe();
        setUserData(data.me);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define the removeBook mutation
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Define the handleDeleteBook function to delete a book
  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({ variables: { bookId } });
      // Update user data after deletion
      const { data } = await getMe();
      setUserData(data.me);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Render loading state while user data is being fetched
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
