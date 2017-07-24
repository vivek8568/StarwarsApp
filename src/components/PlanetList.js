import React from 'react';

const PlanetList = ({planetList}) => {
    return(
        <div>
            <span className="listHeader">Planets</span>
            <span className="listHeader">Population</span>
            <div>
                { planetList && planetList.map((planet, index) => {
                     let fontSize = 30-(index*3) + 'px';
                     return (
                        <span key={planet.name}>
                            <span style={{fontSize: fontSize}} className="listItem">{planet.name}</span>
                            <span style={{fontSize: fontSize}} className="listItem">{planet.population}</span><br/>
                        </span>
                     )
                  })
                }
            </div>
        </div>
    )
}

export default PlanetList;