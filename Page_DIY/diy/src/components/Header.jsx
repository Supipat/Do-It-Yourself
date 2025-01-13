import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // ใช้ useNavigate สำหรับเปลี่ยนเส้นทาง

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [searchButtonHover, setSearchButtonHover] = useState(false); // State สำหรับปุ่มค้นหา

  // ฟังก์ชันสำหรับจัดการการค้นหา
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <header style={{ backgroundColor: "#fff4b3" }}>
      <div className="d-flex flex-column align-items-start">
        <div className="d-flex w-100">
          <Link className="navbar-brand" to="/">
          <img
            src="/images/LOGO.png"
            alt="Logo"
            width="105"
            height="90"
            style={{ marginLeft: "25px", marginTop: "5px" }}
          />
          </Link>

          <div className="headNav mt-3 mx-4 w-100">
            <div className="search w-100 d-flex align-items-center">
              <form onSubmit={handleSearchSubmit} className="d-flex" style={{ width: "100%" }}>
                <input
                  className="form-control me-2 w-100"
                  type="search"
                  placeholder="ค้นหาสินค้า"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search"
                  style={{ flexGrow: 1, marginLeft: "10px" }}
                />
                <button
                  className="btn"
                  type="submit"
                  style={{
                    color: searchButtonHover ? "#ffffff" : "#2b70e0",
                    border: `2px solid ${searchButtonHover ? "#2b70e0" : "#4a90e2"}`,
                    backgroundColor: searchButtonHover ? "#2b70e0" : "transparent",
                  }}
                  onMouseEnter={() => setSearchButtonHover(true)} // เมื่อเมาส์เข้า
                  onMouseLeave={() => setSearchButtonHover(false)} // เมื่อเมาส์ออก
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="nav nav-underline">
                  <li className="nav-item">
                      <Link className="nav-link" to={`/`} style={{ color: "#2b70e0", fontSize: "15px" }}>หน้าหลัก</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={`/categories/1`} style={{ color: "#2b70e0", fontSize: "15px" }}>เครื่องประดับ</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={`/categories/2`} style={{ color: "#2b70e0", fontSize: "15px" }}>กำไล</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={`/categories/4`} style={{ color: "#2b70e0", fontSize: "15px" }}>กระเป๋า</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={`/categories/5`} style={{ color: "#2b70e0", fontSize: "15px" }}>พวงกุญแจ</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={`/categories/8`} style={{ color: "#2b70e0", fontSize: "15px" }}>สร้อยข้อมือ</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={`/categories/9`} style={{ color: "#2b70e0", fontSize: "15px" }}>หมวก</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={`/categories/10`} style={{ color: "#2b70e0", fontSize: "15px" }}>จี้และเครื่องประดับเสริม</Link>
                    </li>

                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
