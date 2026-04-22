import Grafo from "../Class/grafos";

export const convertirAGrafoD3 = (grafo: Grafo) => {
  const nodes = [
    ...grafo.ciudades.map(c => ({
      id: c.id,
      label: c.nombreC,
      color: "green"
    })),
    ...grafo.personas.map(p => ({
      id: p.id,
      label: `${p.nombre} (${p.edad})`,
      color: "blue"
    }))
  ];

  const links: { source: string; target: string }[] = [];

  for (const key in grafo.adjList) {
    grafo.adjList[key].forEach(dest => {
      links.push({ source: key, target: dest });
    });
  }

  return { nodes, links };
};