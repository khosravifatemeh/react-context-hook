import React, { useReducer, useContext, useEffect } from "react";
import Card from "components/Card";
import { AuthContext } from "App";
const initialState = {
  songs: [],
  isFetching: false,
  hasError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SONGS_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_SONGS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        songs: action.payload,
      };
    case "FETCH_SONGS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };

    default:
      return state;
  }
};

const Home = () => {
  const { state: authState } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "FETCH_SONGS_REQUEST" });
    try {
      const fetchData = async () => {
        return await (
          await fetch("https://hookedbe.herokuapp.com/api/songs", {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          })
        ).json();
      };
      const response = fetchData().then((response) =>
        dispatch({ type: "FETCH_SONGS_SUCCESS", payload: response })
      );
    } catch (error) {
      dispatch({
        type: "FETCH_SONGS_FAILURE",
      });
    }
  }, [authState.token]);
  return (
    <div className="home">
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          {state.songs.length > 0 &&
            state.songs.map((song, index) => <Card key={index} song={song} />)}
        </>
      )}
    </div>
  );
};
export default Home;
