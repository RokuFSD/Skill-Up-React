import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  let content = null;

  if (isRouteErrorResponse(error) && error.status === 404) {
    content = <h1>404 - Page not found</h1>;
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, []);

  return (
    <div>
      Sorry, something went wrong.
      {content}
    </div>
  );
}

export default ErrorPage;
