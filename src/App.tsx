import * as React from "react";
import "./styles.css";
import { Form } from "react-final-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory
} from "react-router-dom";
import {
  CityPageLoadable,
  NumberPageLoadable,
  StreetPageLoadable,
  ZipPageLoadable
} from "./pages/index";
import { AnimatedContainer } from "./components/AnimatedContainer";

type WizardProps = {
  children: any;
};

function childrenToRoute(children: any, props: any): Route[] {
  return React.Children.map(children, (child, index) => {
    if (Array.isArray(child.props.children)) {
      return childrenToRoute(child.props.children, props);
    }
    return (
      <Route
        path={child.props.path}
        render={() => React.cloneElement(child, props)}
      />
    );
  });
}

function Wizard(props: WizardProps) {
  const location = useLocation();
  const history = useHistory();
  const children: any[] = React.Children.toArray(props.children);
  const [childIndex, setChildIndex] = React.useState(0);
  const [draft, setDraft] = React.useState({});
  const [loadingChunk, setLoadingChunk] = React.useState(false);

  // @ts-ignore
  const flatChildren = children.flatMap((el: any) =>
    Array.isArray(el.props.children) ? el.props.children : el
  );

  React.useEffect(() => {
    const index = flatChildren.findIndex(
      (child: any) => child.props.path === location.pathname
    );

    if (index >= 0) {
      setChildIndex(index);
    }
    if (flatChildren[index] && flatChildren[index].type.preload) {
      console.log("loading");
      setLoadingChunk(true);
      flatChildren[index].type.load().then(() => {
        setLoadingChunk(false);
      });
    }
  }, [location.pathname]); // eslint-disable-line

  function nextStep() {
    const nextIndex = childIndex + 1;
    if (flatChildren[nextIndex] && flatChildren[nextIndex].props.path) {
      history.push(flatChildren[nextIndex].props.path);
    }
  }

  function handleSubmit(form: any) {
    setDraft(form);
    nextStep();
  }

  console.log(children[childIndex].type.validateForm);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <AnimatedContainer>
          <div>{loadingChunk ? "loading chunk..." : "chunk loaded"}</div>
          <Form
            onSubmit={handleSubmit}
            initialValues={draft}
            validate={
              children[childIndex] && children[childIndex].type.validateForm
            }
          >
            {({ handleSubmit }) => (
              <Switch location={location}>
                {childrenToRoute(props.children, {
                  nextStep,
                  onSubmit: handleSubmit
                })}
              </Switch>
            )}
          </Form>
        </AnimatedContainer>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  return (
    <div className="App font-sans w-full max-w-xs mx-auto">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        type="button"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? "Showing mobile steps" : "Showing desktop steps"}
      </button>
      <BrowserRouter>
        <Redirect exact from="/" to="/street" />
        <Route path="/">
          <Wizard>
            <StreetPageLoadable path="/street" />
            <NumberPageLoadable path="/number" />
            <ZipPageLoadable path="/zip" />
            {isMobile ? (
              <React.Fragment>
                <Redirect path="/summary" to="/summary-details" />
                <CityPageLoadable path="/summary-details" />
                <ZipPageLoadable path="/summary-cart" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Redirect path="/summary-details" to="/summary" />
                <Redirect path="/summary-cart" to="/summary" />
                <NumberPageLoadable path="/summary" />
              </React.Fragment>
            )}
            <CityPageLoadable path="/city" />
          </Wizard>
        </Route>
      </BrowserRouter>
    </div>
  );
}
