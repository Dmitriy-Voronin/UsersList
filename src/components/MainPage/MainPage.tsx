import React from 'react';
import { Header } from './Header';
import { Content } from './Content';
import { useNavigate } from 'react-router-dom';


export function MainPage() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('authToken') || JSON.stringify(''));


React.useEffect(() => {
  if (!token) navigate('/not-found-auth', {replace: true})
})
  return (
    <>
      <Header />
      <Content />
    </>

  );
}
