import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./styles/styles.css";
import Navbar from "./pages/Navbar";
import Home, { homeLoader } from "./pages/Home";
import CharactersAndItems, {
  characterLoader,
} from "./pages/CharactersAndItems";
import { characterCreate } from "./components/charactersPage/CreateCharacter";
import { characterDelete } from "./components/charactersPage/Characters";
import { itemCreate } from "./components/charactersPage/CreateItem";
import { itemDelete } from "./components/charactersPage/Items";
import { countAction } from "./components/UI/countType/CountFormAction";
import { checkedAction } from "./components/UI/checkedType/CheckedFormAction";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} loader={homeLoader}></Route>
          <Route path="count/:id/:type/:term" action={countAction} />
          <Route path="check/:id/:type/:term" action={checkedAction} />
          <Route
            path="/characters"
            element={<CharactersAndItems />}
            loader={characterLoader}
          >
            <Route path="id/add" action={characterCreate} />
            <Route path=":id/delete" action={characterDelete} />
            <Route path="item/add" action={itemCreate} />
            <Route path=":type/:term/delete" action={itemDelete} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
