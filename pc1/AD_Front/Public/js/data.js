(() => {
    let firstTime = true;
    let apiEngine = "localhost:3004";
    console.log(apiEngine);
    const html_mapa = document.createElement('template');
    const html_drones = document.createElement('template');
    const html_clima = document.createElement('template');
    html_clima.innerHTML = `
            <style>
                ul {
                    font-family: Arial, Helvetica, sans-serif;
                    list-style-type: none;
                    font-size: 40px;
                }
            </style>
            <ul></ul>
    `;
    html_drones.innerHTML = `
            <style>
            </style>
            <ul></ul>
    `;
    html_mapa.innerHTML = `
            <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                    text-align: center;
                }
                th, td {
                    padding-top: 2px;
                    padding-bottom: 2px;
                    padding-left: 2px;
                    padding-right: 2px;
                }
                th {
                    background-color: lightblue;
                    color: black;
                }
            </style>
            <table>
                <thead>
                    <tr></tr>
                </thead>
                <tfoot>
                    <tr></tr>
                </tfoot>
                <tbody></tbody>
            </table>
        `;

    // Clase para el mapa
    class mapa extends HTMLElement {
        constructor() {
            super();
            let clone = html_mapa.content.cloneNode(true);
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(clone);
        }
        async connectedCallback() {
            if (firstTime) {
                let mapa = await this.getMapa();
                this.createTable(mapa);
                firstTime = false;
            }
            setInterval(async () => {
                let tbody = this.shadowRoot.querySelector('tbody');
                tbody.innerHTML = "";
                let mapa = await this.getMapa();
                this.createTable(mapa);
            }, 1000); // Cada 10 segundos
        }
        async getMapa() {
            let response = await fetch(`http://${apiEngine}/mapa`);
            let data = await response.json();
            return data;
        }
        createTable(map) {
            let tbody = this.shadowRoot.querySelector('tbody');
            let theadTr = this.shadowRoot.querySelector('thead tr');
            let tfootTr = this.shadowRoot.querySelector('tfoot tr');
            theadTr.innerHTML = "<th></th>";
            tfootTr.innerHTML = "<th></th>";
            for (let i = 0; i < 20; i++) {
                theadTr.innerHTML += `<th>${i + 1}</th>`;
                tfootTr.innerHTML += `<th>${i + 1}</th>`;
            }
            for (let i = 0; i < 20; i++) {
                let row = document.createElement('tr');
                row.innerHTML = `<th>${i + 1}</th>`;
                for (let j = 0; j < 20; j++) {
                    let cell = document.createElement('td');
                    if (Array.isArray(map[i][j])) {
                        let id = map[i][j][0];
                        let estado = map[i][j][1];
                        cell.innerText = id;
                        cell.style.background = estado ? 'red' : 'green';
                        cell.style.color = 'white';
                    } else {
                        cell.innerHTML = "&nbsp;";
                    }
                    row.appendChild(cell);
                }
                tbody.appendChild(row);
            }
        }

    }

    customElements.define('ad-mapa', mapa);

    // Clase para los drones
    class drones extends HTMLElement {
        constructor() {
            super();
            let clone = html_drones.content.cloneNode(true);
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(clone);
        }
        async connectedCallback() {
            if (firstTime) {
                let drones = await this.get_drones();
                this.createList(drones);
                firstTime = false;
            }
            setInterval(async () => {
                let ul = this.shadowRoot.querySelector('ul');
                ul.innerHTML = '';
                let drones = await this.get_drones();
                this.createList(drones);
            }, 10000); // Cada 10 segundos
        }
        async get_drones() {
            let response = await fetch(`http://${apiEngine}/drones`);
            let data = await response.json();
            return data;
        }
        createList(drones) {
            let ul = this.shadowRoot.querySelector('ul');
            drones.forEach(dron => {
                let li = document.createElement('li');
                let id = dron[0];
                let estado = dron[2];
                li.innerText = `ID: ${id} Estado: ${estado ? 'RUN' : 'END'}`;
                ul.appendChild(li);
            });
        }
    }

    customElements.define('ad-drones', drones);

    // Clase para el clima
    class clima extends HTMLElement {
        constructor() {
            super();
            let clone = html_clima.content.cloneNode(true);
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(clone);
        }
        async connectedCallback() {
            if (firstTime) {
                let clima = await this.get_clima();
                this.createList(clima);
                firstTime = false;
            }
            setInterval(async () => {
                let ul = this.shadowRoot.querySelector('ul');
                ul.innerHTML = '';
                let clima = await this.get_clima();
                this.createList(clima);
            }, 10000); // Cada 10 segundos
        }
        async get_clima() {
            let response = await fetch(`http://${apiEngine}/clima`);
            let data = await response.json();
            return data;
        }
        createList(clima) {
            let ul = this.shadowRoot.querySelector('ul');
            let li = document.createElement('li');
            let li2 = document.createElement('li');
            let ciudad = clima.ciudad;
            let temp = clima.clima;
            li.innerText = "Ciudad: " + ciudad;
            li2.innerText = "Temperatura: " + Math.round(temp) + "°C";
            ul.appendChild(li);
            ul.appendChild(li2);
        }
    }

    customElements.define('ad-clima', clima);

})();

