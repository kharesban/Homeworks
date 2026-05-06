
import React, { Component } from 'react';
import { Heaps } from '../Heaps/Heaps';
import type { Product } from './productos';

interface Buscador {
    searchTerm: string;
    topK: number;
    results: Product[];
    allProducts: Product[];
}

export default class SearchEngine extends Component<{}, Buscador> {
    private heap: Heaps;

    constructor(props: {}) {
        super(props);
        
        this.heap = new Heaps();
        
        // Insertar productos del ejemplo
        this.heap.push({ name: "air max", popularity: 90 });
        this.heap.push({ name: "air force", popularity: 95 });
        this.heap.push({ name: "air jordan", popularity: 85 });
        this.heap.push({ name: "adidas boost", popularity: 80 });
        
        this.state = {
            searchTerm: '',
            topK: 2,
            results: [],
            allProducts: this.heap.toArray()
        };
    }

    handleSearch = (): void => {
        const { searchTerm, topK } = this.state;
        
        if (searchTerm.trim() === '') {
            this.setState({ results: [] });
            return;
        }
        
        
        const filtered: Product[] = this.heap.toArray().filter((product: Product) => 
            product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        
        const tempHeap: Heaps = new Heaps(filtered);
        const results: Product[] = tempHeap.getTopK(topK);
        
        this.setState({ results });
    };

    handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm: string = e.target.value;
        this.setState({ searchTerm }, () => {
            this.handleSearch();
        });
    };

    handleKChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value: number = parseInt(e.target.value);
        const topK: number = isNaN(value) ? 2 : Math.max(1, Math.min(10, value));
        this.setState({ topK }, () => {
            this.handleSearch();
        });
    };

    handleProductClick = (productName: string): void => {
        const allProducts: Product[] = this.heap.toArray();
        const product: Product | undefined = allProducts.find((p: Product) => p.name === productName);
        
        if (product) {
            const newHeap: Heaps = new Heaps();
            allProducts.forEach((p: Product) => {
                if (p.name === productName) {
                    newHeap.push({ name: p.name, popularity: p.popularity + 1 });
                } else {
                    newHeap.push(p);
                }
            });
            this.heap = newHeap;
            this.setState({ allProducts: this.heap.toArray() }, () => {
                this.handleSearch();
            });
        }
    };

    render() {
        const { searchTerm, topK, results, allProducts } = this.state;

        return (
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1>Buscador inteligente</h1>
                
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={this.handleSearchChange}
                        placeholder="Ej: air, adidas..."
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            width: '300px',
                            marginRight: '10px'
                        }}
                    />
                    
                    <label style={{ marginLeft: '10px' }}>
                        Top K:
                        <input
                            type="number"
                            value={topK}
                            onChange={this.handleKChange}
                            min={1}
                            max={10}
                            style={{ width: '60px', marginLeft: '5px', padding: '10px' }}
                        />
                    </label>
                </div>

                {searchTerm && (
                    <div style={{ marginBottom: '30px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
                        <h2>Resultados para "{searchTerm}" (Top {topK}):</h2>
                        {results.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {results.map((result: Product, index: number) => (
                                    <li 
                                        key={result.name as string}
                                        style={{
                                            padding: '10px',
                                            margin: '5px 0',
                                            background: 'white',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                        onClick={() => this.handleProductClick(result.name as string)}
                                    >
                                        <span>#{index + 1} {result.name}</span>
                                        <span>Popularidad: {result.popularity}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No se encontraron productos</p>
                        )}
                    </div>
                )}

                <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
                    <h3>Todos los productos:</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {allProducts.map((product: Product) => (
                            <li 
                                key={product.name as string}
                                style={{
                                    padding: '8px',
                                    margin: '5px 0',
                                    background: 'white',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                                onClick={() => this.handleProductClick(product.name as string)}
                            >
                                <span>{product.name}</span>
                                <span>Popularidad: {product.popularity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}