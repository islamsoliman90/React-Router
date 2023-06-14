import React, { Suspense } from "react";
import { Await, Link, useLoaderData, defer } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ hostvan: getHostVans() });
}

export default function HostVans() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <Suspense fallback={<h1>Loading ......</h1>}>
          <Await resolve={data.hostvan}>
            {(vans) => {
              const hostVansEls = vans.map((van) => (
                <Link
                  to={van.id}
                  key={van.id}
                  className="host-van-link-wrapper"
                >
                  <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                      <h3>{van.name}</h3>
                      <p>${van.price}/day</p>
                    </div>
                  </div>
                </Link>
              ));
              return <section>{hostVansEls}</section>;
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}
