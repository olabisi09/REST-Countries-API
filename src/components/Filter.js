import React from "react";
import {IoMdSearch} from "react-icons/io";

const Filter = ({setCountry, search, getSearch}) => {

    const getByRegion = async (e) => {
        const res = await fetch(e.target.value === "All" ? `https://restcountries.com/v3.1/all` : `https://restcountries.com/v3.1/region/${e.target.value}`);
        const data = await res.json();
        setCountry(data);
    }

    return(
        <div className="md:flex justify-between">
            <div className="dark:bg-darkBlue dark:text-white outline-0 p-4 shadow-md rounded flex gap-4 ml-16 mt-8 mr-16 md:w-80">
                <span className="mt-1"><IoMdSearch fill="hsl(0, 0%, 52%)"/></span>
                <input 
                    autoComplete="off"
                    type="search" 
                    value={search}
                    onChange={(e) => getSearch(e.target.value)} 
                    className="outline-0 dark:bg-darkBlue dark:placeholder:text-white placeholder:text-lightDarkGray placeholder:text-sm" 
                    placeholder="Search for a country..."
                />
            </div>
            <select 
            className="dark:bg-darkBlue text-sm dark:text-white outline-0 p-4 shadow-md rounded flex ml-16 md:ml-auto mt-8 mr-16"
            name="region"
            onChange={getByRegion}
        >
            <option value="All">Filter by region</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
        </select>
        </div>
    )
}

export default Filter;