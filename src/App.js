import {PostLists} from "./components/PostLists";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className='container'>
            <Routes>
                <Route path="/" element={<PostLists/>}/>
                <Route path="/posts/:id" element={<h1> Posts </h1>}/>
            </Routes>
        </div>)
}

export default App;
