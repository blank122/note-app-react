import ErrorPage from "../pages/ErrorPage";

export default function NotFound() {
  return <ErrorPage statusCode={404} message="Page not found" />;
}

export default function ServerError() {
  return <ErrorPage statusCode={500} message="Internal server error" />;
}