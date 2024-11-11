import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


const CharacterDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [character, setCharacter] = useState<any>(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/characters/${id}`).then((response) => {
                setCharacter(response.data);
            });
        }
    }, [id]);

    if (!character) return <p>Carregando...</p>;

    return (
        <div className="container mx-auto p-4">
            <img src={character.image} alt={character.name} className="w-48 h-48 rounded" />
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p>Status: {character.status}</p>
            <p>Espécie: {character.species}</p>
            <p>Gênero: {character.gender}</p>
            <p>Origem: {character.origin}</p>
            <p>Localização: {character.location}</p>
        </div>
    );
    
};

export default CharacterDetail;
