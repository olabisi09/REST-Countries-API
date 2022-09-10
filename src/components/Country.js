import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";

const Country = () => {
    const [country, setCountry] = React.useState([]);
    const [allCountries, setAllCountries] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const {name} = useParams();
    const nav = useNavigate();

    React.useEffect(() => {
        const fetchCountryData = async () => {
            const url = `https://restcountries.com/v3.1/name/${name}`;
            const response = await fetch(url);
            const responseAll = await fetch(`https://restcountries.com/v3.1/all`)
            const data = await response.json();
            const data2 = await responseAll.json();
            setCountry(data);
            setAllCountries(data2);
            setIsLoaded(true);
          };
        fetchCountryData();
    }, [name])

    const getCountryByCode = code => {
        const x = allCountries.find(
            c => c.cca3 === code
        );
        return x ? x.name.common : code;
    }

    return(
        <div className="dark:bg-darkVDarkBlue h-screen">
            {!isLoaded ? (<div>Loading...</div>) :
            (
            <div className="space-y-8">
                <Link to="/" className="dark:bg-darkBlue flex gap-2 mt-8 dark:text-white ml-10 rounded-lg shadow p-2 w-28">
                    <BsArrowLeft color="black"/>
                    <p>Back</p>
                </Link>
                {country.map((x) => {
                    return (
                        <div className="dark:bg-darkVDarkBlue md:flex space-y-8 md:space-y-0 gap-8 dark:text-white">
                            <img className="mx-10 md:w-[500px] shadow-md" alt="flag" src={x.flags.svg}/>
                            <div className="flex flex-col justify-center mx-10 md:mx-0">
                                <p className="font-bold text-2xl">{x.name.official}</p>
                                <div className="md:flex gap-12 space-y-4 md:space-y-0 leading-loose mt-4 text-lightDarkGray dark:text-white text-sm">
                                    <div>
                                        <p className="font-bold">Population: <span className="font-light">{x.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</span></p>
                                        <p className="font-bold">Region: <span className="font-light">{x.region}</span></p>
                                        <p className="font-bold">Sub-region: <span className="font-light">{x.subregion}</span></p>
                                        <p className="font-bold">Capital: <span className="font-light">{x.capital}</span></p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Top-level domain: <span className="font-light">{Object.keys(x.tld).map((key) => {return x.tld[key]}).join(', ')}</span></p>
                                        <p className="font-bold">Currencies: <span className="font-light">{Object.keys(x.currencies).map((key) => {return x.currencies[key].name}).join(', ')}</span></p>
                                        <p className="font-bold">Languages: <span className="font-light">{Object.keys(x.languages).map((key) => {return x.languages[key]}).join(', ')}</span></p>
                                    </div>
                                </div>
                                {x.borders && (
                                    <div className="flex flex-wrap my-10 gap-2 font-bold text-sm text-lightDarkGray">
                                        <p>Border countries:</p>
                                        <div className="font-light flex flex-wrap gap-4">
                                            {x.borders.map((y) => {
                                                return <button onClick={() => nav(`/${getCountryByCode(y)}`)} className="flex justify-center text-xs font-medium dark:bg-darkBlue dark:text-white rounded-md shadow px-4 py-2">
                                                    <p>{getCountryByCode(y)}</p>
                                                </button>
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>)
            }
        </div>
    )
}

export default Country;