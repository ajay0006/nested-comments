import PostLists from "./Components/PostLists";
import {Route, Routes} from "react-router-dom";
import Post from "./Components/Post";
import PostProvider from "./Context/PostContext";

function App() {
    return (
        <div className='container'>
            <Routes>
                <Route path="/" element={<PostLists/>}/>
                <Route
                    // all of this just allows the props available to one component to be available to every component rendered underneath it aka its child
                    path="/posts/:id"
                    element={
                        // basically Post will have the props of PostContext aka PostProvider, thats why i named it that, as it provides the post data
                        <PostProvider>
                            <Post/>
                        </PostProvider>}
                />

            </Routes>
        </div>
    )
}

export default App