import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  documentId,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase_Config";

import { Button, TextField } from "@mui/material";

const FirebaseContactApp = () => {
  const [showAddBox, setShowAddBox] = useState(false);
  const [updatebox, setUpdateBox] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newname, setnewName] = useState("");
  const [newemail, setnewEmail] = useState("");
  const [list, setList] = useState([]);
  // const [searchContacts, setsearchContacts] = useState("");
  const [updatedid, setupdatedid] = useState("");
  const [filterlist, setfilterlist] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const show = () => {
    if (showAddBox === true) {
      setShowAddBox(false);
    } else {
      setShowAddBox(true);
    }
  };
  const updateshow = (id) => {
    console.log(id);
    setupdatedid(id);
    if (updatebox === true) {
      setUpdateBox(false);
    } else {
      setUpdateBox(true);
    }
  };
  // console.log(updatedid);

  const addData = async () => {
    const docRef = await addDoc(collection(db, "Contacts"), {
      name,
      email,
    });
    // console.log("Document written with ID: ", docRef.id);
    setShowAddBox(false);
    getData();
  };

  const deletedata = async (id) => {
    await deleteDoc(doc(db, "Contacts", id));
    getData();
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "Contacts"));
    const dataArray = [];

    querySnapshot.forEach((doc) => {
      dataArray.push({ ...doc.data(), id: doc.id });
    });

    setList(dataArray);
  };

  const updateData = async (id) => {
    const washingtonRef = doc(db, "Contacts", id);

    await updateDoc(washingtonRef, {
      name: newname,
      email: newemail,
    });
    setUpdateBox(false);
    getData();
  };
  const searchContact = (e) => {
    console.log(e);
    let filter = list.filter((item) => item.name.includes(e));
    console.log(filter);
    setfilterlist(filter);
    setShowFiltered(true);
  };
  // console.log(searchContact());

  return (
    <div className="FirebaseContactApp">
      <div className="Firebasebox">
        <div className="FirebaseTittle">
          <img src="LogoFirebase.png" alt="LogoFirebase" width={"40px"} />
          <h1>Firebase Contact App</h1>
        </div>
        <div className="SearchBox">
          <input
            type="text"
            placeholder="Serach Contact"
            // onInput={(e) => searchContact(e.target.value)}
            onChange={(e) => searchContact(e.target.value)}
          />
          <button onClick={show}>
            <img src="AddSymbol.png" alt="AddSymbol" />
          </button>
        </div>
        <div className="sohail">
          {showFiltered
            ? filterlist?.map((item) => {
                return (
                  <div key={Math.random()} className="contacts">
                    <img src="Contact.png" alt="Contact" width={"80px"} />
                    <div className="contactInfo">
                      <h3>{item.name}</h3>
                      <p>{item.email}</p>
                    </div>
                    <button onClick={() => updateshow(item.id)}>
                      <img src="Reset.png" alt="Reset" width={"40px"} />
                    </button>
                    <button onClick={() => deletedata(item.id)}>
                      <img src="Delete.png" alt="Delete" width={"50px"} />
                    </button>
                  </div>
                );
              })
            : list?.map((item) => {
                // console.log(item.id);
                return (
                  <div key={Math.random()} className="contacts">
                    <img src="Contact.png" alt="Contact" width={"80px"} />
                    <div className="contactInfo">
                      <h3>{item.name}</h3>
                      <p>{item.email}</p>
                    </div>
                    <button onClick={() => updateshow(item.id)}>
                      <img src="Reset.png" alt="Reset" width={"40px"} />
                    </button>
                    <button onClick={() => deletedata(item.id)}>
                      <img src="Delete.png" alt="Delete" width={"50px"} />
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      {showAddBox && (
        <div className="cont">
          <div className="contact_form">
            <h1>Contact Add</h1>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Button onClick={addData}>Add Contact</Button>
          </div>
        </div>
      )}

      {updatebox && (
        <div className="cont">
          <div className="contact_form">
            <h1>Update Contact</h1>
            <TextField
              label="Name"
              value={newname}
              onChange={(e) => setnewName(e.target.value)}
            />
            <br />
            <TextField
              label="Email"
              value={newemail}
              onChange={(e) => setnewEmail(e.target.value)}
            />
            <br />
            <Button onClick={() => updateData(updatedid)}>
              Update Contact
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseContactApp;
