/**
 * Visualizacion de datos y figuras
 * Geovanny Andrés González
 * Programación Web
 * 2019-20
 */

/**
 * Referencias utilizadas.
 * Para crear el gráfico de barras horizontal se utilizó de base la siguiente referencia:
 *      Usuario: https://bl.ocks.org/caravinden
 *      Recuperado de: https://bl.ocks.org/caravinden/eb0e5a2b38c8815919290fa838c6b63b
 * Para crear el grafico de puntos (scatterplot) se utilizo como base la referencia:
 *      Usuario: https://bl.ocks.org/sebg
 *      Recuperado de: https://bl.ocks.org/sebg/6f7f1dd55e0c52ce5ee0dac2b2769f4b
 * Para el grafico de barras se utilizó la referencia de la Wiki. 
 */

//Datos del reto #1
const data = [
  { name: "Juan", age: 3 },
  { name: "Fernanda", age: 16 },
  { name: "María", age: 7 },
  { name: "Sandra", age: 35 }
];

//Manipulación del DOM mediante el uso de d3.
const canvas = d3.select("#canvas");
const ul = canvas.append("ul");
ul.append("li").text("Item No. 1");

//Reto #1

//Construir la tabla
const tabla = () => {
  const table = canvas.append("table"); //Construir los encabezados de la tabla.
  const thead = table.append("thead");
  const tbody = table.append("tbody");

  thead.append("th").text("Name");
  thead.append("th").text("Age");

  //Ingresar los datos.
  const tr = tbody
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");
  const td = tr
    .selectAll("td")
    .data(d => {
      return [d.name, d.age];
    })
    .enter()
    .append("td")
    .text(d => {
      return d;
    });

  console.log("D3", d3);
};

//Reto #2
//Realizar un gráfico de barras con los datos.

const generarGrafico = (data, title) => {
  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  //Poner el titulo
  const h2 = canvas.append("h2");
  h2.text(title);

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const y = d3
    .scaleLinear()
    .domain([0, 30])
    .range([iheight, 0]);

  const x = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([0, iwidth])
    .padding(0.1);

  const bars = g.selectAll("rect").data(data);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.age))
    .attr("height", d => iheight - y(d.age))
    .attr("width", x.bandwidth());

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));
};

const barrasHorizontal = (pData, title) => {
  //Poner el titulo
  const h2 = canvas.append("h2");
  h2.text(title);

  let data = pData;
  data = data.sort((a, b) => {
    //Toma los valores, parsea a entero y compara
    let aValue = parseInt(a.value);
    let bValue = parseInt(b.value);
    return aValue < bValue ? -1 : 1;
  });

  console.log("Datos Ordenados", data);

  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  const y = d3
    .scaleBand()
    .range([height, 0])
    .padding(0.1);

  const x = d3.scaleLinear().range([0, width]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = canvas
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data in the domains
  x.domain([
    0,
    d3.max(data, function(d) {
      return d.value;
    })
  ]);
  y.domain(
    data.map(function(d) {
      return d.name;
    })
  );
  //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    //.attr("x", function(d) { return x(d.sales); })
    .attr("width", function(d) {
      return x(d.value);
    })
    .attr("y", function(d) {
      return y(d.name);
    })
    .attr("height", y.bandwidth());

  // add the x Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g").call(d3.axisLeft(y));
};

const scatterplot = (pData, title) => {
  //Poner el titulo
  const h2 = canvas.append("h2");
  h2.text(title);   

  let data = pData;  
  const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  
  const svg = canvas.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Parsear los datos a valores enteros.
  let maxPopulation = 0; //El radio de 1 lo tendra el circulo con mayor poblacion.

  data.forEach(function(d) {
    d.purchasingpower = +d.purchasingpower;
    d.lifeexpectancy = +d.lifeexpectancy;
    d.population= +d.population;
    maxPopulation = Math.max(d.population, maxPopulation); //Obtener el maximo.
  });

  console.log("Datos Reto 4", data);
  console.log("Maximo", maxPopulation);  

  x.domain(
    d3.extent(data, function(d) {
      return d.purchasingpower;
    })
  ).nice();
  y.domain(
    d3.extent(data, function(d) {
      return d.lifeexpectancy;
    })
  ).nice();

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Sepal Width (cm)");

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Sepal Length (cm)");

    svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 12)
    .attr("cx", function(d) {
      return x(d.purchasingpower);
    })
    .attr("cy", function(d) {
      return y(d.lifeexpectancy);
    })
    .style("fill", "rgb(255,87,51)");

  const legend = svg
    .selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
      return "translate(0," + i * 20 + ")";
    });

  legend
    .append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) {
      return d;
    });  
};

//Visualizar graficos y figuras.
tabla();
generarGrafico(data, "Friends Age Comparison");

//Reto #3: Traer los datos de la URL.
let url =
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";
d3.json(url).then(data => {
  console.log("Datos", data);
  barrasHorizontal(data, "Numero de refugiados por país");
});

//Reto #4: Grafico de puntos.
let url_reto_4 = "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";
d3.json(url_reto_4).then(data => {
    console.log("Datos Reto 4", data);
    scatterplot(data, "Estadisticas Paises");
});
