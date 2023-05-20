import { useEffect } from "react";
import "./Grado.css";

export const Grado = () => {
    useEffect(() => {
      const cardsContainer = document.querySelector('.cards');
  
      cardsContainer.addEventListener('click', function (event) {
        const card = event.target.closest('.card');
        if (card) {
          toggleDropdown(card);
          event.stopPropagation();
        }
      });
  
      cardsContainer.addEventListener('mouseleave', function () {
        closeAllDropdowns();
      });
  
      function toggleDropdown(card) {
        const dropdown = card.querySelector('.dropdown-content');
        if (dropdown.style.display === 'none') {
          openDropdown(dropdown);
        } else {
          closeDropdown(dropdown);
        }
      }
  
      function openDropdown(dropdown) {
        dropdown.style.display = 'block';
      }
  
      function closeDropdown(dropdown) {
        dropdown.style.display = 'none';
      }
  
      function closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function (dropdown) {
          closeDropdown(dropdown);
        });
      }
    }, []);
  

  return (
    <div className="content">
    <div className="cards">
      <div className="card">
        <div className="box">
          <h3>GRADO</h3>
          <h1> PRIMERO</h1>
        </div>
        <div className="icon-case">
          <i className="bx bx-book-bookmark"></i>
        </div>
      </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1> SEGUNDO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>TERCERO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1> CUARTO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>QUINTO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>SEXTO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
          <div className="dropdown-content">
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 6-1</span></a>
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 6-2</span></a>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>SÉPTIMO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
          <div className="dropdown-content">
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 7-1</span></a>
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 7-2</span></a>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>OCTAVO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
          <div className="dropdown-content">
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 8-1</span></a>
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 8-2</span></a>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>NOVENO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
          <div className="dropdown-content">
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 9-1</span></a>
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 9-2</span></a>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>DÉCIMO</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
          <div className="dropdown-content">
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 10-1</span></a>
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 10-2</span></a>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <h3>GRADO</h3>
            <h1>ONCE</h1>
          </div>
          <div className="icon-case">
            <i className='bx bx-book-bookmark'></i>
          </div>
          <div className="dropdown-content">
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 11-1</span></a>
            <a href="#"><i className='bx bxs-user-check' style={{ color: '#464646' }}></i><span className="icon-text">Grado 11-2</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}

