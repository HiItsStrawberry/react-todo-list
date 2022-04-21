import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className='wrapper'>
        <div className='content flex'>
          <h3>ToDo List</h3>
          <div className='flex'>
            <Link to='/'>home</Link>
            <Link to='/add-task'>add task</Link>
            <Link to='/history'>history</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
