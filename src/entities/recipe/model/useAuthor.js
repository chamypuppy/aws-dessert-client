import axios from "axios";
import { useEffect, useState } from "react";

export const useAuthor = (author_id) => {

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const authorNameSync = async() => {

      try {
        const result = await axios.get(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/username`, 
        { params: {author: author_id} });

        console.log("🟠🟠🟠", result.data);
        if(!result) console.log("🟡 useAuthor: data 불러오기 오류");
        setUserName(result.data.users_name);
        
      } catch(error) {
        console.log("🟡 useAuthor: ", error);
        setLoading(false);
        setError(true);
      }

    };

    authorNameSync();
  }, [author_id]);

  return { userName, loading, error };
};