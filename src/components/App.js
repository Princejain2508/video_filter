import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Youtube from "../Api/Youtube";
import Youtube1 from "../Api/Youtube1";
import VideoDetails from "./VideoDetails";
import VideoList from "./VideoList";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("Nature");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    async function onSubmitSearch(text) {
      var response = await Youtube.get("/search", {
        params: {
          q: text,
        },
      });

      const videoIds = response.data.items.map((video) => video.id.videoId);

      const stats = await Promise.all(
        videoIds.map((element) => {
          return (async function (element) {
            let superResponse = await Youtube1.get("/videos", {
              params: {
                id: element,
              },
            });
            return superResponse.data.items[0];
          })(element);
        })
      );
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
      setStatsData(stats);
    }
    onSubmitSearch(searchTerm);
  }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ui container">
      <SearchBar onSubmit={(term) => setSearchTerm(term)} />
      <VideoDetails video={selectedVideo} />
      <div className="ui segment">
        {" "}
        Videos :
        <VideoList
          videos={videos}
          onVideoSelect={(video) => setSelectedVideo(video)}
          videosStats={statsData}
        />
      </div>
    </div>
  );
};

export default App;
