import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl"></p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra página principal.
          </p>
          <Link
            to={'/'}
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-blue-700">
            Volver a la página de inicio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
