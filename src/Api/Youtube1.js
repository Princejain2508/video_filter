import Axios from "axios";

const key = "AIzaSyDG51ClJisgCxdz3AVjbhm795hVhpSK_AU";

export default Axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet,statistics",
    type: "video",
    maxResults: 10,
    key: key,
  },
});
