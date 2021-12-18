import { Link, Outlet, useLoaderData, json } from "remix";
import { gql } from "graphql-request";
import { client } from "~/utils/graphql-client";
import stylesUrl from "../styles/jokes.css";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl
    }
  ];
};

const GetJokes = gql`
  {
    jokes {
      id
      name
    }
  }
`;

export let loader = async () => {
  const data = await client.request(GetJokes);
  // console.log(data);
  return json(data);
};

export default function JokesRoute() {
  let data = useLoaderData();

  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="Remix Jokes"
              aria-label="Remix Jokes"
            >
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data?.jokes.map(({ id, name }: any) => (
                <li key={id}>
                  <Link to={id} prefetch="intent">{name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}