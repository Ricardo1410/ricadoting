"use strict";
(() => {
  // async functions
  const API = "http://localhost:5000";
  const API_SERVICE = `${API}/service`;
  const API_PARTNERS = `${API}/partner`;
  const API_PLANS = `${API}/plan`;

  const getService = async () => {
    try {
      const res = await fetch(API_SERVICE);
      const data = await res.json();
      printServices(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const getPartners = async () => {
    try {
      const res = await fetch(API_PARTNERS);
      const data = await res.json();
      printPartners(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const getPlans = async () => {
    try {
      const res = await fetch(API_PLANS);
      const data = await res.json();
      printPlans(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  // print functions

  const printServices = (services) => {
    services.forEach(({ titulo, descripcion }) => {
      const div = document.createElement("div");
      div.innerHTML = `
                      <h3 class="n-service"><span class="number">1</span>${titulo}</h3>
                      <p> ${descripcion}</p>
                      `;
      document
        .querySelector("#services")
        .appendChild(div)
        .classList.add("service");
    });
  };

  const printPartners = (partners) => {
    partners.forEach(({ imagen, nombre }) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <img src="${API}/${imagen}" alt="${nombre}">
      <h3 class="n-expert">${nombre}</h3>
                      `;
      document
        .querySelector("#partners")
        .appendChild(div)
        .classList.add("cont-expert");
    });
  };

  const printPlans = (plans) => {

    plans.forEach(({id_planes, tipo, precio,detalles }) => {
      const div = document.createElement("div");
      div.innerHTML = `
    <div class="price-box">
      <ul class="pricing-list" id="detalles">
        <li class="price-title">${tipo}</li>
        <li class="price-value">${precio}</li>
        <li class="price-subtitle">Per Month</li>
        ${detalles.filter(item => id_planes == item.id_planes ).map(({nombre})=>`
        <li class="price-text"> <i class="fas fa-check green"></i>${nombre}</li>
        `
        ).join('')}
        <li class="price-tag-line">
        <a href="#">Elegir plan</a>
      </li>
      </ul>
    </div>`
;

 
      document
        .querySelector("#planes")
        .appendChild(div)
        .classList.add("col-md-4");
    });
  };
  // ${detalles.forEach(({ nombre }) => {
  //   const li = document.createElement("li");
  //   li.innerHTML = `
  //     <i class="fas fa-check green"></i>
  //     ${nombre}
  //   `;
  //   document
  //     .querySelector("#detalles")
  //     .appendChild(li)
  //     .classList.add("price-text");
  // })}
  getPlans();
  getPartners();
  getService();
})();
