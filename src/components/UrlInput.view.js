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
  const [error, setError] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    console.log(process.env.API_URL);
  };

  const validateUrl = (value) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  };

  const isShortened = (input) => {
    const url = shortenedUrls.some((url) => url.long_url === input);
    console.log("isShortened", url, shortenedUrls);

    // console.log('isShorte')

    if (url) {
      setError("Already Shortened");
      return true;
    } else {
      setError("");
      return false;
    }
  };

  const submitHandler = async () => {
    console.log(input);
    setIsLoading(true);

    const isValid = validateUrl(input);

    if (!isValid) {
      setError("URL not valid");
      setIsLoading(false);
      return;
    }

    const isAlreadyShortened = isShortened();

    if (isAlreadyShortened) {
      console.log("Shortened");
      return;
    }
    try {
      const postUrlRes = await axios.post("http://localhost:3000/urls", {
        long_url: input,
      });
      console.log(postUrlRes, "postUrlRes");
      setShortenedUrls((prevState) => [...prevState, postUrlRes.data]);
    } catch (error) {
      console.log(error);
    }

    setInput("");
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
      <div className="container">
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
                  className="spinner"
                  secondaryColor={""}
                  thickness={200}
                  color={"#73EBAF"}
                />
              ) : (
                <button onClick={submitHandler}>Submit</button>
              )}
            </div>
          </div>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="error"></div>
          )}

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
                    <p></p>
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
      </div>
    </>
  );
}

export default UrlInput;
