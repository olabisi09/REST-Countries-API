import React from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

const Countries = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [country, setCountry] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const fetchCountryData = async () => {
          const url = "https://restcountries.com/v3.1/all";
          const response = await fetch(url);
          const data = await response.json();
          setCountry(data);
          setIsLoaded(true);
        };
        fetchCountryData();
      }, [])

    const getSearch = (searchValue) => {
        setSearch(searchValue);
        if(search){
            const searchCountry = country.filter((x) => 
                Object.values(x).join("").toLowerCase().includes(searchValue.toLowerCase())
            );
            setFiltered(searchCountry);
        }
        else setFiltered(country);
    }

    console.log(filtered)

    return (
        <div className="dark:bg-darkVDarkBlue">
            {!isLoaded ? (<div>Loading...</div>) :
            (
            <div>
                <Filter setCountry={setCountry} getSearch={getSearch} search={search}/>
                {search.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-32 md:mx-16 mt-8">
                        {filtered.map((x) => {
                            return <Link to={`/${x.name.common}`} key={x.cca3}>
                                <div className="rounded dark:bg-darkBlue shadow-lg dark:text-white mb-12">
                                    <div className="h-36 shadow-md"><img className="w-full h-36" alt="flag" src={x.flags.png}/></div>
                                    <div className="p-6">
                                        <div  className="font-bold text-lg mb-2">{x.name.common}</div>
                                        <p className="text-sm font-light"><span className="font-semibold">Population:</span> {x.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</p>
                                        <p className="text-sm"><span className="font-semibold">Region:</span> {x.region}</p>
                                        <p className="text-sm"><span className="font-semibold">Capital:</span> {x.capital}</p>
                                    </div>
                                </div>
                            </Link>
                        })}
                    </div>
                ) :
                (
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-4 space-y-8 md:space-y-0 gap-8 mx-32 md:mx-16 mt-8">
                        {country.map((x) => {
                            return <Link to={`/${x.name.common}`} key={x.cca3}>
                                <div className="rounded dark:bg-darkBlue overflow-hidden shadow-lg dark:text-white mb-12 md:mb-0">
                                    <div className="h-36 shadow-md"><img className="w-full h-36" alt="flag" src={x.flags.png}/></div>
                                    <div className="p-6">
                                        <div  className="font-bold text-lg mb-2">{x.name.common}</div>
                                        <p className="text-sm font-light"><span className="font-semibold">Population:</span> {x.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</p>
                                        <p className="text-sm"><span className="font-semibold">Region:</span> {x.region}</p>
                                        <p className="text-sm"><span className="font-semibold">Capital:</span> {x.capital}</p>
                                    </div>
                                </div>
                            </Link>
                        })}
                    </div>
                )}
                
            </div>
            )
            }
        </div>
    )
}

export default Countries;