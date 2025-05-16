import { useEffect } from 'react'
import { useState } from 'react'
import './index.css'
import { PokemonCard } from './PokemonCard.jsx'
export const Pokemon=()=>{
    const [search, setSearch]=useState('')
    const [pokemon, setPokemon]=useState([])
    const [error, setError]=useState('')
    const [loading, setLoading]=useState(true)
    const API='https://pokeapi.co/api/v2/pokemon?limit=124'
    const fetchAPI=async()=>{
        try{
            const res=await fetch(API)
            const data=await res.json();
            // console.log(data)
            const detailedPokemon=data.results.map(async (pokemon) => {
                const res=await fetch(pokemon.url)
                const data=await res.json()
                return data
            })
            const detailedResponse=await Promise.all(detailedPokemon)
            setPokemon(detailedResponse)
            setLoading(false)
        }catch(error){
            console.error('Error:',error)
            setLoading(false)
            setError(error)
        }
    }
    
    useEffect(() => {
        fetchAPI();
    },[])
    const searchData = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );
    if(loading){
        return(
            <div className="loading">Loading...</div>
        )
    }
    if(error){
        return(
            <div>
                <p>{error.message}</p>
            </div>
        )
    }
    return(
        <>
          <section className="container">
            <header>
                <h1>Let's Catch API</h1>
            </header>
            <div className="pokemon-search">
                <input type='text' placeholder='Search Pokemon' value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            </div>
            <div>
                <ul className='cards'>
                    {searchData.map((poke) => {
                        return(
                            <PokemonCard key={poke.id} pokemon={poke}/>
                        )
                    })}
                </ul>
            </div>
           </section>
        </>
    )}