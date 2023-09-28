import './App.css';
import React, {useState} from "react";

function App() {
    const apiKey = "27bdb74870f7178efc41003bc00503c5"
    let [countryCode, setCountryCode] = useState('')
    let [keyword, setKeyword] = useState('')
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${keyword},${countryCode}&lang=es&appid=${apiKey}&units=metric`
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [temps, setTemps] = useState(null)
    
    const handleInput = (event) =>{
      setKeyword(event.target.value);
      console.log(keyword)
    }
    const handleInput2 = (event) =>{
    setCountryCode(event.target.value);
    }
    const handleForm = (event) => {
        event.preventDefault()
        setTemps(null)
        setLoading(true)
        setError(null)
        fetch(url)
        .then((response) => response.json())
        .then(res => {
          setData(res)
          setTemps({
            tempValues : res.main,
            weatherIc : res.weather[0],
            name : res.name,
            country : res.sys.country 
          })
        })
        .catch((error) => {setError(error)})
        .finally(() => setLoading(false));
    }
    
    function CondRender(){
      if(temps){
      const icon = temps.weatherIc.icon
      const srcIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`
      return (<div >
        <h3 id='title'>{temps.name + ", " + temps.country}</h3>
        <div id='container'>
        <div id='left'>
          <div id='actTemp'><p id='temp'>{temps.tempValues.temp} °C</p> <img src={srcIcon}></img> </div>
          <div> <p>Descripcion: {temps.weatherIc.description}</p> </div>
        </div>
        <div id='otherData'>
          <div> <p>Temperatura Maxima: {temps.tempValues.temp_max} °C</p> </div>
          <div> <p>Temperatura Minima: {temps.tempValues.temp_min} °C</p> </div>
          <div> <p>Sension Real: {temps.tempValues.feels_like} °C</p> </div>
          <div> <p>Humedad: {temps.tempValues.humidity} %</p> </div>
        </div>
        </div>
      </div>)
      }  else {
        return(<div><p>{data.message} </p></div>)
      }
    }

    
  return (
    <div className="App">
      <header className="App-header">
          <h1 className='boton'>Clima actual</h1><form onSubmit={handleForm}>
          <div id='form'>
          <input type="text" name="name" id='cityName' value={keyword} onChange={handleInput} placeholder="Nombre de la ciudad" required></input>
          <div className='contain'>
            <input type="text" name="node" id='countryCode' value={countryCode} onChange={handleInput2} placeholder="Codigo del pais" required></input>
            <button>Buscar</button>
          </div>
          </div>
        </form>
        
        {error && <p>Error: </p>}
        {loading && <div class="spinner"></div>}
        {data ? <CondRender/> : null}
      </header>
    </div>
  );
}

export default App;
