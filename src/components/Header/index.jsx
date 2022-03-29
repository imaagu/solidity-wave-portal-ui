import React from "react";

const Header = (props) => {
  const { userAccount, onConnect } = props;

  return (
    <div className="nav  justify-content-end  bg-light py-2 px-2">
      <div className="nav-item">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={onConnect}
          disabled={userAccount}
        >
          {userAccount ? `Connected` : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
