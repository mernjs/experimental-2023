import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

const App = () => {

	const [data, setData] = useState(null)
	const [query, setQuery] = useState("")
	const [latitude, setLatitude] = useState("")
	const [longitude, setLongitude] = useState("")

	const getCurrentLatLog = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				setLatitude(latitude);
				setLongitude(longitude);
			}, (err) => {
				console.log(err.message)
			});
		} else {
			console.log("Geolocation not supported");
		}
	}

	useEffect(() => {
		getCurrentLatLog()
	}, [])

	const getData = () => {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&lat=${latitude}&lon=${longitude}&appid=fe4feefa8543e06d4f3c66d92c61b69c&units=metric`, {
			method: "get"
		}).then((res) => {
			return res.json()
		}).then((resp) => {
			console.log(resp)
			setData(resp)
		}).catch((err) => {
			console.log("Error==>", err)
		})
	}

	useEffect(() => {
		getData()
	}, [latitude, longitude])

	const handleChange = (e) => {
		setQuery(e.target.value)
	}

	const handleSearch = () => {
		getData()
	}

	return (
		<div>

			<section class="vh-100" style={{ "backgroundColor": "#f5f6f7" }}>
				<div class="container py-5 h-100">
					<div class="row d-flex justify-content-center align-items-center h-100">
						<div class="col-md-10 col-lg-8 col-xl-6">
							<h3 class="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

							<div class="input-group rounded mb-3">
								<input type="search" class="form-control rounded" placeholder="City" aria-label="Search"
									aria-describedby="search-addon" onChange={handleChange} />
								<button className='btn btn-secondary input-group-text border-0 fw-bold' id="search-addon" onClick={handleSearch}>Check!</button>
							</div>

							<div class="card bg-dark text-white" style={{ "border-radius": "40px" }}>
								<div class="bg-image" style={{ "border-radius": "35px;" }}>
									<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
										class="card-img" alt="weather" />
									<div class="mask" style={{ "background-color": "rgba(190, 216, 232, .5)" }}>

									</div>
								</div>
								<div class="card-img-overlay text-dark p-5">
									<>
										<h4 class="mb-0">{data?.name}, {data?.sys?.country} </h4>
										<p class="display-2 my-3"> {data?.main?.temp} °C</p>
										<p>Pressure: <strong> {data?.main?.pressure}</strong> | Humidity:  <strong>  {data?.main?.humidity}</strong></p>
										<p class="mb-2">Feels Like:  <strong > {data?.main?.feels_like} °C </strong></p>
										<p>Max: <strong> {data?.main?.temp_max} °C</strong>, Min: <strong> {data?.main?.temp_min}°C</strong></p>
									</>
								</div>
							</div>

						</div>
					</div>
				</div>
			</section>

		</div>
	)
}

export default App
