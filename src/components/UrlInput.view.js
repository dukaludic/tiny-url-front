import React, { useState } from "react";
import axios from "axios";
import "./UrlInput.css";
import { SpinnerCircular } from "spinners-react";
import Navbar from "./Navbar.view";
import { AiFillCopy } from "react-icons/ai";

function UrlInput() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const inputHandler = (e) => {
    setInput(e.target.value);
    console.log(process.env.API_URL);
  };

  const submitHandler = async () => {
    console.log(input);
    setIsLoading(true);

    try {
      const postUrlRes = await axios.post("http://localhost:3000/urls", {
        long_url: input,
      });
      console.log(postUrlRes, "postUrlRes");
      setShortenedUrls((prevState) => [...prevState, postUrlRes.data]);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const onClickShortUrl = (index) => {
    // axios.get(
    //   `http://localhost:3000/redirect/${shortenedUrls[index].short_url}`
    // );
    // console.log(shortenedUrls[index].short_url);
    navigator.clipboard.writeText(
      `http://localhost:3000/${shortenedUrls[index].short_url}`
    );
  };

  return (
    <>
      <div className="url-input-container">
        <div className="input-container">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            tyle="text"
          />
          <div className="button-spinner">
            {isLoading ? (
              <SpinnerCircular
                secondaryColor={""}
                thickness={200}
                color={"#73EBAF"}
              />
            ) : (
              <button onClick={submitHandler}>Submit</button>
            )}
          </div>
        </div>
        {shortenedUrls.length > 0 && (
          <div className="results-container">
            <div className="result-item">
              <div className="long-url-container">
                <p>Long</p>
              </div>
              <div className="result-item-right">
                <div>
                  <p>Short</p>
                </div>
                <div>
                  <p>Counter</p>
                </div>
              </div>
            </div>
            {console.log(shortenedUrls)}
            {shortenedUrls?.map((url, index) => {
              return (
                <div className="result-item">
                  <div className="long-url-container">
                    <p>{url.long_url}</p>
                  </div>
                  <div className="result-item-right">
                    <div className="short-link">
                      <a className="short-url-link">{url.short_url}</a>
                    </div>
                    <div>
                      <p>{url.counter}</p>
                    </div>
                    <AiFillCopy
                      onClick={() => onClickShortUrl(index)}
                      color={"#aaa"}
                      size={20}
                      className="short-url-copy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default UrlInput;
