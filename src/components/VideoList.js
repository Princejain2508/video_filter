import React, { useState, useEffect } from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, onVideoSelect, videosStats }) => {
  const [video, setVideo] = useState([]);
  const [renderVideos, setRenderVideos] = useState([]);
  const [fromYear, setFromYear] = useState(0);
  const [toYear, setToYear] = useState(0);
  const [minLikes, setMinLikes] = useState(0);
  const [minViews, setMinViews] = useState(0);

  useEffect(() => {
    const result = videos.map((ele, i) => {
      videosStats.map((item, index) => {
        if (i === index) {
          ele.statsData = item.statistics;
        }
        return null;
      });
      return ele;
    });
    setVideo(result);
    setFromYear(0);
    setToYear(0);
    setMinLikes(0);
    setMinLikes(0);
    onFilterRender();
  }, [videos, videosStats]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFilterRender = () => {
    let response = video.map((element) => {
      const [date, views, likes] = [
        parseInt((element.snippet?.publishTime).slice(0, 5)),
        parseInt(element.statsData?.viewCount),
        parseInt(element.statsData?.likeCount),
      ];
      if (fromYear !== 0 && fromYear > date) return null;
      else if (toYear !== 0 && toYear < date) return null;
      else if (minLikes !== 0 && minLikes > likes) return null;
      else if (!minViews !== 0 && minViews > views) return null;
      else
        return (
          <VideoItem
            key={element.id.videoId}
            video={element}
            onVideoSelect={onVideoSelect}
          />
        );
    });
    setRenderVideos(response);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    onFilterRender();
  };
  return (
    <div className="ui grid">
      <div className="ten wide column">
        <div className="ui list">{renderVideos}</div>
      </div>
      <div className="six wide column">
        <div className="ui segment">
          <form className="ui form" onSubmit={(e) => onFormSubmit(e)}>
            <div className="field">
              <h3>Filters:</h3>
            </div>
            <div className="date field">
              <h4>Date:</h4>
              <div className="field">
                <label>From</label>
                <input
                  type="number"
                  name="first-name"
                  placeholder="Year"
                  value={fromYear}
                  onChange={(e) => setFromYear(e.target.value)}
                />
              </div>
              <div className="field">
                <label>To</label>
                <input
                  type="number"
                  name="To"
                  placeholder="Year"
                  value={toYear}
                  onChange={(e) => setToYear(e.target.value)}
                />
              </div>
            </div>
            <div className="Stats field">
              <h4>Stats :</h4>
              <div className="field">
                <label>Minimum View Count :</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minViews}
                  onChange={(e) => setMinViews(e.target.value)}
                ></input>
              </div>
              <div className="field">
                <label>Minimum Likes Count :</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minLikes}
                  onChange={(e) => setMinLikes(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="field">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
