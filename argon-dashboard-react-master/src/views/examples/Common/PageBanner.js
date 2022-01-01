import React from "react";
import { Link } from "react-router-dom";

import "../css/style.css";
import "../css/responsive.css";
import "../css/rtl.css";

const PageBanner = ({
  pageTitle,
  homePageUrl,
  homePageText,
  activePageText,
  bgImage,
}) => {
  return (
    <div className={`page-title-area ${bgImage}`}>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="page-title-item">
            <h2>{pageTitle}</h2>
            <ul>
              <li>
                <Link to={homePageUrl}>
                  <a>{homePageText}</a>
                </Link>
              </li>
              <li className="active">{activePageText}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
