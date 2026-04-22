import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Grafo from "./Class/grafos";

export default function VerGrafo() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [grafo, setGrafo] = useState<Grafo | null>(null);
  const [ciudadInput, setCiudadInput] = useState("");
  const [personas, setPersonas] = useState<any[]>([]);

  useEffect(() => {
    const g = new Grafo();

    g.addCiudad({ id: "c1", nombreC: "Cali" });
    g.addCiudad({ id: "c2", nombreC: "Bogota" });

    g.addPersona({ id: "p1", nombre: "Juan", edad: 20, ciudad: "c1" });
    g.addPersona({ id: "p2", nombre: "Ana", edad: 25, ciudad: "c1" });
    g.addPersona({ id: "p3", nombre: "Luis", edad: 30, ciudad: "c2" });

    setGrafo(g);

    const nodes: any[] = [
      ...g.ciudades.map(c => ({ id: c.id, label: c.nombreC, tipo: "ciudad" })),
      ...g.personas.map(p => ({ id: p.id, label: p.nombre, tipo: "persona" }))
    ];

    const links: any[] = [];
    for (const key in g.adjList) {
        g.adjList[key].forEach(dest => {
        links.push({ source: key, target: dest });
      });
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(300, 200));

    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "gray");

    const node = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d: any) => d.tipo === "ciudad" ? "green" : "blue")
      .call(
        d3.drag<any, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (_, d: any) => {
        if (d.tipo === "ciudad") {
          setPersonas(g.personasPorCiudad(d.label));
        }
      });

    const label = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d: any) => d.label)
      .attr("font-size", 10);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x + 10)
        .attr("y", (d: any) => d.y);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, []);

  const buscar = () => {
    if (!grafo) return;
    setPersonas(grafo.personasPorCiudad(ciudadInput));
  };

  return (
    <div>
      <h2>Grafo con D3</h2>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Ciudad"
        value={ciudadInput}
        onChange={(e) => setCiudadInput(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>

      {/* LISTA */}
      <ul>
        {personas.map((p) => (
          <li key={p.id}>
            {p.nombre} - {p.edad}
          </li>
        ))}
      </ul>

      {/* SVG */}
      <svg ref={svgRef} width={600} height={400}></svg>
    </div>
  );
}