const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const DisplayContext = React.createContext(null);



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3OfDUQ2GCUu8Ty6GgIJMVsHBHT6Y14SE",
    authDomain: "badbank-mern.firebaseapp.com",
    projectId: "badbank-mern",
    storageBucket: "badbank-mern.appspot.com",
    messagingSenderId: "501005580161",
    appId: "1:501005580161:web:ce356c73ac2aa6e3f71a80",
    measurementId: "G-WZDKBHG3YN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "25rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
