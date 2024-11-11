import { useState } from "react";
import useCharacters from "./hooks/useCharacters";
import Link from "next/link";

const Home = () => {
    const [filters, setFilters] = useState({
        name: "",
        status: "",
        species: "",
        gender: "",
        page: 1,
    });

    const { characters, loading, error, totalPages } = useCharacters(filters);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
            page: 1,  // Resetar para a primeira página em cada filtro
        });
    };

    const changePage = (newPage: number) => {
        setFilters((prevFilters) => ({ ...prevFilters, page: newPage }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Personagens</h1>

            {/* Filtros */}
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={filters.name}
                    onChange={handleInputChange}
                    className="border p-2"
                />
                <select name="status" value={filters.status} onChange={handleInputChange} className="border p-2">
                    <option value="">Status</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <select name="species" value={filters.species} onChange={handleInputChange} className="border p-2">
                    <option value="">Espécie</option>
                    <option value="Human">Human</option>
                    <option value="Alien">Alien</option>
                </select>
                <select name="gender" value={filters.gender} onChange={handleInputChange} className="border p-2">
                    <option value="">Gênero</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            {/* Lista de Personagens */}
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {characters.map((character) => (
                        <div key={character.id} className="border p-4 rounded">
                            <img src={character.image} alt={character.name} className="w-full h-40 object-cover rounded" />
                            <h2 className="text-lg font-bold">{character.name}</h2>
                            <p>Status: {character.status}</p>
                            <p>Espécie: {character.species}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Paginação */}
            <div className="mt-4 flex justify-center">
                <button onClick={() => changePage(filters.page - 1)} disabled={filters.page === 1} className="p-2 mx-1">
                    Anterior
                </button>
                <span>{filters.page} / {totalPages}</span>
                <button onClick={() => changePage(filters.page + 1)} disabled={filters.page === totalPages} className="p-2 mx-1">
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default Home;

