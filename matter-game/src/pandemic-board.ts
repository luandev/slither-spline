import cytoscape, { CollectionReturnValue, Position } from "cytoscape";
const container = document.createElement('div');
container.id = 'cy';
container.style.width = '100vw';
container.style.height = '100vw';
document.body.append(container);


const cy = cytoscape({
  container: document.getElementById("cy"),

  elements: [    
  ],

  layout: {
    name: "preset",
  },

  // so we can see the ids
  style: [
    {
      selector: "node",
      style: {
        label: "data(id)",
      },
    },
  ],
});

const cityList = [
  { name: 'Algiers', neighbors: ['Atlanta', 'Baghdad'], type: 'BK'},
  { name: 'Atlanta', neighbors: ['Bangkok','Cairo'], type: 'BL'},
  { name: 'Baghdad', neighbors: ['Bangkok', 'Istanbul'], type: 'YL'},
  { name: 'Bangkok', neighbors: [], type: 'RD'},
  { name: 'Beijing', neighbors: [], type: 'RD'},
  { name: 'Bogota', neighbors: [], type: 'YL'},
  { name: 'Buenos Aries', neighbors: [], type: 'YL'},
  { name: 'Cairo', neighbors: [], type: 'BK'},
  { name: 'Chennai', neighbors: [], type: 'BK'},
  { name: 'Chicago', neighbors: [], type: 'BL'},
  { name: 'Delhi', neighbors: [], type: 'BK'},
  { name: 'Essen', neighbors: [], type: 'BL'},
  { name: 'Ho Chi Minh City', neighbors: [], type: 'RD'},
  { name: 'Hong Kong', neighbors: [], type: 'RD'},
  { name: 'Istanbul', neighbors: [], type: 'BK'},
  { name: 'Jakarta', neighbors: [], type: 'RD'},
  { name: 'Johannesburg', neighbors: [], type: 'YL'},
  { name: 'Karachi', neighbors: [], type: 'YL'},
  { name: 'Khartoum', neighbors: [], type: 'YL'},
  { name: 'Kinshasa', neighbors: [], type: 'YL'},
  { name: 'Kolkata', neighbors: [], type: 'BL'},
  { name: 'Lagos', neighbors: [], type: 'YL'},
  { name: 'Lima', neighbors: [], type: 'YL'},
  { name: 'London', neighbors: [], type: 'BL'},
  { name: 'Los Angeles', neighbors: [], type: 'BL'},
  { name: 'Madrid', neighbors: [], type: 'BL'},
  { name: 'Manila', neighbors: [], type: 'RD'},
  { name: 'Mexico City', neighbors: [], type: 'YL'},
  { name: 'Miami', neighbors: [], type: 'YL'},
  { name: 'Milan', neighbors: [], type: 'BL'},
  { name: 'Montreal', neighbors: [], type: 'BL'},
  { name: 'Moscow', neighbors: [], type: 'BK'},
  { name: 'Mumbai', neighbors: [], type: 'BK'},
  { name: 'New York', neighbors: [], type: 'BL'},
  { name: 'Osaka', neighbors: [], type: 'RD'},
  { name: 'Paris', neighbors: [], type: 'BL'},
  { name: 'Riyadh', neighbors: [], type: 'BK'},
  { name: 'San Francisco', neighbors: [], type: 'BL'},
  { name: 'Santiago', neighbors: [], type: 'YL'},
  { name: 'Sao Paulo', neighbors: [], type: 'YL'},
  { name: 'Seoul', neighbors: [], type: 'RD'},
  { name: 'Shanghai', neighbors: [], type: 'RD'},
  { name: 'St. Petersburg', neighbors: [], type: 'BL'},
  { name: 'Sydney', neighbors: [], type: 'RD'},
  { name: 'Taipei', neighbors: [], type: 'RD'},
  { name: 'Tehran', neighbors: [], type: 'BK'},
  { name: 'Tokyo', neighbors: [], type: 'RD'},
  { name: 'Washington', neighbors: [], type: 'BL'},
]

const cities:Array<City> = [];
for (let index = 0; index < cityList.length; index++) {
  setTimeout(() => {
    const c = cityList[index];
    cities.push(new City(c.name, c.neighbors, c.type, {x: 25 * index, y: 25 * index}));
  }, (index / 0.3) + 1000 )
}



class City {
  name: string;
  neighbors: string[];
  type: string;
  elem: CollectionReturnValue;
  edges: Array<CollectionReturnValue> = [];

  constructor(name: string, neighbors: Array<string>, type: 'RD'|'BK'|'BL'|'YW', position: Position) {
    this.name = name;
    this.neighbors = neighbors;
    this.type = type;
    this.elem = cy.add({// node n1
      data: {
        // element data (put json serialisable dev data here)
        id: name, // mandatory (string) id for each element, assigned automatically on undefined
      },

      selected: false, // whether the element is selected (default false)
      selectable: true, // whether the selection state is mutable (default true)
      locked: true, // when locked a node's position is immutable (default false)
      position,
    });
    neighbors.forEach(n => {
      this.edges.push(cy.add({
        data: {
          id: `${name}_${n}`,
          source: name, // the source node id (edge comes from this node)
          target: n, // the target node id (edge goes to this node)
        },
      }))
    })
  }
}