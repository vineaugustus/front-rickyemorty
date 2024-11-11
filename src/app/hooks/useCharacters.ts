import { useState, useEffect } from "react";
import axios from "axios";

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
}

interface Filters {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    page?: number;
}

const useCharacters = (filters: Filters) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("http://localhost:8000/api/characters", {
                    params: filters,
                });
                setCharacters(data.data);
                setTotalPages(data.last_page);
                setError(null);
            } catch (err) {
                setError("Erro ao carregar personagens.");
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, [filters]);

    return { characters, loading, error, totalPages };
};

export default useCharacters;
