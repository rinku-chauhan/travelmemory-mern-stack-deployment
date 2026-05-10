import React, { useEffect, useState } from "react";
import Card from "../UIC/Card";
import FeaturedCard from "../UIC/FeaturedCard";
import axios from "axios";
import { baseUrl } from "../../url";

export default function Home() {

  // Store API response
  const [data, setData] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios
      .get(`${baseUrl}`)
      .then((res) => {

        // Safety check to ensure array
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }

      })
      .catch((err) => {
        console.error("API Error:", err);
        setData([]);
      });
  }, []);

  return (
    <div style={{ margin: "2%" }}>

      {/* Loading State */}
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Featured Trips */}
          {data
            .filter((e) => e.featured)
            .map((e) => (
              <FeaturedCard
                key={e._id}
                title={e.tripName}
                tripType={e.tripType}
                description={e.shortDescription}
                id={e._id}
              />
            ))}

          {/* Normal Trips */}
          {data
            .filter((e) => !e.featured)
            .map((e) => (
              <Card
                key={e._id}
                title={e.tripName}
                tripType={e.tripType}
                description={e.shortDescription}
                id={e._id}
              />
            ))}
        </>
      )}
    </div>
  );
}