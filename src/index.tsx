import React from "react";
import Router from "./routes/Router";
import { useLoading } from "./hooks/useLoading";
import Spinner from "./components/spinner";

export default function App() {

    const { isLoading } = useLoading();

    return (<>
        <Router/>
        {isLoading && <Spinner/>}   
    </>
    );
  
}
