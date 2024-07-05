import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import { LazyPageWrapper } from "./Components/Common/LazyPageWrapper/LazyPageWrapper";
import { CenteredCircularProgress } from "./Components/Common/CenteredCircularProgress/CenteredCircularProgress";
// **Auth**//
const Login = lazy(() => import("./Pages/Auth/Login/Index"));
const Register = lazy(() => import("./Pages/Auth/Register/Index"));
// **Page not Found**//
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"));
// **main** //
const Main = lazy(() => import("./Pages/Main/Index"));
// ??Analytics
const Analytics = lazy(() => import("./Pages/Main/Analytics/Index"));
// ??Categories
const Categories = lazy(() =>
  import("./Pages/Main/Categories/CategoriesLanding/Index")
);
const AddCategory = lazy(() =>
  import("./Pages/Main/Categories/AddCategory/Index")
);
const UpdateCategory = lazy(() =>
  import("./Pages/Main/Categories/UpdateCategory/Index")
);
const Category = lazy(() =>
  import("./Pages/Main/Categories/Category[Id]/Index")
);
// ?? Products
const Products = lazy(() =>
  import("./Pages/Main/Products/ProductsLanding/ProductsLanding")
);
const AddProduct = lazy(() => import("./Pages/Main/Products/AddProduct/Index"));
const Product = lazy(() => import("./Pages/Main/Products/Product[id]/Index"));
const UpdateProduct = lazy(() =>
  import("./Pages/Main/Products/UpdateProduct/Index")
);
// ?? Events
const Events = lazy(() => import("./Pages/Main/Events/EventsLanding/Index"));
const EventsAdd = lazy(() => import("./Pages/Main/Events/AddEvent/Index"));
const EventUpdate = lazy(() => import("./Pages/Main/Events/UpdateEvent/Index"));
function App() {
  return (
    <>
      <Suspense fallback={<CenteredCircularProgress />}>
        <Routes>
          <Route
            path="/login"
            element={
              <LazyPageWrapper>
                <Login />
              </LazyPageWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <LazyPageWrapper>
                <Register />
              </LazyPageWrapper>
            }
          />
          <Route
            path="/"
            element={
              <LazyPageWrapper>
                <Main />
              </LazyPageWrapper>
            }
          >
            <Route
              path="*"
              element={
                <LazyPageWrapper>
                  <PageNotFound />
                </LazyPageWrapper>
              }
            />
            <Route
              index
              element={
                <LazyPageWrapper>
                  <Analytics />
                </LazyPageWrapper>
              }
            />
            <Route
              path="/analytics"
              element={
                <LazyPageWrapper>
                  <Analytics />
                </LazyPageWrapper>
              }
            />
            <Route
              path="/categories"
              element={
                <LazyPageWrapper>
                  <Categories />
                </LazyPageWrapper>
              }
            />
            <Route
              path="/categories/add"
              element={
                <LazyPageWrapper>
                  <AddCategory />
                </LazyPageWrapper>
              }
            />
            <Route
              path="/categories/update/:categoryId"
              element={
                <LazyPageWrapper>
                  <UpdateCategory />
                </LazyPageWrapper>
              }
            />
            <Route
              path="/categories/:categoryId"
              element={
                <LazyPageWrapper>
                  <Category />
                </LazyPageWrapper>
              }
            >
              <Route
                path="updateCategory"
                element={
                  <LazyPageWrapper>
                    <UpdateCategory />
                  </LazyPageWrapper>
                }
              />
              <Route
                index
                element={
                  <LazyPageWrapper>
                    <Products />
                  </LazyPageWrapper>
                }
              />
              <Route
                path="products"
                element={
                  <LazyPageWrapper>
                    <Products />
                  </LazyPageWrapper>
                }
              />
              <Route
                path="products/add"
                element={
                  <LazyPageWrapper>
                    <AddProduct />
                  </LazyPageWrapper>
                }
              />
            </Route>
            <Route
              path="/categories/:categoryId/products/:productId"
              element={
                <LazyPageWrapper>
                  <Product />
                </LazyPageWrapper>
              }
            >
              <Route path="comments" />
              <Route path="updateProduct" element={<UpdateProduct />} />
            </Route>
            <Route
              path="/categories/:categoryId/products/updateProduct/:productId"
              element={<UpdateProduct />}
            />
            <Route path="/events">
              <Route index element={<Events />} />
              <Route path="add" element={<EventsAdd />} />
              <Route path="update/:id" element={<EventUpdate />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
