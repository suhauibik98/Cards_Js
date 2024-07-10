import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import "../style/layout.scss";
const Layout = () => {
  const [spin, setSpin] = useState(false);
  const [card, setCard] = useState([]);
  const nav = useNavigate();

  const gatAllCards = async () => {
    setSpin(true);
    try {
      const res = await axios.get("http://10.10.30.30:5000/api/cards/get-all");
      setCard(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSpin(false);
    }
  };

  const handlerUpdateCard = async (id) => {
    // nav("/cardForm")
    try {
      const res = await axios.get(
        `http://10.10.30.30:5000/api/cards/update-card/${id}`
      );
      console.log(res.data);
      nav("/cardForm", { state: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  const handlerDeleteCard = async (id) => {
    try {
      await axios.delete(`http://10.10.30.30:5000/api/cards/del-card/${id}`);
      setCard(card.filter((value) => value._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    gatAllCards();
  }, []);
  let add = (<>
  <button className="CartBtn">
  <span className="IconContainer"> 
  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg>
  </span>
  <p className="text">Add new Card</p>
</button>
  </>)
  return (
    <>
    <div className="add-form">
      <Link to="/cardForm">{add}</Link>
    </div>
    <div className="side">



    
      {spin && <Spinner />}
      <div className="side1">
        {card.map((card, i) => (
          <div key={i}>
            <Cards
              key={i}
              card={card}
              Delete={() => handlerDeleteCard(card._id)}
              Update={() => handlerUpdateCard(card._id)}
            />
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default Layout;
