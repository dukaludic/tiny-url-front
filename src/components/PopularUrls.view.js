import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar.view";
import { AiFillCopy } from "react-icons/ai";
import axios from "axios";
import { Auth } from "../context/AuthContext";

function PopularUrls() {
  const context = useContext(Auth);
  const [popularUrls, setPopularUrls] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    context.state.data.isAuthenticated
  );

  useEffect(() => {
    (async () => {
      console.log(isAuthenticated, "isAuthenticated");
      const { data } = await axios.get(
        `http://localhost:3000/urls/counter/?isAuthenticated=${isAuthenticated}&limit=10`
      );
      console.log(data, "URLS");
      setPopularUrls(data);
    })();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="result-item">
          <div className="long-url-container">
            <p>Domain</p>
          </div>
          <div className="result-item-right">
            <div>
              <p>Count</p>
            </div>
          </div>
        </div>
        {popularUrls?.map((url, index) => {
          return (
            <div className="result-item">
              <div className="long-url-container">
                <span style={{ marginRight: "20px" }}>{index + 1}</span>
                <span>{url.domain}</span>
              </div>
              <div className="result-item-right">
                <div className="short-link">
                  <a className="short-url-link">{url.short_url}</a>
                </div>
                <div>
                  <p>{url.count}</p>
                </div>
                <AiFillCopy
                  // onClick={() => onClickShortUrl(index)}
                  color={"#aaa"}
                  size={20}
                  className="short-url-copy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularUrls;
